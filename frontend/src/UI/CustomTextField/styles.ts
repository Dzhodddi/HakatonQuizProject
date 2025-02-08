export const styles = {
    textField: {
        width: "100%",
       "& .MuiInputLabel-root": {
           color: "mainPalette.darkBlue",
       },
       "& .MuiInputLabel-root.Mui-focused": {
           color: "mainPalette.darkBlue",
       },
       "& .MuiOutlinedInput-root": {
           "& fieldset": {
               //backgroundColor: "mainPalette.lightBlue",
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
         },
   },
   halfTextField: {
    width: {
        xs: "100%",
        sm: "35%",
    },
},
};