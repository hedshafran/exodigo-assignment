import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { CocktailProvider } from './store/CocktailsContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CocktailProvider>
      <App />
    </CocktailProvider>
  </React.StrictMode>,
)
