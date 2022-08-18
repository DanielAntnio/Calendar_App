import { GetDate } from "../getDate"
import { Month } from "../month"

type year = {
    year: number
}

export function Year({ year}: year) {
    let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

    return (
        <ul className="grid hidde grid-cols-4 grid-rows-3 w-full h-full" >
            {
                months.map((month, index) => {
                    return (
                        <li key={index} className="w-full h-full flex flex-col" >
                            <div className="bg-slate-600 w-full justify-between items-center border-2 border-solid border-slate-800">
                                <h3 className='text-slate-200 text-center'>{GetDate(year, month).monthShort}</h3>
                            </div>
                            <Month month={month} year={year} showYear={true} />
                        </li >
                    )
                })
            }
        </ul>
    )
}