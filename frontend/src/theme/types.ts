export {};

declare module "@mui/material/styles" {
  interface MainPaletteColor {
    black: string;
    gray: string;
    white: string;
    yellow: string;
    blue: string;
    darkBlue: string;
    lightBlue: string;
    red: string;
    green: string;
  }
  /*interface AccentPaletteColorOptions {

  }*/
  interface PaletteOptions {
    mainPalette: MainPaletteColor;
  }
}