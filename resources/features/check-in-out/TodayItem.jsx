import styled from "styled-components";
import { format } from "date-fns";
import Tag from "../../ui/Tag";
import Button from "../../ui/Button";
import { router } from "@inertiajs/react";
import toast from "react-hot-toast";
import { useState } from "react";
import Modal from "../../ui/Modal";

const StyledTodayItem = styled.li`
    display: grid;
    grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
    gap: 1.2rem;
    align-items: center;

    font-size: 1.4rem;
    padding: 0.8rem 0;
    border-bottom: 1px solid var(--color-grey-100);

    &:first-child {
        border-top: 1px solid var(--color-grey-100);
    }
`;

const Guest = styled.div`
    font-weight: 500;
`;

const Cabin = styled.div`
    font-style: italic;
    color: var(--color-grey-600);
`;

const Time = styled.div`
    text-align: right;
    color: var(--color-grey-500);
    font-size: 1.2rem;
`;

function TodayItem({ type, booking }) {
    const guestName = booking?.guest?.fullName ?? "Guest";
    const cabinName = booking?.cabin?.name ?? "Cabin";
    // console.log(booking);
    const [isLoading, setIsLoading] = useState(false);

    const time =
        type === "arrival"
            ? format(new Date(booking.start_date), "p")
            : format(new Date(booking.end_date), "p");

    function handleCheckIn() {
        router.get(`/bookings/${booking.id}/check-in`);
    }

    function handleCheckOut() {
        setIsLoading(true);

        router.put(
            `/bookings/${booking.id}/check-out`,
            {},
            {
                onSuccess: () => {
                    toast.success("Guest checked out successfully!");
                },
                onError: () => {
                    toast.error("Check-out failed.");
                },
                onFinish: () => {
                    setIsLoading(false);
                },
            }
        );
    }
    return (
        <StyledTodayItem>
            {booking.status === "unconfirmed" && (
                <Tag type="green">Arriving</Tag>
            )}
            {booking.status === "checked-in" && (
                <Tag type="blue">Departing</Tag>
            )}
            <Guest>{guestName}</Guest>
            {/* <Cabin>{cabinName}</Cabin> */}
            <Time>{time}</Time>
            <Cabin>{cabinName}</Cabin>
            {booking.status === "unconfirmed" && (
                <Button
                    $variation="primary"
                    $size="small"
                    onClick={handleCheckIn}
                >
                    Check in
                </Button>
            )}
            {booking.status === "checked-in" && (
                <Button
                    $variation="secondary"
                    $size="small"
                    onClick={handleCheckOut}
                >
                    Check out
                </Button>
            )}
        </StyledTodayItem>
    );
}

export default TodayItem;
