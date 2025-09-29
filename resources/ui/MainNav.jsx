import styled from "styled-components";
import { Link, usePage } from "@inertiajs/react";

import {
    HiOutlineHome,
    HiOutlineCalendarDays,
    HiOutlineHomeModern,
    HiOutlineUsers,
    HiOutlineCog6Tooth,
} from "react-icons/hi2";

const NavList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
`;

const ActiveLink = styled(Link)`
    //color: red;
    display: flex;
    align-items: center;
    gap: 1.2rem;
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
    color: var(--color-grey-800);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
`;

const StyledLink = styled(Link)`
    &:link,
    &:visited {
        display: flex;
        align-items: center;
        gap: 1.2rem;

        color: var(--color-grey-600);
        font-size: 1.6rem;
        font-weight: 500;
        padding: 1.2rem 2.4rem;
        transition: all 0.3s;
    }

    /* This works because react-router places the active class on the active NavLink */
    &:hover,
    &:active,
    &.active:link,
    &.active:visited {
        color: var(--color-grey-800);
        background-color: var(--color-grey-50);
        border-radius: var(--border-radius-sm);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        color: var(--color-grey-400);
        transition: all 0.3s;
    }

    &:hover svg,
    &:active svg,
    &.active:link svg,
    &.active:visited svg {
        color: var(--color-brand-600);
    }
`;
function MainNav() {
    const { url } = usePage();

    return (
        <nav>
            <NavList>
                <li>
                    {url === "/dashboard" ? (
                        <ActiveLink>
                            <HiOutlineHome />
                            <span>Home</span>
                        </ActiveLink>
                    ) : (
                        <StyledLink href="/dashboard">
                            <HiOutlineHome />
                            <span>Home</span>
                        </StyledLink>
                    )}
                </li>
                <li>
                    {url === "/bookings" ? (
                        <ActiveLink>
                            <HiOutlineCalendarDays />
                            <span>Bookings</span>
                        </ActiveLink>
                    ) : (
                        <StyledLink href="/bookings">
                            <HiOutlineCalendarDays />
                            <span>Bookings</span>
                        </StyledLink>
                    )}
                </li>
                <li>
                    {url === "/cabins" ? (
                        <ActiveLink>
                            <HiOutlineHomeModern />
                            <span>Cabins</span>
                        </ActiveLink>
                    ) : (
                        <StyledLink href="/cabins">
                            <HiOutlineHomeModern />
                            <span>Cabins</span>
                        </StyledLink>
                    )}
                </li>
                <li>
                    {url === "/users" ? (
                        <ActiveLink>
                            <HiOutlineUsers />
                            <span>Users</span>
                        </ActiveLink>
                    ) : (
                        <StyledLink href="/users">
                            <HiOutlineUsers />
                            <span>Users</span>
                        </StyledLink>
                    )}
                </li>
                <li>
                    {url === "/settings" ? (
                        <ActiveLink>
                            <HiOutlineCog6Tooth />
                            <span>Settings</span>
                        </ActiveLink>
                    ) : (
                        <StyledLink href="/settings">
                            <HiOutlineCog6Tooth />
                            <span>Settings</span>
                        </StyledLink>
                    )}
                </li>
            </NavList>
        </nav>
    );
}

export default MainNav;
