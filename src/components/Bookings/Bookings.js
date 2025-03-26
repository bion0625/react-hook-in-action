import { useReducer, useState } from "react";
import WeekPicker from "./WeekPicker";
import { getWeek } from "../../util/date-wrangler";
import weekReducer from "./weekReducer";
import BookingsGrid from "./BookingsGrid";
import BookingDetails from "./BookingDetails";

const Bookings = ({bookable}) => {

    const [week, dispatch] = useReducer(weekReducer, new Date(), getWeek);
    const [booking, setBooking] = useState(null);

    return (
        <div className="bookings">
            <div>
                <WeekPicker dispatch={dispatch}/>
                <BookingsGrid week={week} bookable={bookable} booking={booking} setBooking={setBooking}/>
            </div>
            <BookingDetails booking={booking} bookable={bookable}/>
        </div>
    )
};

export default Bookings;