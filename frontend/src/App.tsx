import { CssBaseline, ThemeProvider } from "@mui/material";
// import { styles } from "styles";

import Routing from "src/Routing";
import { Box } from "src/UI/Box";
import { basicTheme } from "src/theme";

const App = () => {
  return (
    <Box>
      <ThemeProvider theme={basicTheme}>
        <CssBaseline />
        <Box sx={styles.root}>
          <Routing />
        </Box>
      </ThemeProvider>
    </Box>
  );
};

const styles = {
  root: {
    display: "flex",
    width: "100vw",
  },
};

export default App;
