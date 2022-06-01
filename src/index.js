import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import * as serviceWorker from './serviceWorker';
import { ThemeProvider , createTheme} from '@mui/material';
import AppMain from './App';
const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#f0c000',
      },
      secondary: {
        main: '#208080',
      },
    },
  });
ReactDOM.render(
<ThemeProvider theme={theme}><AppMain /></ThemeProvider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
