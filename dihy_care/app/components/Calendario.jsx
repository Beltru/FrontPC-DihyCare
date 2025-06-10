"use client"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isToday } from "date-fns"
import clsx from "clsx"


const currentDate = new Date()
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const firstDayOfMonth = startOfMonth(currentDate);
const lastDayOfMonth = endOfMonth(currentDate);
const daysInMonth= eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
}) 
const startingDayIndex = getDay(firstDayOfMonth);




const EventCalendar = () => {
    

    return (
        <div className="p-4">
            <div className="mb-4">
            <h2 className="text-center">
                {format(currentDate, "MMMM yyyy")}
            </h2>

            <div className="grid grid-cols-7 gap-2">
                {WEEKDAYS.map((day) => (
                    <div key={day} className="font-bold border text-center px-12">
                        {day}
                    </div>
                ))}

                {Array.from({ length: startingDayIndex }).map((_, index) => {
                    return <div key={`empty-${index}`} className="border rounded-md p-2 text-center"/>;
                    })}

                {daysInMonth.map((day, index)=>{
                    return <div key={index} className={clsx("border rounded-md p-2 text-center", {
                        "bg-blue-200": isToday(day),
                        "text gray-900": isToday(day),
                     })}>{format(day, "d")}</div>
                })}
            </div>
           </div>
        </div>
    )
}

export default EventCalendar
