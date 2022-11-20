import { SmileyXEyes } from "phosphor-react"
import { useEffect, useState } from "react"
import { auth } from "../../firebase"

export function NotFound(){
    const [path, setPath] = useState<string>("login")

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) setPath("calendar")
        })
    }, [])

    return (
        <main className="flex flex-1 p-10 justify-center items-center h-full w-full bg-slate-200 dark:bg-gray-700 select-none">
            <SmileyXEyes className="m-4" size={256} />
            <div className="flex flex-col justify-center text-center">
                <h1 className="text-xl">A pagina que você tentou acessar não está disponivel ou não existe</h1>
                <nav className="flex flex-row justify-center text-center text-lg">
                    <span className="mr-1" >Voltar para a pagina </span>
                    <a 
                        href={path}
                        className="dark:text-blue-300text-sm border-b-2 border-solid 
                            text-slate-700 border-slate-700 hover:text-slate-500 hover:border-slate-500
                            dark:text-slate-300 dark:border-slate-300 dark:hover:text-slate-200 dark:hover:border-slate-200"
                    >{path === "calendar" ? "Home" : "LogIn"}</a>
                </nav>
            </div>
        </main>
    )
}