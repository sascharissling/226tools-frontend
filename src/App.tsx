import Breakfast from "./components/breakfast";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "./theme/theme.ts";
import GlobalStyle from "./theme/GlobalStyles.tsx";
import Text from "./components/text";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Main>
        <section>
          <h1>Triathlon Nutrition Calculator</h1>
          <Text>
            inspired by James LeBaigue's Course on long distance triathlon
            nutrition
          </Text>
        </section>

        <Breakfast />
      </Main>
    </ThemeProvider>
  );
}

export default App;

const Main = styled.main`
  padding: 1em;
`;
