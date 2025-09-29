import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { useForm } from "@inertiajs/react";
import DarkModeToggle from "./DarkModeToggle";

const StyledHeaderMenu = styled.ul`
    display: flex;
`;

function HeaderMenu() {
    const { get } = useForm();
    function handleRedirect() {
        get("/account");
    }
    return (
        <StyledHeaderMenu>
            <li>
                <ButtonIcon onClick={handleRedirect} title="My Account">
                    <HiOutlineUser />
                </ButtonIcon>
            </li>
            <li>
                <DarkModeToggle />
            </li>
            <li>
                <Logout />
            </li>
        </StyledHeaderMenu>
    );
}
export default HeaderMenu;
