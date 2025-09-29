import { useForm } from "@inertiajs/react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import styled from "styled-components";
import toast from "react-hot-toast";
import SpinnerMini from "../../ui/SpinnerMini";

const Error = styled.p`
    font-size: 1.4rem;
    color: var(--color-red-700);
`;

function UpdatePasswordForm() {
    const {
        data,
        setData,
        put,
        processing,
        errors,
        reset,
        clearErrors,
        isDirty,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    function handleCancel() {
        reset();
        clearErrors();
    }

    function handleSubmit(e) {
        e.preventDefault();

        put("/account/password", {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                toast.success("Password updated successfully.");
            },
            onError: () => {
                toast.error(
                    "Failed to update password. Please check for errors."
                );
            },
        });
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormRow label="Current Password" htmlFor="current_password">
                <Input
                    type="password"
                    id="current_password"
                    autoComplete="current-password"
                    disabled={processing}
                    value={data.current_password}
                    onChange={(e) =>
                        setData("current_password", e.target.value)
                    }
                />
            </FormRow>
            {errors.current_password && (
                <Error>{errors.current_password}</Error>
            )}

            <FormRow label="New password" htmlFor="password">
                <Input
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    disabled={processing}
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                />
            </FormRow>
            {errors.password && <Error>{errors.password}</Error>}

            <FormRow label="Confirm password" htmlFor="password_confirmation">
                <Input
                    type="password"
                    id="password_confirmation"
                    autoComplete="new-password"
                    disabled={processing}
                    value={data.password_confirmation}
                    onChange={(e) =>
                        setData("password_confirmation", e.target.value)
                    }
                />
            </FormRow>
            {errors.password_confirmation && (
                <Error>{errors.password_confirmation}</Error>
            )}

            <FormRow>
                <Button
                    type="button"
                    $size="medium"
                    $variation="secondary"
                    onClick={handleCancel}
                    disabled={processing}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    $size="medium"
                    $variation="primary"
                    disabled={processing || !isDirty}
                >
                    {processing ? <SpinnerMini /> : "Update password"}
                </Button>
            </FormRow>
        </Form>
    );
}

export default UpdatePasswordForm;
