import { useTheme } from "next-themes"
import { Moon, Sun } from "phosphor-react"

export function Toggle() {
    const {theme, setTheme} = useTheme()

    return (
        <button
            className="transition-all rounded-xl h-6 w-6 flex items-center justify-center"
            onClick={() => setTheme(theme === 'Light' ? 'dark' : 'Light')}
        >
            {theme !== 'Light' ? (<Moon size={18} />) : (<Sun size={18} />)}
        </button>
    )
}