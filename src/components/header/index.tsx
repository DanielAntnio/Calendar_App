import { useTheme } from "next-themes"
import { Moon, SignOut, Sun } from "phosphor-react"
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { SignOutFunction } from "../../services/signOut";

export function Header() {
    const { theme, setTheme } = useTheme()
    const [userName, setUserName] = useState<string | null>(null)
    const [isLog, setIsLog] = useState<boolean>(false)

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                setUserName(user.displayName)
                setIsLog(true)
            }
        })
    }, [])

    return (
        <header id="header" className="bg-slate-400 dark:bg-gray-900 w-full flex items-center justify-between px-4">
            <h2 className="text-gray-900 dark:text-white/90 text-xl left-1/2 font-extrabold select-none">
                Calendar
            </h2>
            <div className="flex items-center justify-center">
                {isLog ? <h3>{userName ? userName : "Usúario Indefinido!"}</h3> : null}
                <button
                    type="button"
                    className="transition-all rounded-xl h-6 w-6 flex items-center justify-center ml-2"
                    title="Mudar Tema"
                    onClick={() => setTheme(theme === 'Light' ? 'dark' : 'Light')}
                >
                    {theme !== 'Light' ? (<Moon size={18} />) : (<Sun size={18} />)}
                </button>
                {!isLog ? null
                    : <SignOut size={18} className="ml-2 cursor-pointer" onClick={() => SignOutFunction()} />
                }
            </div>
        </header>
    )
}