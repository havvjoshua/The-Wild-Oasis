import styled from "styled-components";
//import { format, isToday } from "date-fns";
import { isToday, format, formatDistanceToNow } from "date-fns";
import { formatCurrency } from "../../utils/helpers";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import {
    HiArrowDownOnSquare,
    HiArrowUpOnSquareStack,
    HiEye,
    HiTrash,
} from "react-icons/hi2";
import Menus from "../../ui/Menus";
import { router, useForm } from "@inertiajs/react";
import toast from "react-hot-toast";

//import { formatCurrency } from "../../utils/helpers";
//import { formatDistanceFromNow } from "../../utils/helpers";

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

const Stacked = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    & span:first-child {
        font-weight: 500;
    }

    & span:last-child {
        color: var(--color-grey-500);
        font-size: 1.2rem;
    }
`;

const Amount = styled.div`
    font-family: "Sono";
    font-weight: 500;
`;

function BookingRow({
    booking: {
        id: bookingId,
        created_at,
        start_date,
        end_date,
        num_nights,
        num_guests,
        total_price,
        status,
        cabin_id,
        guest_id,
    },
    cabins,
    guests,
}) {
    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };
    //console.log(booking);
    const start = new Date(start_date);
    const end = new Date(end_date);

    const { delete: destroy, processing } = useForm();
    function handleDelete() {
        destroy(`/bookings/${bookingId}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Booking deleted successfully");
            },
            onError: (errors) => {
                console.error("Delete error:", errors);
            },
        });
    }
    function handleClick() {
        router.get(`bookings/${bookingId}`);
    }

    function handleCheckin() {
        router.visit(`bookings/${bookingId}/check-in`);
    }
    function handleCheckout() {
        router.put(
            `/bookings/${bookingId}/check-out`,
            {},
            {
                onSuccess: () => {
                    toast.success("Checked out successfully");
                },
                onError: (errors) => {
                    console.error(errors);
                },
            }
        );
    }
    return (
        <Table.Row>
            {cabins.map((cabin) =>
                cabin.id === cabin_id ? (
                    <Cabin key={cabin.id}>{cabin.name}</Cabin>
                ) : (
                    ""
                )
            )}

            {guests.map((guest) =>
                guest.id === guest_id ? (
                    <Stacked key={guest.id}>
                        <span>{guest.fullName}</span>
                        <span>{guest.email}</span>
                    </Stacked>
                ) : (
                    ""
                )
            )}

            <Stacked>
                <span>
                    {isToday(start)
                        ? "Today"
                        : formatDistanceToNow(start, { addSuffix: true })}
                    &nbsp;&rarr;&nbsp;{num_nights} night stay
                </span>

                <span>
                    {format(start, "MMM dd yyyy")} &mdash;{" "}
                    {format(end, "MMM dd yyyy")}
                </span>
            </Stacked>
            <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
            <Amount>{formatCurrency(total_price)}</Amount>

            <Modal>
                <Menus.Menu>
                    <Menus.Toggle id={bookingId} />
                    <Menus.List id={bookingId}>
                        <Menus.Button icon={<HiEye />} onClick={handleClick}>
                            See details
                        </Menus.Button>

                        {status === "unconfirmed" && (
                            <Menus.Button
                                icon={<HiArrowDownOnSquare />}
                                onClick={handleCheckin}
                            >
                                Check in
                            </Menus.Button>
                        )}
                        {status === "checked-in" && (
                            <Menus.Button
                                icon={<HiArrowUpOnSquareStack />}
                                onClick={handleCheckout}
                            >
                                Check out
                            </Menus.Button>
                        )}

                        <Modal.Open opens="delete">
                            <Menus.Button icon={<HiTrash />}>
                                Delete booking
                            </Menus.Button>
                        </Modal.Open>
                    </Menus.List>
                </Menus.Menu>

                <Modal.Window name="delete">
                    <ConfirmDelete
                        resourceName="booking"
                        onConfirm={handleDelete}
                        disabled={processing}
                    />
                </Modal.Window>
            </Modal>
        </Table.Row>
    );
}

export default BookingRow;
