import { createTheme } from "@mui/material/styles";
import { orange, grey } from "@mui/material/colors";

// import green from '@mui/material/colors/green';
let theme = createTheme({
  palette: {
    primary: {
      main: orange[500],
      contrastText: grey[900],
    },
    secondary: {
      main: "#edf2ff",
      contrastText: grey[900],
    },
  },
});

export default theme;
