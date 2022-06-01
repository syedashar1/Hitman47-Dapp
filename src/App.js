import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import AgentScreen from './components/AgentScreen';
import App from './components/App';
import Navbar from './components/Navbar';
import { ThemeProvider , createTheme} from '@mui/material';
import BuyTokens from './components/BuyTokens';

export default function AppMain() {

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

  return (
    <div>
    {/* <Navbar/> */}

    <ThemeProvider theme={theme}>
     <BrowserRouter>
     <Routes>
            <Route path="/" element={<App />}></Route>
            <Route path="/agent/:idStr" exact element={<AgentScreen />}></Route>
            <Route path="/ICA/buytokens" exact element={<BuyTokens />}></Route>
    </Routes>
     </BrowserRouter>
     </ThemeProvider>
    </div>
  )
}
