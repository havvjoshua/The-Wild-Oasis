import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { router, useForm, usePage } from "@inertiajs/react";
import toast from "react-hot-toast";
import Checkbox from "../../ui/Checkbox";

const Box = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    padding: 2.4rem 4rem;
`;

function CheckinBooking({ booking }) {
    const [confirmPaid, setConfirmPaid] = useState(false);
    const [addBreakfast, setAddBreakfast] = useState(false);

    const { settings } = usePage().props;

    const {
        id: bookingId,
        guest,
        total_price,
        num_nights,
        num_guests,
        has_breakfast,
    } = booking;

    const optionalBreakfastPrice =
        settings.breakfast_price * num_guests * num_nights;

    const { data, setData, put, processing, errors } = useForm({
        status: "checked-in",
        is_paid: true,
        has_breakfast: false, // NEW
    });

    useEffect(() => {
        setData("has_breakfast", addBreakfast);
    }, [addBreakfast]);

    function moveBack() {
        window.history.back();
    }

    function handleCheckIn() {
        if (!confirmPaid) return;
        setData("has_breakfast", addBreakfast); // Update the form data dynamically

        put(`/bookings/${bookingId}/check-in`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(`Booking #${bookingId} successfully checked in.`);
            },
            onError: (errors) => {
                toast.error("Failed to check in.");
                console.error(errors);
            },
        });
    }

    return (
        <>
            {/* Heading and Back Button */}
            <Row type="horizontal">
                <Heading as="h1">Check in booking #{bookingId}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            {/* Booking Info */}
            <BookingDataBox booking={booking} />

            {!has_breakfast && (
                <Box>
                    <Checkbox
                        checked={addBreakfast}
                        onChange={() => {
                            setAddBreakfast((prev) => !prev);
                            setConfirmPaid(false);
                        }}
                        id="breakfast"
                    >
                        Want to add breakfast for{" "}
                        {formatCurrency(optionalBreakfastPrice)}
                    </Checkbox>
                </Box>
            )}

            {/* Confirm Paid */}
            <Box>
                <Checkbox
                    checked={confirmPaid}
                    onChange={() => setConfirmPaid((prev) => !prev)}
                    id={`confirm-paid-${bookingId}`}
                >
                    I confirm that {guest.fullName} has paid the total amount of{" "}
                    {!addBreakfast
                        ? formatCurrency(total_price)
                        : `
                      ${formatCurrency(
                          total_price + optionalBreakfastPrice
                      )} (${formatCurrency(total_price)} + ${formatCurrency(
                              optionalBreakfastPrice
                          )})
                    `}
                </Checkbox>
            </Box>

            {/* Buttons */}
            <ButtonGroup>
                <Button
                    $size="medium"
                    $variation="primary"
                    disabled={!confirmPaid || processing}
                    onClick={handleCheckIn}
                >
                    {processing
                        ? "Checking in..."
                        : `Check in booking #${bookingId}`}
                </Button>
                <Button
                    $size="medium"
                    $variation="secondary"
                    onClick={moveBack}
                >
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default CheckinBooking;
