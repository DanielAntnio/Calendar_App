export const WeekDaysHeader = () =>
    <ul className="flex-row justify-between items-center w-full flex">
        {
            ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sat"].map((weekday, index) => {
                return (
                    <li 
                        className="bg-slate-700 text-zinc-200 dark:bg-slate-800 p-1 w-full border-2 border-solid border-slate-800 dark:border-slate-900" 
                        key={index}
                    >
                        {weekday}
                    </li>
                )
            })
        }
    </ul>