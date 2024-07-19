import Breakfast from "./breakfast";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme/theme.ts";
import GlobalStyle from "./theme/GlobalStyles.tsx";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <main>
        <section>
          <h1>Triathlon Nutrition Calculator</h1>
          <p>
            inspired by James LeBaigue's Course on long distance triathlon
            nutrition
          </p>
        </section>

        <Breakfast />
      </main>
    </ThemeProvider>
  );
}

export default App;
