export const styles = {
    textField: {
      width: "100%",
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderWidth: "2px",
          borderRadius: 4,
          borderColor: "mainPalette.darkBlue",
        },
        "&:hover fieldset": {
          borderColor: "mainPalette.darkBlue",
        },
        "&.Mui-focused fieldset": {
          borderColor: "mainPalette.darkBlue",
        },
        "&.Mui-disabled fieldset": {
          borderColor: "mainPalette.darkBlue",
        },
      },
    },
  
    emptyTextField: {
      width: "100%",
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderWidth: "2px",
          borderRadius: 4,
          borderColor: "mainPalette.gray",
        },
        "&:hover fieldset": {
          borderColor: "mainPalette.gray",
        },
        "&.Mui-focused fieldset": {
          borderColor: "mainPalette.gray",
        },
        "&.Mui-disabled fieldset": {
          borderColor: "mainPalette.gray",
        },
      },
    },

    correctTextField: {
        width: "100%",
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderWidth: "2px",
            borderRadius: 4,
            borderColor: "mainPalette.green",
          },
          "&:hover fieldset": {
            borderColor: "mainPalette.green",
          },
          "&.Mui-focused fieldset": {
            borderColor: "mainPalette.green",
          },
          "&.Mui-disabled fieldset": {
            borderColor: "mainPalette.green",
          },
        },
      },

      wrongTextField: {
        width: "100%",
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderWidth: "2px",
            borderRadius: 4,
            borderColor: "mainPalette.red",
          },
          "&:hover fieldset": {
            borderColor: "mainPalette.red",
          },
          "&.Mui-focused fieldset": {
            borderColor: "mainPalette.red",
          },
          "&.Mui-disabled fieldset": {
            borderColor: "mainPalette.red",
          },
        },
      },
  
    checkbox: {
      "&.Mui-checked": { color: "mainPalette.darkBlue" },
    },
  };
  