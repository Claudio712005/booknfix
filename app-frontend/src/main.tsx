import './i18n';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { PrimeReactProvider } from 'primereact/api';                          

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
  </StrictMode>,
)
