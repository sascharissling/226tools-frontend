export const theme = {
  colors: {
    iceBlue: "#9cfffa",
    lightGreen: "#ACF39D",
    olivine: "#B0C592",
    beaver: "#A97C73",
    redwood: "#AF3E4D",
    black: "#000",
    white: "#fff",
    ////////// NEW THEME COLORS //////////
    primary: "#02a0ff",
    primaryDarker: "#0068a5",
    goldAccent: "#FFD700",
    lightgray: "#D3D3D3",
    gray: "#808080",
    whiteLighter: "#f8f8f8",
    darkGray: "#383838",
  },
  fonts: ["Lato", "sans-serif"],
  fontSizes: {
    extraSmall: "0.75em",
    small: "1em",
    medium: "2em",
    large: "3em",
  },
};

export type Theme = typeof theme;

export const breakpoints = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export const devices = {
  xs: `(min-width: ${breakpoints.xs}px)`,
  sm: `(min-width: ${breakpoints.sm}px)`,
  md: `(min-width: ${breakpoints.md}px)`,
  lg: `(min-width: ${breakpoints.lg}px)`,
  xl: `(min-width: ${breakpoints.xl}px)`,
  "2xl": `(min-width: ${breakpoints["2xl"]}px)`,
};
