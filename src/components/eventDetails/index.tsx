import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import { Pen, XCircle } from "phosphor-react"
import { useRef, useState } from "react"
import { db } from "../../firebase"
import { CalendarEvent, dayDate } from "../../types"
import { GetDate } from "../../utils/getDate"
import { OnClickOut } from "../../utils/onClickOut"
import { TimeFormat } from "../../utils/timeFormat"

type DetailsProps = {
    event: CalendarEvent
    setHidden: Function
}

export function EventDetails({ event, setHidden }: DetailsProps) {
    const tittleRef = useRef<HTMLInputElement>(null)
    const colorRef = useRef<HTMLInputElement>(null)
    const startRef = useRef<HTMLInputElement>(null)
    const endRef = useRef<HTMLInputElement>(null)

    const eventRef = useRef(null)

    const [edit, setEdit] = useState<boolean>(true)

    const inputStyles = "outline-none text-slate-100 bg-transparent placeholder:text-gray-300"

    function handleDeleteEvent(eventId: string) {
        const docRef = doc(db, "events", eventId)
        deleteDoc(docRef)
    }

    function handleEditEvent() {
        const tittle = tittleRef.current?.value
        const color = colorRef.current?.value
        const start = startRef.current?.value
        const end = endRef.current?.value

        const isUndefined =
            tittle === undefined
            || color === undefined
            || start === undefined
            || end === undefined
        if (isUndefined) return alert('todos os campos devem ser preenchidos')
        const docRef = doc(db, "events", event.id)
        updateDoc(docRef, { start, color, end, tittle })
        setHidden(true)
    }

    function changeEndValue(e: string){
        if (!endRef.current) return console.error("end.current is null");

        const { Day, Hour } = TimeFormat(e)
        const { year, month, day, hour, minute } = GetDate(Day.year, Day.month, Day.day, Hour.hour, Hour.minute).plus({ hour: 1 })
        const timeString = `${TDF(year)}-${TDF(month)}-${TDF(day)}T${TDF(hour)}:${TDF(minute)}`

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
        const timeString = `${TDF(year)}-${TDF(month)}-${TDF(day)}T${TDF(hour)}:${TDF(minute)}`

        startRef.current.value = timeString
    }

    const TDF = (value: number) => value < 10 ? '0' + value : value //TwoDigitFormat

    const TimeDefaultFormat = (time: dayDate) => 
    `${time.Day.year}-${TDF(time.Day.month)}-${TDF(time.Day.day)}T${TDF(time.Hour.hour)}:${TDF(time.Hour.minute)}`

    OnClickOut(eventRef, () => setHidden(true))

    return (
        <div
            className="absolute h-full w-full left-0 top-0 items-center justify-center bg-gray-800/50 flex"
        >
            <form 
                className="flex flex-col relative h-[166px] w-[438px] items-center justify-between p-2 rounded-xl bg-slate-400/80 dark:bg-slate-800 overflow-hidden" 
                onSubmit={handleEditEvent}
                ref={eventRef} 
            >
                <Pen size={18} className="absolute right-10 cursor-pointer" onClick={() => setEdit(!edit)} />
                <XCircle size={18} className="absolute right-4 cursor-pointer" onClick={() => handleDeleteEvent(event.id)} />
                <div className="border-b-2 border-solid px-2 border-gray-600">
                    <input
                        type="text"
                        className={`${inputStyles} w-64 auto`}
                        placeholder="Título"
                        defaultValue={event.tittle}
                        autoComplete='off'
                        ref={tittleRef}
                        disabled={edit}
                    />
                </div>
                <div className="border-b-2 border-solid px-2 border-gray-600 grid grid-flow-row grid-cols-2">
                    <span className="mx-2 text-slate-100">Cor do evento</span>
                    <input
                        type="color"
                        className="h-6 w-6 ml-auto mr-[0.75rem] bg-transparent p-0 appearance-none rounded-full"
                        defaultValue={event.color}
                        ref={colorRef}
                        disabled={edit}
                    />
                    <span className="mx-2 text-slate-100">Data de Inicio</span>
                    <span className="mx-2 text-slate-100">Data de Fim</span>
                    <input
                        type="datetime-local"
                        className={`${inputStyles} mx-2`}
                        defaultValue={TimeDefaultFormat(event.start)}
                        ref={startRef}
                        disabled={edit}
                        onChange={e => changeEndValue(e.target.value)}
                    />
                    <input
                        type="datetime-local"
                        className={`${inputStyles} mx-2`}
                        defaultValue={TimeDefaultFormat(event.end)}
                        ref={endRef}
                        disabled={edit}
                        onChange={e => changeStartValue(e.target.value)}
                    />
                </div>
                <div className="flex flex-row justify-around">
                    <input type="submit" value="Editar" className={`rounded-xl h-8 w-40 m-2 bg-green-600 ${edit ? "opacity-40" : null}`} disabled={edit} />
                    <input type="reset" value="Cancelar" onClick={() => setHidden(true)} className="rounded-xl h-8 w-40 bg-red-600 m-2 hover:bg-red-500" />
                </div>
            </form>
        </div>
    )
}
