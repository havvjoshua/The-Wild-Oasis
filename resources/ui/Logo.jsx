import { usePage } from "@inertiajs/react";
import styled from "styled-components";

const StyledLogo = styled.div`
    text-align: center;
`;

const Img = styled.img`
    height: 9.6rem;
    width: auto;
    transition: opacity 0.3s ease;
`;

function Logo() {
    const { theme } = usePage().props;

    // Use the theme from props (backend) only
    const currentTheme = theme ?? "light";

    const logoSrc =
        currentTheme === "dark" ? "/logo-dark.png" : "/logo-light.png";

    return (
        <StyledLogo>
            <Img key={logoSrc} src={logoSrc} alt="Logo" />
        </StyledLogo>
    );
}

export default Logo;
