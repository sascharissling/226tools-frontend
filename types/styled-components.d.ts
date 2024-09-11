import { Theme } from "../src/theme/theme.ts";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
