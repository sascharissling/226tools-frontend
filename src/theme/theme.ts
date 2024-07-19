export const theme: Theme = {
  colors: {
    iceBlue: "#9cfffa",
    lightGreen: "#ACF39D",
    olivine: "#B0C592",
    beaver: "#A97C73",
    redwood: "#AF3E4D",
  },
  fonts: ["sans-serif", "Roboto"],
  fontSizes: {
    small: "1em",
    medium: "2em",
    large: "3em",
  },
};

export interface Theme {
  colors: {
    iceBlue: string;
    lightGreen: string;
    olivine: string;
    beaver: string;
    redwood: string;
  };
  fonts: string[];
  fontSizes: {
    small: string;
    medium: string;
    large: string;
  };
}
