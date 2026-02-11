import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Buffer } from 'buffer'
import './index.css'
import App from './App.jsx'
import { StateContextProvider } from './context'

window.Buffer = window.Buffer || Buffer;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StateContextProvider>
      <App />
    </StateContextProvider>
  </StrictMode>,
)
