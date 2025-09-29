import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useForm } from "@inertiajs/react";
import styled from "styled-components";

const Error = styled.p`
    font-size: 1.4rem;
    color: var(--color-red-700);
`;

function RegisterForm() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        avatar: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        post("/register");
        //console.log("register new user");
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormRowVertical label="Name">
                <Input
                    type="name"
                    id="name"
                    // This makes this form better for password managers
                    //utoComplete="username"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                />
            </FormRowVertical>
            {errors.name && <Error>{errors.name}</Error>}
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
            <FormRowVertical label="avatar">
                <Input
                    type="avatar"
                    id="avatar"
                    // This makes this form better for password managers
                    autoComplete="username"
                    value={data.avatar}
                    onChange={(e) => setData("avatar", e.target.value)}
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

            <FormRowVertical label="Confirm Password">
                <Input
                    type="password"
                    id="onfirm_password"
                    autoComplete="current-password"
                    value={data.password_confirmation}
                    onChange={(e) =>
                        setData("password_confirmation", e.target.value)
                    }
                />
            </FormRowVertical>
            <FormRowVertical>
                <Button
                    type="submit"
                    $size="large"
                    $variation="primary"
                    disabled={processing}
                >
                    Register
                </Button>
            </FormRowVertical>
        </Form>
    );
}

export default RegisterForm;
