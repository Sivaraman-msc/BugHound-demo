import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BugProvider } from './context/BugContext.jsx'

createRoot(document.getElementById('root')).render(
    <BugProvider>
        <App />
    </BugProvider>
)
