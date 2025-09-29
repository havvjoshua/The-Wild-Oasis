import styled, { css } from "styled-components";

// Size styles
const sizes = {
    small: css`
        font-size: 1.2rem;
        padding: 0.4rem 0.8rem;
        text-transform: uppercase;
        font-weight: 600;
        text-align: center;
    `,
    medium: css`
        font-size: 1.4rem;
        padding: 1.2rem 1.6rem;
        font-weight: 500;
    `,
    large: css`
        font-size: 1.6rem;
        padding: 1.2rem 2.4rem;
        font-weight: 500;
    `,
};

// Variation styles
const variations = {
    primary: css`
        color: var(--color-brand-50);
        background-color: var(--color-brand-600);

        &:hover {
            background-color: var(--color-brand-700);
        }
    `,
    secondary: css`
        color: var(--color-grey-600);
        background: var(--color-grey-0);
        border: 1px solid var(--color-grey-200);

        &:hover {
            background-color: var(--color-grey-50);
        }
    `,
    danger: css`
        color: var(--color-red-100);
        background-color: var(--color-red-700);

        &:hover {
            background-color: var(--color-red-800);
        }
    `,
};

// Styled button
const StyledButton = styled.button`
    border: none;
    border-radius: var(--border-radius-sm);
    box-shadow: var(--shadow-sm);

    //display: inline-flex;
    align-items: center;
    gap: 0.8rem;

    ${(props) => variations[props.$variation]}
    ${(props) => sizes[props.$size]}
`;

// Custom Button component
const Button = ({
    children,
    $size = "medium",
    $variation = "primary",
    $icon,
    ...rest
}) => {
    return (
        <StyledButton $size={$size} $variation={$variation} {...rest}>
            {$icon && <span>{$icon}</span>}
            {children}
        </StyledButton>
    );
};

export default Button;
