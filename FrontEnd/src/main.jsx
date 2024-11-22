import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom"
import { CssBaseline} from '@mui/material'
import {Provider} from "react-redux"
import store from "../Redux/store.js"
import './index.css'
import App from './App.jsx'
 import { ThemeProvider ,createTheme  } from '@mui/material/styles';  


 import 'bootstrap/dist/css/bootstrap.min.css'; 

/*  const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});
console.log(theme) */

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Provider store={store}>
      {/* <ThemeProvider theme={theme}> */}
       <CssBaseline/> 
    <App />
  {/*   </ThemeProvider> */}
    </Provider>
    </Router>
  </StrictMode>,
)
