import { useTheme } from "next-themes"
import { Moon, SignOut, Sun } from "phosphor-react"
import { useEffect, useState } from "react";
import Loading from "react-loading";
import { auth } from "../../firebase";
import { SignOutFunction } from "../../services/signOut";

export function Header() {
    const { theme, setTheme } = useTheme()
    const [userName, setUserName] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        auth.onAuthStateChanged(user => {
            if (user) setUserName(user.displayName === null ? "Usúario Indefinido!" : user.displayName)
            setIsLoading(false)
        })
    }, [])

    return (
        <header id="header" className="bg-slate-400 dark:bg-gray-900 w-full flex items-center justify-between px-4">
            <h2 className="text-gray-900 dark:text-white/90 text-xl left-1/2 font-extrabold select-none">
                Calendar
            </h2>
            <div className="flex items-center justify-center">
                {isLoading ? <Loading type="spin" height={16} width={16} /> : userName !== null ? <h3>{userName}</h3> : null}
                <button
                    type="button"
                    className="transition-all rounded-xl h-6 w-6 flex items-center justify-center ml-2"
                    title="Mudar Tema"
                    onClick={() => setTheme(theme === 'Light' ? 'dark' : 'Light')}
                >
                    {theme !== 'Light' ? (<Moon size={18} />) : (<Sun size={18} />)}
                </button>
                {isLoading ? <Loading type="spin" height={16} width={16} /> : userName === null ? null
                    : <SignOut size={18} className="ml-2 cursor-pointer" onClick={() => SignOutFunction()} />}
            </div>
        </header>
    )
}