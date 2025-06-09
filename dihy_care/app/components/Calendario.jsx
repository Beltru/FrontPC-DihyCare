"use client"
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns"

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const firstDayMonth = startOfMonth(currentDate);
const lastDayOfMonth = endOfMonth(currentDate);
const daysInMonth= eachDayOfInterval({
    start: firstDayMonth,
    end: lastDayOfMonth,
})

const EventCalendar = () => {
    const currentDate = new Date()

    return (
        <div className="p-4">
            <div className="mb-4">
            <h2 className="text-center text-lg font-bold mb-4">
                {format(currentDate, "MMMM yyyy")}
            </h2>
            <div className="grid grid-cols-7 gap-8 text-center">
                {WEEKDAYS.map((day) => (
                    <div key={day} className="font-bold border text-center px-12">
                        {day}
                    </div>
                ))}
                {daysInMonth.map((day)=>{
                    return <div>{format(day, "d")}</div>
                })}
            </div>
           </div>
        </div>
    )
}

export default EventCalendar
