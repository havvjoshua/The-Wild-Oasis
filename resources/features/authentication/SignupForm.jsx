import { useForm } from "@inertiajs/react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import SpinnerMini from "../../ui/SpinnerMini";
import Input from "../../ui/Input";
import styled from "styled-components";
import toast from "react-hot-toast";

// Email regex: /\S+@\S+\.\S+/

const Error = styled.p`
    font-size: 1.4rem;
    color: var(--color-red-700);
`;

function SignupForm() {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        cancel,
        reset,
        clearErrors,
    } = useForm({
        name: "",
        avatar: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    function handleCancel() {
        clearErrors();
        reset();
        cancel();
    }

    function handleSubmit(e) {
        e.preventDefault();
        try {
            post("/register", {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    toast.success("Account created successfully.");
                    //onCloseModal?.();
                },
            });
        } catch (error) {
            toast.error(error.message);
        }
    }
    return (
        <Form onSubmit={handleSubmit}>
            <FormRow label="Name">
                <Input
                    type="text"
                    id="name"
                    disabled={processing}
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                />
            </FormRow>
            {errors.name && <Error>{errors.name}</Error>}

            <FormRow label="Email">
                <Input
                    type="email"
                    id="email"
                    // autoComplete="username"
                    disabled={processing}
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                />
            </FormRow>
            <FormRow label="Avatar">
                <Input
                    type="avatar"
                    id="avatar"
                    // autoComplete="username"
                    disabled={processing}
                    value={data.avatar}
                    onChange={(e) => setData("avatar", e.target.value)}
                />
            </FormRow>
            {errors.email && <Error>{errors.email}</Error>}

            <FormRow label="Password">
                <Input
                    type="password"
                    id="password"
                    // autoComplete="current-password"
                    disabled={processing}
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                />
            </FormRow>
            {errors.password && <Error>{errors.password}</Error>}

            <FormRow label="Confirm password">
                <Input
                    type="password"
                    id="password_confirmation"
                    value={data.password_confirmation}
                    disabled={processing}
                    onChange={(e) =>
                        setData("password_confirmation", e.target.value)
                    }
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button
                    type="button"
                    $variation="secondary"
                    $size="medium"
                    onClick={handleCancel}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    $size="medium"
                    $variation="primary"
                    disabled={processing}
                >
                    {!processing ? "Create new user" : <SpinnerMini />}
                </Button>
            </FormRow>
        </Form>
    );
}

export default SignupForm;
