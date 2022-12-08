import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import { Pen, XCircle } from "phosphor-react"
import { useRef, useState } from "react"
import { db } from "../../../firebase"
import { CalendarEvent, Time, Hour } from "../../../types"
import { GetdateByDayDate } from "../../../utils/getDateBydayDate"
import { GetTimeByDayDate } from "../../../utils/getTimeByDayDate"
import { OnClickOut } from "../../../utils/onClickOut"
import { TimeFormat } from "../../../utils/timeFormat/default"
import { TwoDigitFormat } from "../../../utils/TwoDigitFormat"
import "./style.css"

type DetailsProps = {
    event: CalendarEvent
    setHidden: Function
}

export function EventDetails({ event, setHidden }: DetailsProps) {
    const titleRef = useRef<HTMLInputElement>(null)
    const colorRef = useRef<HTMLInputElement>(null)
    const startRef = useRef<HTMLInputElement>(null)
    const startTimeRef = useRef<HTMLInputElement>(null)
    const endRef = useRef<HTMLInputElement>(null)
    const endTimeRef = useRef<HTMLInputElement>(null)

    const eventRef = useRef(null)

    const TimeToString = (time: Time) => {
        const { year, month, day } = time
        return `${TwoDigitFormat(year)}-${TwoDigitFormat(month)}-${TwoDigitFormat(day)}`
    }

    const HourToString = (Hour: Hour) => {
        const { hour, minute } = Hour
        return `${TwoDigitFormat(hour)}:${TwoDigitFormat(minute)}`
    }

    const [edit, setEdit] = useState<boolean>(true)
    const [allDay, setAllDay] = useState<boolean>(HourToString(event.start.Hour) === "00:00" && HourToString(event.end.Hour) === "23:59")

    const inputStyles = "outline-none text-slate-100 bg-transparent placeholder:text-gray-300"

    function handleDeleteEvent(eventId: string) {
        const docRef = doc(db, "events", eventId)
        deleteDoc(docRef)
    }

    function handleEditEvent() {
        const title = titleRef.current?.value
        const color = colorRef.current?.value
        const start = startRef.current?.value
        const startTime = startTimeRef.current?.value
        const end = endRef.current?.value
        const endTime = endTimeRef.current?.value

        const verifyAllDay = allDay ? false : !startTime || !endTime

        if (!title || !color || !start || !end || verifyAllDay) return alert('todos os campos devem ser preenchidos!')

        const startString = allDay ? `${start}T00:00` : `${start}T${startTime}`
        const endString = allDay ? `${end}T23:59` : `${end}T${endTime}`

        updateDoc(doc(db, "events", event.id), { start: startString, color, end: endString, title })
        setHidden(true)
    }

    const isValid = () => {
        const start = startRef.current?.value
        const startTime = startTimeRef.current?.value
        const end = endRef.current?.value
        const endTime = endTimeRef.current?.value

        const verifyAllDay = allDay ? false : !startTime || !endTime

        console.log(!start, !end, verifyAllDay)

        if (!start || !end || verifyAllDay) return alert("O valor de ínicio ou fim é nulo")

        const startObject = TimeFormat(`${start}T${allDay ? "00:00" : startTime}`)
        const endObject = TimeFormat(`${end}T${allDay ? "23:59" : endTime}`)

        return GetTimeByDayDate(startObject) <= GetTimeByDayDate(endObject)
    }

    function ChangeDay(startOrEnd: "start" | "end") {
        const start = startRef.current?.value
        const startTime = startTimeRef.current?.value
        const end = endRef.current?.value
        const endTime = endTimeRef.current?.value

        const verifyAllDay = allDay ? false : !startTime || !endTime

        if (!start || !end || verifyAllDay) return alert("O valor de ínicio ou fim é nulo")

        if (isValid()) return;

        startOrEnd === "end" ? startRef.current.value = end : endRef.current.value = start

        if (isValid()) return;

        if (!allDay) ChangeTime(startOrEnd)
    }

    function ChangeTime(startOrEnd: "start" | "end") {
        const start = startRef.current?.value
        const startTime = startTimeRef.current?.value
        const end = endRef.current?.value
        const endTime = endTimeRef.current?.value

        if (!start || !end || !startTime || !endTime) return alert("O valor de ínicio ou fim é nulo")

        const startOrEndObject = startOrEnd === "start" ? TimeFormat(`${start}T${startTime}`) : TimeFormat(`${end}T${endTime}`)

        if (startOrEnd === "end" && isValid()) return;

        const { day, month, year, hour, minute } = GetdateByDayDate(startOrEndObject).plus({ hour: startOrEnd === "start" ? 1 : -1 })
        const dayString = `${TwoDigitFormat(year)}-${TwoDigitFormat(month)}-${TwoDigitFormat(day)}`
        const timeString = `${TwoDigitFormat(hour)}:${TwoDigitFormat(minute)}`

        if (startOrEnd === "start") {
            endRef.current.value = dayString
            endTimeRef.current.value = timeString
        } else {
            startRef.current.value = dayString
            startTimeRef.current.value = timeString
        }
    }

    OnClickOut(eventRef, () => setHidden(true))

    return (
        <div
            className="absolute h-full w-full left-0 top-0 items-center justify-center bg-gray-800/50 flex"
        >
            <form
                className="flex flex-col relative  items-center justify-between p-2 rounded-xl bg-slate-400/80 dark:bg-slate-800 overflow-hidden"
                onSubmit={handleEditEvent}
                ref={eventRef}
            >

                <div className="flex flex-row w-[328px] border-b-2 border-solid px-2 border-gray-600">
                    <input
                        type="text"
                        className={`${inputStyles} auto`}
                        placeholder="Título"
                        defaultValue={event.title}
                        autoComplete='off'
                        ref={titleRef}
                        disabled={edit}
                    />
                    <input
                        type="color"
                        className="h-6 w-6 ml-auto mr-[0.75rem] bg-transparent p-0 appearance-none rounded-full"
                        defaultValue={event.color}
                        ref={colorRef}
                        disabled={edit}
                    />
                    <Pen size={18} className="cursor-pointer" onClick={() => setEdit(!edit)} />
                    <XCircle size={18} className="cursor-pointer" onClick={() => handleDeleteEvent(event.id)} />
                </div>
                <div className="border-b-2 border-solid px-4 border-gray-600 grid gap-x-2" id="formContainer">
                    <label className="text-slate-100 flex justify-between items-center" id="allDay">
                        <span>Todo Dia</span>
                        <input
                            type="checkbox" name="format" id="format"
                            checked={allDay} onChange={e => setAllDay(e.target.checked)}
                            className="h-4 w-4 ml-auto" disabled={edit}
                        />
                    </label>

                    <label className="text-slate-100 flex flex-col" id="start">
                        <span>Data de Inicio</span>
                        <input
                            type="date" name="startDate" id="startDate" title="startDate"
                            defaultValue={TimeToString(event.start.Day)} onChange={() => ChangeDay("start")}
                            className={inputStyles} ref={startRef} disabled={edit}
                        />
                        {
                            allDay ? null :
                                <input
                                    type="time" name="startTime" id="startTime" title="Hora de início"
                                    defaultValue={HourToString(event.end.Hour)} onChange={() => ChangeTime("start")}
                                    className={inputStyles} ref={startTimeRef} disabled={edit}
                                />
                        }
                    </label>
                    
                    <label className="text-slate-100 flex flex-col" id="end">
                        <span>Data de Fim</span>
                        <input
                            type="date" name="endDate" id="endDate" title="endDate"
                            defaultValue={TimeToString(event.end.Day)} onChange={() => ChangeDay("end")}
                            className={inputStyles} ref={endRef} disabled={edit}
                        />
                        {
                            allDay ? null :
                                <input
                                    type="time" name="endTime" id="endTime" title="Hora de fim"
                                    defaultValue={HourToString(event.end.Hour)} onChange={() => ChangeTime("end")}
                                    className={inputStyles} ref={endTimeRef} disabled={edit}
                                />
                        }
                    </label>
                </div>
                <div className="flex flex-row justify-around">
                    <input type="submit" value="Editar" className={`rounded-xl h-8 w-40 m-2 bg-green-600 ${edit ? "opacity-40" : null}`} disabled={edit} />
                    <input type="reset" value="Cancelar" onClick={() => setHidden(true)} className="rounded-xl h-8 w-40 bg-red-600 m-2 hover:bg-red-500" />
                </div>
            </form>
        </div>
    )
}
