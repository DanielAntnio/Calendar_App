import { ThemeProvider } from 'next-themes' 
import ReactDOM from 'react-dom/client'
import './input.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthRoutes } from './routes/auth.routes'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <ThemeProvider attribute='class'>
            <AuthRoutes />
        </ThemeProvider>
    </BrowserRouter>
)