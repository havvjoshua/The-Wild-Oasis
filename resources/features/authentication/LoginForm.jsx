import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";
import FormRowVertical from "../../ui/FormRowVertical";
import { useForm } from "@inertiajs/react";
import styled from "styled-components";

const Error = styled.span`
    font-size: 1.4rem;
    color: var(--color-red-700);
`;

function LoginForm() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        post("/login");
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormRowVertical label="Email address">
                <Input
                    type="email"
                    id="email"
                    // This makes this form better for password managers
                    autoComplete="username"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                />
            </FormRowVertical>
            {errors.email && <Error>{errors.email}</Error>}

            <FormRowVertical label="Password">
                <Input
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                />
            </FormRowVertical>
            {errors.password && <Error>{errors.password}</Error>}

            <FormRowVertical>
                <Button
                    type="submit"
                    $size="large"
                    $variation="primary"
                    disabled={processing}
                >
                    {!processing ? "Log in" : <SpinnerMini />}
                </Button>
            </FormRowVertical>
        </Form>
    );
}

export default LoginForm;
