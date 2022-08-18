import { ThemeProvider } from 'next-themes' 
import ReactDOM from 'react-dom/client'
import { Home } from './pages/Home'
import './input.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ThemeProvider attribute='class'>
        <Home />
    </ThemeProvider>
)