import { getAuth } from "firebase/auth";
import { Plus } from "phosphor-react";
import { useRef, useState } from "react";
import { app } from "../../firebase";
import { GetDate } from "../../utils/getDate";
import { OnClickOut } from "../../utils/onClickOut";
import { SetNewEvent } from "../../services/setNewEvent";
import { TimeFormat } from "../../utils/timeFormat";

export function AddReminder() {
    const [hidden, setHidden] = useState<boolean>(true)

    const tittleRef = useRef<HTMLInputElement>(null)
    const colorRef = useRef<HTMLInputElement>(null)
    const startRef = useRef<HTMLInputElement>(null)
    const endRef = useRef<HTMLInputElement>(null)
    const formRef = useRef(null)

    const userId = getAuth(app).currentUser?.uid

    const TwoDigitFormat = (value: number) => value < 10 ? '0' + value : value 

    const defaultDay = `${GetDate().year}-${TwoDigitFormat(GetDate().month)}-${TwoDigitFormat(GetDate().day)}`
    const defaultValue = (number: number) => `${defaultDay}T${TwoDigitFormat(GetDate().hour + number)}:00`

    OnClickOut(formRef, () => setHidden(true))

    const inputStyles = "outline-none text-slate-100 bg-transparent placeholder:text-gray-300"

    function handleNewEvent(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const tittle = tittleRef.current?.value
        const color = colorRef.current?.value
        const start = startRef.current?.value
        const end = endRef.current?.value

        const isUndefined =
            tittle === undefined || tittle === ''
            || color === undefined || color === ''
            || start === undefined || start === ''
            || end === undefined || end === ''
            || userId === undefined || userId === ''

        if (isUndefined) return alert('todos os campos devem ser preenchidos!')
        if (start === end) return alert('O evento tem que durar pelo menos 1 minuto!')
        SetNewEvent({ start, color, end, tittle, userId })
    }

    function changeEndValue(e: string){
        if (!endRef.current) return console.error("end.current is null");

        const { Day, Hour } = TimeFormat(e)
        const { year, month, day, hour, minute } = GetDate(Day.year, Day.month, Day.day, Hour.hour, Hour.minute).plus({ hour: 1 })
        const timeString = `${TwoDigitFormat(year)}-${TwoDigitFormat(month)}-${TwoDigitFormat(day)}T${TwoDigitFormat(hour)}:${TwoDigitFormat(minute)}`

        endRef.current.value = timeString
    }

    function changeStartValue(e: string) {
        if (!startRef.current || !endRef.current) return console.error("start.current or end.current is null");

        function isValid(startDate: string, endDate: string): boolean {
            const GetTime = (date: string) => {
                const { Day, Hour } = TimeFormat(date)
                return GetDate(Day.year, Day.month, Day.day, Hour.hour, Hour.minute).toJSDate().getTime()
            }
    
            return GetTime(startDate) < GetTime(endDate)
        }

        if (isValid(startRef.current.value, endRef.current.value)) return alert ('start must be lower than end!')

        const { Day, Hour } = TimeFormat(e)
        const { year, month, day, hour, minute } = GetDate(Day.year, Day.month, Day.day, Hour.hour, Hour.minute).plus({ hour: -1 })
        const timeString = `${TwoDigitFormat(year)}-${TwoDigitFormat(month)}-${TwoDigitFormat(day)}T${TwoDigitFormat(hour)}:${TwoDigitFormat(minute)}`

        startRef.current.value = timeString
    }

    return (
        <div className="absolute right-4 bottom-4">
            { hidden ? null :
                <form onSubmit={handleNewEvent} className="flex flex-col p-4 bg-slate-400 dark:bg-slate-800 rounded-xl" ref={formRef}>
                <div className="border-b-2 border-solid px-2 border-gray-600">
                    <input
                        type="text"
                        className={`${inputStyles} w-64 auto`}
                        placeholder="Título"
                        autoComplete='off'
                        ref={tittleRef}
                    />
                </div>
                <div className="border-b-2 border-solid px-2 border-gray-600 grid grid-flow-row grid-cols-2">
                    <label className="mx-2 text-slate-100" htmlFor="color" >Cor do evento</label>
                    <input
                        type="color"
                        id="color"
                        className="h-6 w-6 mr-[0.75rem] bg-transparent p-0 appearance-none rounded-full"
                        defaultValue="#434DD0"
                        ref={colorRef}
                    />
                    <label className="mx-2 text-slate-100" htmlFor="start">Data de Inicio</label>
                    <label className="mx-2 text-slate-100" htmlFor="end">Data de Fim</label>
                    <input
                        type="datetime-local"
                        id="start"
                        className={`${inputStyles} mx-2`}
                        defaultValue={defaultValue(1)}
                        onChange={e => changeEndValue(e.target.value)}
                        ref={startRef}
                    />
                    <input
                        type="datetime-local"
                        id="end"
                        className={`${inputStyles} mx-2`}
                        defaultValue={defaultValue(2)}
                        onChange={e => changeStartValue(e.target.value)}
                        ref={endRef}
                    />
                </div>
                <div className="flex flex-row justify-around">
                    <input type="submit" value="Enviar" className="rounded-xl h-8 w-40 bg-green-600 m-2 hover:bg-green-500" />
                    <input type="reset" value="Cancelar" onClick={() => setHidden(true)} className="rounded-xl h-8 w-40 bg-red-600 m-2 hover:bg-red-500" />
                </div>
            </form>
            }
            <button
                title="abrir formulário para novo evento"
                className="
                    hover:opacity-70 
                    rounded-full 
                    h-12 w-12 
                    ml-auto mt-2
                    flex items-center justify-center 
                    dark:bg-slate-800 bg-slate-400
                    border-2 border-solid border-slate-600 dark:border-slate-900
                "
                onClick={() => setHidden(false)}
            >
                <Plus size={24} />
            </button>
        </div>
    )
}