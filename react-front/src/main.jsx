import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { TasksProvider } from './context/TasksContext.jsx'
import './index.css'

/**
 * Punto de entrada principal de la aplicación React.
 * Renderiza el componente `App` dentro del elemento con ID 'root' en `index.html`.
 * `StrictMode` ayuda a identificar problemas potenciales en la aplicación durante el desarrollo.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TasksProvider>
      <App />
    </TasksProvider>
  </StrictMode>,
)
