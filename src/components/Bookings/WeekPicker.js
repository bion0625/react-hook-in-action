import { useReducer, useRef, useState } from "react";
import reducer from "./WeekReducer";
import { getWeek } from "../../util/date-wrangler";
import { FaCalendarCheck, FaCalendarDay, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function WeekPicker ({date}) {
    const [week, dispatch] = useReducer(reducer, date, getWeek);
    const [dateText, setDateText] = useState("2020-06-24");

    const goToDate = () => {
        dispatch({type: "SET_DATE", payload: dateText});
    };

    return (
        <div>
            <p className="date-picker">
                <button className="btn" onClick={() => dispatch({type: "PREV_WEEK"})}>
                    <FaChevronLeft/>
                    <span>Prev</span>
                </button>

                <button className="btn" onClick={() => dispatch({type: "TODAY"})}>
                    <FaCalendarDay/>
                    <span>Today</span>
                </button>

                <span>
                    <input type="text" value={dateText} onChange={(e) => setDateText(e.target.value)} placeholder="e.g. 2020-09-02" defaultValue="2020-06-24"/>
                    <button className="to btn" onClick={goToDate}>
                        <FaCalendarCheck/>
                        <span>Go</span>
                    </button>
                </span>

                <button className="btn" onClick={() => dispatch({type: "NEXT_WEEK"})}>
                    <span>Next</span>
                    <FaChevronRight/>
                </button>
            </p>
            <p>
                {week.start.toDateString()} - {week.end.toDateString()}
            </p>
        </div>
    );
}