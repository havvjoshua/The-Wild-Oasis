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

    ${(props) =>
        props.active &&
        css`
            background-color: var(--color-brand-600);
            color: var(--color-brand-50);
        `}

    border-radius: var(--border-radius-sm);
    font-weight: 500;
    font-size: 1.4rem;
    /* To give the same height as select */
    padding: 0.44rem 0.8rem;
    transition: all 0.3s;

    &:hover:not(:disabled) {
        background-color: var(--color-brand-600);
        color: var(--color-brand-50);
    }
`;

function Filter({ filterField, options }) {
    const { url } = usePage(); // Optional: if you need current URL or props
    //const currentFilter = router.get(filterValue) || options.at(0).value;
    console.log(filterField);
    //const currentFilter = router.get(filterValue);
    //console.log(currentFilter);

    const handleClick = (value) => {
        router.get(
            url,
            { filterField: value },
            {
                preserveState: true, // Keeps component state
                replace: true, // Use replaceState instead of pushState
            }
        );
    };
    return (
        <StyledFilter>
            {options.map((option) => (
                <FilterButton
                    key={option.value}
                    onClick={(e) => handleClick(option.value)}
                    //active={}
                >
                    {option.label}
                </FilterButton>
            ))}
        </StyledFilter>
    );
}

export default Filter;
