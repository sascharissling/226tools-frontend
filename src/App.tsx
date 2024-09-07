import { ThemeProvider } from "styled-components";
import { theme } from "./theme/theme.ts";
import GlobalStyle from "./theme/GlobalStyles.tsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes.tsx";
import FooterContextProvider from "./contexts/footer-context";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <FooterContextProvider>
        <GlobalStyle />
        <RouterProvider router={router} />
      </FooterContextProvider>
    </ThemeProvider>
  );
}

export default App;
