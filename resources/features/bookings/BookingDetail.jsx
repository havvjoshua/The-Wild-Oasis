import styled from "styled-components";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import BookingDataBox from "./BookingDataBox";
import { router, useForm } from "@inertiajs/react";
import { HiArrowUpOnSquareStack } from "react-icons/hi2";
import toast from "react-hot-toast";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

function BookingDetail({ booking }) {
    const { id: bookingId, status } = booking;
    const { delete: destroy, processing, put } = useForm({});

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

    function handleCheckin() {
        const url = `/bookings/${bookingId}/check-in`;
        router.visit(url);
    }
    function handleCheckout() {
        put(`/bookings/${bookingId}/check-out`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Checked out successfully");
            },
            onError: (errors) => {
                console.error("Error during checkout:", errors);
            },
        });
    }

    function moveBack() {
        // Option 1: specific route
        //router.visit('/bookings');

        // OR Option 2: browser back
        //this mimics the browser's back button
        window.history.back();
    }

    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };

    return (
        <>
            <Row type="horizontal">
                <HeadingGroup>
                    <Heading as="h1">Booking #{bookingId}</Heading>
                    <Tag type={statusToTagName[status]}>
                        {status.replace("-", " ")}
                    </Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            <ButtonGroup>
                {status === "unconfirmed" && (
                    <Button
                        $variation="primary"
                        $size="small"
                        onClick={handleCheckin}
                    >
                        Check in
                    </Button>
                )}

                {status === "checked-in" && (
                    <Button
                        $size="medium"
                        $variation="primary"
                        $icon={<HiArrowUpOnSquareStack />}
                        onClick={handleCheckout}
                        disabled={processing} // 👈 disables during request
                    >
                        {processing ? "Checking out..." : "Check out"}
                    </Button>
                )}

                <Modal>
                    <Modal.Open opens="delete">
                        <Button $size="medium" $variation="danger">
                            Delete booking
                        </Button>
                    </Modal.Open>
                    <Modal.Window name="delete">
                        <ConfirmDelete
                            resourceName="booking"
                            onConfirm={handleDelete}
                            disabled={processing}
                        />
                    </Modal.Window>
                </Modal>

                <Button
                    $variation="secondary"
                    $size="medium"
                    onClick={moveBack}
                >
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default BookingDetail;
