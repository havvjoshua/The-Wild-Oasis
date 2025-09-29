import { usePage, router } from "@inertiajs/react";

import ButtonIcon from "./ButtonIcon";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

export default function DarkModeToggle() {
    const { theme, auth } = usePage().props;
    const user = auth?.user;

    // Only render the toggle if the user is logged in
    if (!user) return null;

    const currentTheme = theme ?? "light"; // fallback to light if no server theme
    const isDark = currentTheme === "dark";

    const toggleTheme = () => {
        const newTheme = isDark ? "light" : "dark";

        // Update <html> class
        const root = document.documentElement;
        root.classList.remove(isDark ? "dark-mode" : "light-mode");
        root.classList.add(newTheme === "dark" ? "dark-mode" : "light-mode");

        // Persist preference server-side
        router.post(
            "/account/theme",
            { theme: newTheme },
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    };

    return (
        <ButtonIcon onClick={toggleTheme} title="Toggle dark mode">
            {isDark ? <HiOutlineSun /> : <HiOutlineMoon />}
        </ButtonIcon>
    );
}
