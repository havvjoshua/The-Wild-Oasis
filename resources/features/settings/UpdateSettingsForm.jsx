import { useForm } from "@inertiajs/react";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import styled from "styled-components";
import toast from "react-hot-toast";

const Error = styled.span`
    font-size: 1.4rem;
    color: var(--color-red-700);
`;

function UpdateSettingsForm({ settings }) {
    const initialState = {
        minBookingLength: settings.min_booking_length,
        maxBookingLength: settings.max_booking_length,
        maxGuestsPerBooking: settings.max_guests_per_booking,
        breakfastPrice: settings.breakfast_price,
    };

    const {
        data,
        setData,
        put,
        processing,
        errors,
        reset,
        cancel,
        clearErrors,
    } = useForm(initialState);

    function handleUpdate(e, field) {
        const { value } = e.target;
        if (!value) return;
        updateSettings({ [data[field]]: value });
    }

    function updateSettings(e) {
        try {
            put(`settings/${settings.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success("Settings successfully updated.");
                },
            });
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <Form>
            <FormRow label="Minimum nights/booking">
                <Input
                    type="number"
                    id="min-nights"
                    disabled={processing}
                    value={data.minBookingLength}
                    onChange={(e) =>
                        setData("minBookingLength", e.target.value)
                    }
                    onBlur={(e) => handleUpdate(e, "minBookingLength")}
                />
            </FormRow>

            {errors.minBookingLength && (
                <Error>{errors.minBookingLength}</Error>
            )}

            <FormRow label="Maximum nights/booking">
                <Input
                    type="number"
                    id="max-nights"
                    disabled={processing}
                    value={data.maxBookingLength}
                    onChange={(e) =>
                        setData("maxBookingLength", e.target.value)
                    }
                    onBlur={(e) => handleUpdate(e, "maxBookingLength")}
                />
            </FormRow>
            {errors.maxBookingLength && (
                <Error>{errors.maxBookingLength}</Error>
            )}

            <FormRow label="Maximum guests/booking">
                <Input
                    type="number"
                    id="max-guests"
                    disabled={processing}
                    value={data.maxGuestsPerBooking}
                    onChange={(e) =>
                        setData("maxGuestsPerBooking", e.target.value)
                    }
                    onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
                />
            </FormRow>

            {errors.maxGuestsPerBooking && (
                <Error>{errors.maxGuestsPerBooking}</Error>
            )}

            <FormRow label="Breakfast price">
                <Input
                    type="number"
                    id="breakfast-price"
                    disabled={processing}
                    value={data.breakfastPrice}
                    onChange={(e) => setData("breakfastPrice", e.target.value)}
                    onBlur={(e) => handleUpdate(e, "breakfastPrice")}
                />
            </FormRow>
            {errors.breakfastPrice && <Error>{errors.breakfastPrice}</Error>}
        </Form>
    );
}

export default UpdateSettingsForm;
