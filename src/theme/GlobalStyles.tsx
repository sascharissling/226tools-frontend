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
    
    h1,
    h2,
    h3,
    h4, h5, h6 {
        margin: 0;
        padding: 0;
    } 
`;

export default GlobalStyle;
