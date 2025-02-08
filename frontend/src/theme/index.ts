import { createTheme } from "@mui/material";

const RockStarBoldFontFamily = "'RockStarBold', Arial, serif";
const RockStarMediumFontFamily = "'RockStarMedium', Arial, serif";
const ProbaProFontFamily = "'Proba Pro', Arial, serif";

export const basicTheme = createTheme({
  palette: {
    mainPalette: {
        black: "#000",
        gray: "#F4F4F6",
        white: "#FFF",
        yellow: "#FFD700",
        blue: "#93bbfa",
        darkBlue: "#0241a6",
        lightBlue: "#d4e3fa",
    },
  },
  typography: {
    fontFamily: [
      ProbaProFontFamily,
      RockStarBoldFontFamily,
      RockStarMediumFontFamily,
    ].join(","),
    h1: {
      fontFamily: RockStarBoldFontFamily,
      fontWeight: 700,
      fontSize: "48px",
      lineHeight: "100%",
    },
    h2: {
      fontFamily: RockStarBoldFontFamily,
      fontWeight: 700,
      fontSize: "32px",
      lineHeight: "normal",
    },
    h3: {
      fontFamily: RockStarBoldFontFamily,
      fontWeight: 700,
      fontSize: "18px",
      lineHeight: "normal",
    },
    h4: {
      fontFamily: RockStarMediumFontFamily,
      fontWeight: 500,
      fontSize: "18px",
      lineHeight: "normal",
    },
    h5: {
      fontFamily: ProbaProFontFamily,
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "normal",
    },
    h6: {
      fontFamily: RockStarBoldFontFamily,
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "100%",
    },
  },
  components: {
    MuiContainer: {
        styleOverrides: {
            root: {
                margin: 0,
                backgroundColor: "#93bbfa",
                paddingTop: 32,
                paddingBottom: 32,
                paddingLeft: 16,
                paddingRight: 16,
            },
        },
    },
  },
  spacing: 4,
});