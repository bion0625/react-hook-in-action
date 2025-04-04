import { useRef } from "react";
import { FaCalendarCheck, FaCalendarDay, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useBookingsParams } from "./bookingsHooks";
import { addDays, shortISO } from "../../util/date-wrangler";

export default function WeekPicker () {
    const textboxRef = useRef();

    const {date, setBookingsDate: goToDate} = useBookingsParams();

    const dates = {
        prev: shortISO(addDays(date, -7)),
        next: shortISO(addDays(date, 7)),
        today: shortISO(new Date()),
    };

    return (
        <div>
            <p className="date-picker">
                <button className="btn" onClick={() => goToDate(dates.prev)}>
                    <FaChevronLeft/>
                    <span>Prev</span>
                </button>

                <button className="btn" onClick={() => goToDate(dates.today)}>
                    <FaCalendarDay/>
                    <span>Today</span>
                </button>

                <span>
                    <input type="text" ref={textboxRef} placeholder="e.g. 2020-09-02" defaultValue={new Date().toISOString().split('T')[0]}/>
                    <button className="to btn" onClick={() => goToDate(textboxRef.current.value)}>
                        <FaCalendarCheck/>
                        <span>Go</span>
                    </button>
                </span>

                <button className="btn" onClick={() => goToDate(dates.next)}>
                    <span>Next</span>
                    <FaChevronRight/>
                </button>
            </p>
        </div>
    );
}