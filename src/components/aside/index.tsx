import { Calendar } from "phosphor-react"

export function Aside() {
    const timeCalendarNav = [
        {
            name: "Dia",
            link: "/day"
        },
        {
            name: "Semana",
            link: "/week"
        },
        {
            name: "Mês",
            link: "/month"
        },
        {
            name: "Ano",
            link: "/year"
        }
    ]

    return (
        <aside id="aside" className="bg-slate-400/80 dark:bg-slate-800 w-64 flex justify-center">
            <ul className="m-3 rounded-xl flex flex-col h-min">

                {
                    timeCalendarNav.map((value, index) => {
                        function href() {
                            if (window.location.pathname === value.link) return;
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