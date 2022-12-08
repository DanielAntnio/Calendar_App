import { getAuth } from "firebase/auth"
import { Plus } from "phosphor-react"
import { useState, useRef } from "react"
import { app } from "../../firebase"
import { SetNewEvent } from "../../services/setNewEvent"
import { GetDate } from "../../utils/getDate"
import { GetdateByDayDate } from "../../utils/getDateBydayDate"
import { GetTimeByDayDate } from "../../utils/getTimeByDayDate"
import { OnClickOut } from "../../utils/onClickOut"
import { TimeFormat } from "../../utils/timeFormat/default"
import { TwoDigitFormat } from "../../utils/TwoDigitFormat"
import "./style.css"

export function AddReminder() {
    const [hidden, setHidden] = useState<boolean>(true)
    const [allDay, setAllDay] = useState<boolean>(false)

    const titleRef = useRef<HTMLInputElement>(null)
    const colorRef = useRef<HTMLInputElement>(null)
    const startRef = useRef<HTMLInputElement>(null)
    const startTimeRef = useRef<HTMLInputElement>(null)
    const endRef = useRef<HTMLInputElement>(null)
    const endTimeRef = useRef<HTMLInputElement>(null)
    const formRef = useRef(null)

    OnClickOut(formRef, () => setHidden(true))

    const inputStyles = "outline-none text-slate-100 bg-transparent placeholder:text-gray-300"

    function handleNewEvent(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const title = titleRef.current?.value
        const color = colorRef.current?.value
        const start = startRef.current?.value
        const startTime = startTimeRef.current?.value
        const end = endRef.current?.value
        const endTime = endTimeRef.current?.value
        const userId = getAuth(app).currentUser?.uid

        const verifyAllDay = allDay ? false : !startTime || !endTime

        if (!title || !color || !start || !end || !userId || verifyAllDay) return alert('todos os campos devem ser preenchidos!')

        const startString = allDay ? `${start}T00:00` : `${start}T${startTime}`
        const endString = allDay ? `${end}T23:59` : `${end}T${endTime}`

        SetNewEvent({ start: startString, color, end: endString, title, userId })
    }

    const dayDefault = (end: boolean = false) => {
        const { day, month, year } = GetDate().plus({ hour: end ? 2 : 1 })
        return `${TwoDigitFormat(year)}-${TwoDigitFormat(month)}-${TwoDigitFormat(day)}`
    }

    const timeDefault = (end: boolean) => TwoDigitFormat(GetDate().plus({ hour: end ? 2 : 1 }).hour) + ":00"

    const isValid = () => {
        const start = startRef.current?.value
        const startTime = startTimeRef.current?.value
        const end = endRef.current?.value
        const endTime = endTimeRef.current?.value

        const verifyAllDay = allDay ? false : !startTime || !endTime

        if (!start || !end || verifyAllDay) return alert("O valor de ínicio ou fim é nulo")

        const startObject = TimeFormat(`${start}T${startTime}`)
        const endObject = TimeFormat(`${end}T${endTime}`)

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

        startOrEnd === "start" ? endRef.current.value = dayString : startRef.current.value = dayString
        startOrEnd === "start" ? endTimeRef.current.value = timeString : startTimeRef.current.value = timeString
    }

    return (
        <div className="absolute right-4 bottom-4">
            {hidden ? null :
                <form onSubmit={handleNewEvent} className="flex flex-col p-4 bg-slate-400 dark:bg-slate-800 rounded-xl" ref={formRef}>
                    <div className="flex flex-row justify-between border-b-2 border-solid px-4 border-gray-600">
                        <input
                            type="text" name="title" id="title" title="title"
                            className={`${inputStyles} w-64 auto`}
                            placeholder="Título"
                            autoComplete='off'
                            ref={titleRef}
                        />
                        <input
                            type="color" name="color" id="color" title="color"
                            className="h-6 w-6 mr-[0.75rem] bg-transparent p-0 appearance-none rounded-full"
                            defaultValue="#434DD0"
                            ref={colorRef}
                        />
                    </div>
                    <div
                        className="border-b-2 border-solid px-4 border-gray-600 grid gap-x-2"
                        id="formContainer"
                    >
                        <label className="text-slate-100 flex justify-between items-center" id="allDay">
                            <span>Todo Dia</span>
                            <input
                                type="checkbox" name="format" id="format"
                                checked={allDay} onChange={e => setAllDay(e.target.checked)}
                                className="h-4 w-4 ml-auto "
                            />
                        </label>

                        <label className="text-slate-100 flex flex-col" id="start">
                            <span>Data de Inicio</span>
                            <input
                                type="date" name="startDate" id="startDate" title="startDate"
                                defaultValue={dayDefault()} onChange={() => ChangeDay("start")}
                                className={inputStyles} ref={startRef}
                            />
                            {
                                allDay ? null :
                                    <input
                                        type="time" name="startTime" id="startTime" title="Hora de início"
                                        defaultValue={timeDefault(false)} onChange={() => ChangeTime("start")}
                                        className={inputStyles} ref={startTimeRef}
                                    />
                            }
                        </label>
                        <label className="text-slate-100 flex flex-col" id="end">
                            <span>Data de Fim</span>
                            <input
                                type="date" name="endDate" id="endDate" title="endDate"
                                defaultValue={dayDefault(true)} onChange={() => ChangeDay("end")}
                                className={inputStyles} ref={endRef}
                            />
                            {
                                allDay ? null :
                                    <input
                                        type="time" name="endTime" id="endTime" title="Hora de fim"
                                        defaultValue={timeDefault(true)} onChange={() => ChangeTime("end")}
                                        className={inputStyles} ref={endTimeRef}
                                    />
                            }
                        </label>
                    </div>
                    <div className="flex flex-row justify-around">
                        <input type="submit" value="Enviar" className="rounded-xl h-8 w-40 bg-green-600 m-2 hover:bg-green-500" />
                        <input type="reset" value="Cancelar" onClick={() => setHidden(true)} className="rounded-xl h-8 w-40 bg-red-600 m-2 hover:bg-red-500" />
                    </div>
                </form>
            }
            <button
                type="button"
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