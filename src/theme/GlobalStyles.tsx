import { createGlobalStyle } from "styled-components";

export const FOOTER_HEIGHT_REM = 3.5;
export const HEADER_HEIGHT_REM = 3.5;

const GlobalStyle = createGlobalStyle`
    *,
    *::after,
    *::before {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        font-family: ${(props) => props.theme.fonts.join(",")};
    }
    
    main {
        min-height: calc(100vh - ${FOOTER_HEIGHT_REM + HEADER_HEIGHT_REM + 1}rem);

    }
    
    h1,
    h2,
    h3,
    h4, h5, h6 {
        margin: 0;
        padding: 0;
    }
    
    h1 {
        font-size: 1.75rem;
    }
    
    h2 {
        font-size: 1.5rem;
    }
    
    h3 {
        font-size: 1.25rem;
    }
    
    h4 {
        font-size: 1rem;
    }
    
    h5 {
        font-size: 0.875rem;
    }
    
    h6 {
        font-size: 0.75rem;
    }
    
    p {
        margin: 0 0 1rem 0;
        padding: 0;
    }

    a {
        text-decoration: none;
        color: ${({ theme }) => theme.colors.black};

        &:hover {
            color: ${({ theme }) => theme.colors.gray};
        }
    }
`;

export default GlobalStyle;
