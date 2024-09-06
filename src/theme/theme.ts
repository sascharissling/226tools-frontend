export const theme = {
  colors: {
    iceBlue: "#9cfffa",
    lightGreen: "#ACF39D",
    olivine: "#B0C592",
    beaver: "#A97C73",
    redwood: "#AF3E4D",
    black: "#000",
    white: "#fff",
    gray: "#808080",
    lightgray: "#D3D3D3",
    whiteLighter: "#f8f8f8",
  },
  fonts: ["sans-serif", "Roboto"],
  fontSizes: {
    extraSmall: "0.75em",
    small: "1em",
    medium: "2em",
    large: "3em",
  },
};

export type Theme = typeof theme;

const breakpoints = {
  xs: "320px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

export const devices = {
  xs: `(min-width: ${breakpoints.xs})`,
  sm: `(min-width: ${breakpoints.sm})`,
  md: `(min-width: ${breakpoints.md})`,
  lg: `(min-width: ${breakpoints.lg})`,
  xl: `(min-width: ${breakpoints.xl})`,
  "2xl": `(min-width: ${breakpoints["2xl"]})`,
};
