import { createGlobalStyle } from "styled-components";

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
`;

export default GlobalStyle;
