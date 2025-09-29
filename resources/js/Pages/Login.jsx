import styled, { StyleSheetManager } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";
import LoginForm from "../../features/authentication/LoginForm";
import GlobalStyles from "../../styles/GlobalStyles";
import Logo from "../../ui/Logo";
import Heading from "../../ui/Heading";
import { usePage } from "@inertiajs/react";

const LoginLayout = styled.main`
    min-height: 100vh;
    display: grid;
    grid-template-columns: 48rem;
    align-content: center;
    justify-content: center;
    gap: 3.2rem;
    background-color: var(--color-grey-50);
`;

function Login() {
    const { theme } = usePage().props;
    //console.log(theme);
    return (
        <>
            <GlobalStyles />
            <LoginLayout>
                <Logo />
                <Heading as="h4">Log in to your account</Heading>
                <LoginForm />
            </LoginLayout>
        </>
    );
}

export default Login;
