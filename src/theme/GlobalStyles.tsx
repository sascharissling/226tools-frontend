import { createGlobalStyle } from "styled-components";
import { devices } from "./theme.ts";

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
        min-height: calc(100vh - ${FOOTER_HEIGHT_REM + HEADER_HEIGHT_REM}rem);

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
    
    main {
        @media ${devices.md} {
            max-width: 70rem;
            margin: 0 auto;
        }
    }

    .ol-popup {
  position: absolute;
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #ccc;
  bottom: 12px;
  left: -50px;
  min-width: 200px;
}

.ol-popup:after,
.ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

.ol-popup:after {
  border-color: rgba(255, 255, 255, 0);
  border-top-color: #fff;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}

.ol-popup:before {
  border-color: rgba(204, 204, 204, 0);
  border-top-color: #ccc;
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}
`;

export default GlobalStyle;
