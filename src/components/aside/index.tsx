import { Calendar } from "phosphor-react"

export function Aside() {
    const timeCalendarNav = [
        {
            name: "Dia",
            link: "/calendar/day"
        },
        {
            name: "Semana",
            link: "/calendar/week"
        },
        {
            name: "Mês",
            link: "/calendar/month"
        },
        {
            name: "Ano",
            link: "/calendar/year"
        }
    ]

    return (
        <aside id="aside" className="bg-slate-400/80 dark:bg-slate-800 w-64 flex justify-center">
            <ul className="m-3 rounded-xl flex flex-col h-min">

                {
                    timeCalendarNav.map((value, index) => {
                        function href() {
                            let path = window.location.pathname
                            if ((path.match(/\//g) || []).length > 2){
                                const position = path.indexOf("/", value.link.length - 1)
                                path = path.slice(0, position)
                            }
                            if (path === value.link) return window.location.pathname = "calendar";
                            window.location.pathname = value.link
                        }
                        return (
                            <li
                                className="cursor-pointer rounded-md my-0.5 dark:text-indigo-100 text-slate-900 font-normal w-56 h-8 text-center transition-all hover:bg-slate-400 dark:hover:bg-slate-700"
                                key={index}
                                onClick={href}
                            >
                                <Calendar className="absolute" size={25} />
                                <span>{value.name}</span>
                            </li>
                        )
                    })
                }
            </ul>
        </aside>
    )
}