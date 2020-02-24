import React from 'react';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles'
import AppContext from "./context/AppContext";
import Dispatcher from "./Dispatcher";
import {CssBaseline} from "@material-ui/core";

const COLOR_PRIMARY = "#347c10";
const COLOR_SECONDARY = "#40c4ff";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: COLOR_PRIMARY
    },
    secondary: {
      main: COLOR_SECONDARY
    },
    background: {
      default: "rgba(97, 97, 97, 0.95)",
      paper:  "rgba(146,146,146,0.95)",
    },
  },
  overrides: {
    MuiAvatar: {
      colorDefault: {
        color: "#fff",
        backgroundColor: COLOR_SECONDARY
      }
    },
    MuiPaper: {
      root: {
        maxWidth: "100%"
      }
    },

    MuiCard: {
      root: {
        margin: 5,
        position: "relative"
      }
    },

    MuiCardHeader: {
      root: {
        background: "linear-gradient(90deg, rgba(2,26,37,1) 0%, rgba(12,42,56,0.7959558823529411) 40%, rgba(137,190,215,0.5998774509803921) 100%)",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
      },
    },

    MuiCardContent: {
      root: {
        overflow: "hidden",
        backgroundColor: "#464646"
      }
    },
  }
});



function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>

      <AppContext>
        <Dispatcher/>
      </AppContext>

    </ThemeProvider>
  );
}

export default App;
