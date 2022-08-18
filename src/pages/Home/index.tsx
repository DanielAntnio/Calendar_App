import { Calendar } from "phosphor-react"; 
import { useState } from "react"; 
import { CalendarFormat } from "./routes/Home.routes";
import { ClassNameHidden, NavItems } from "./types";
import { Toggle } from "./components/toogle";


export function Home() {
    const timeCalendarNav: NavItems[] = [{
        name: "Dia"
    }, {
        name: "Semana"
    }, {
        name: "Mês"
    }, {
        name: "Ano"
    }]

    const [ display, setDisplay ] = useState<ClassNameHidden>({
        Placeholder: true ? "flex" : "hidden",
        Day: false ? "flex" : "hidden",
        Week: false ? "flex" : "hidden",
        Month: false ? "flex" : "hidden",
        Year: false ? "flex" : "hidden",
    })

    function handleFomart(value: string) {
        setDisplay({
            Placeholder: "hidden",
            Day: value == "Dia" ? "flex" : "hidden",
            Week: value == "Semana" ? "flex" : "hidden",
            Month: value == "Mês" ? "flex" : "hidden",
            Year: value == "Ano" ? "flex" : "hidden",
        })
    }

    function handlePlaceholder() {
        setDisplay({
            Placeholder: "flex",
            Day: "hidden",
            Week: "hidden",
            Month: "hidden",
            Year: "hidden",
        })
    }

    return (
        <div id="screen" className="flex flex-col h-screen w-full">
            <header className="bg-slate-500 dark:bg-slate-900 h-8 w-full flex items-center justify-between px-4">
                <h2 className="text-gray-900 dark:text-slate-400 text-xl left-1/2 font-Roboto font-extrabold ">Calendar</h2>
                <Toggle />
            </header>
            <div id="center" className="flex flex-row flex-1 w-full">
                <aside className="bg-slate-400 dark:bg-slate-800 w-64 flex justify-center">
                    <ul className="m-3 rounded-xl h-min ">
                        <li>
                            <div id="navTittleFormat" className="bg-slate-600 dark:text-indigo-100 text-slate-900 font-normal font-Roboto dark:bg-slate-700 rounded-t-xl text-center border-2 border-solid border-gray-700 dark:border-slate-900" >Formatação do Calendario</div>
                        </li>
                        {
                            timeCalendarNav.map((value, index) => {
                                let last: string = index === timeCalendarNav.length - 1 ? "rounded-b-xl" : " "
                                return (
                                    <li key={index}>
                                        <Calendar className="absolute m-1" color="#1d1d1d" size={25} />
                                        <input
                                            type="button"
                                            onClick={() => handleFomart(value.name)}
                                            onDoubleClick={() => handlePlaceholder()}
                                            className={`bg-slate-500 dark:text-indigo-100 text-slate-900 font-normal font-Roboto dark:bg-slate-600 w-56 h-8 ${last} border-2 text-center border-solid border-gray-700 dark:border-slate-900 dark:hover:border-teal-500  hover:border-teal-400  dark:hover:border-3 hover:border-3`}
                                            value={value.name}></input>
                                        <br></br>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </aside>
                <main className="bg-slate-300 dark:bg-slate-600 flex-1 flex dark:text-stone-200 text-stone-900 items-center justify-center flex-col">
                    <CalendarFormat {...display} />
                </main>
            </div>
            <footer className="h-8 w-full flex items-center justify-center dark:text-gray-100 bg-slate-800 dark:bg-gray-900 text-gray-200">
                © Daniel 2022-08
            </footer>
        </div>
    )
}