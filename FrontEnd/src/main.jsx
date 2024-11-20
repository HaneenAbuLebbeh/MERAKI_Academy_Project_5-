import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom"
import { CssBaseline } from '@mui/material'
import {Provider} from "react-redux"
import store from "../Redux/store.js"
import './index.css'
import App from './App.jsx'

import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Provider store={store}>
      <CssBaseline/>
    <App />
    </Provider>
    </Router>
  </StrictMode>,
)
