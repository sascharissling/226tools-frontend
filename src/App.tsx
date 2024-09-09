import { ThemeProvider } from "styled-components";
import { theme } from "./theme/theme.ts";
import GlobalStyle from "./theme/GlobalStyles.tsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes.tsx";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
