import Breakfast from "./components/breakfast";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "./theme/theme.ts";
import GlobalStyle from "./theme/GlobalStyles.tsx";
import { Text, Heading } from "./components/text";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Main>
        <section>
          <Heading as="h1" paddingTop={1} paddingBottom={1}>
            Triathlon Nutrition Calculator
          </Heading>
          <Text color="gray">
            inspired by James LeBaigue's course on long distance triathlon
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
