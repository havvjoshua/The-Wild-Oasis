import { router, usePage } from "@inertiajs/react";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
    border: 1px solid var(--color-grey-100);
    background-color: var(--color-grey-0);
    box-shadow: var(--shadow-sm);
    border-radius: var(--border-radius-sm);
    padding: 0.4rem;
    display: flex;
    gap: 0.4rem;
`;

const FilterButton = styled.button`
    background-color: var(--color-grey-0);
    border: none;

    ${({ $active }) =>
        $active &&
        css`
            background-color: var(--color-brand-600);
            color: var(--color-brand-50);
        `}

    border-radius: var(--border-radius-sm);
    font-weight: 500;
    font-size: 1.4rem;
    padding: 0.44rem 0.8rem;
    transition: all 0.3s;

    &:hover:not(:disabled) {
        background-color: var(--color-brand-600);
        color: var(--color-brand-50);
    }
`;

function Filter({ filterField, options }) {
    const currentParams = new URLSearchParams(window.location.search);
    const activeValue = currentParams.get(filterField) || options.at(0).value; // e.g. "with-discount"
    //console.log(activeValue);

    function handleClick(value) {
        const currentUrl = new URL(window.location.href);
        const params = new URLSearchParams(currentUrl.search);

        // Set or update the dynamic query param
        if (value === "all" || value === "" || value === null) {
            params.delete(filterField); // Remove param if "all" or empty
        } else {
            params.set(filterField, value); // Set param from prop
        }

        // Optional: reset pagination
        params.delete("page");

        router.get(
            `${currentUrl.pathname}?${params.toString()}`,
            {},
            {
                preserveState: true,
                replace: true,
            }
        );
    }
    return (
        <StyledFilter>
            {options.map((option) => {
                const isActive =
                    (option.value === "all" && activeValue === null) ||
                    option.value === activeValue;

                return (
                    <FilterButton
                        key={option.value}
                        $active={isActive}
                        disabled={isActive}
                        onClick={() => handleClick(option.value)}
                    >
                        {option.label}
                    </FilterButton>
                );
            })}
        </StyledFilter>
    );
}

export default Filter;
