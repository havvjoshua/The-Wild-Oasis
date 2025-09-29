import styled from "styled-components";
import GlobalStyles from "../styles/GlobalStyles";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { usePage } from "@inertiajs/react";

const Main = styled.main`
    background-color: var(--color-grey-50);
    padding: 4rem 4.8rem 6.4rem;
    overflow: scroll;
`;

const StyledAppLayout = styled.div`
    display: grid;
    grid-template-columns: 26rem 1fr;
    grid-template-rows: auto 1fr;
    height: 100vh;
`;

const Container = styled.div`
    max-width: 120rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
`;

function AppLayout({ children }) {
    const { theme } = usePage().props;
    const isDark = theme === "dark";

    useEffect(() => {
        if (!theme) return;

        const root = document.documentElement;
        root.classList.remove("dark-mode", "light-mode");
        root.classList.add(isDark ? "dark-mode" : "light-mode");
    }, [theme]);

    return (
        <>
            <Toaster
                position="top-center"
                gutter={12}
                containerStyle={{ margin: "8px" }}
                toastOptions={{
                    success: { duration: 3000 },
                    error: { duration: 5000 },
                    style: {
                        fontSize: "16px",
                        maxWidth: "500px",
                        padding: "16px 24px",
                        backgroundColor: "var(--color-grey-0)",
                        color: "var(--color-grey-700)",
                    },
                }}
            />
            <GlobalStyles />
            <StyledAppLayout>
                <Header />
                <Sidebar />
                <Main>
                    <Container>{children}</Container>
                </Main>
            </StyledAppLayout>
        </>
    );
}

export default AppLayout;
