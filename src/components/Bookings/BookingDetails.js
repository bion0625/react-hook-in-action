import Booking from "./Booking";
import { useUser } from "../Users/UserContext";
import { FaEdit } from "react-icons/fa";

const BookingDetails = ({booking, bookable}) => {

    const [user] = useUser();

    const isBooker = booking && user && (booking.bookerId == user.id);

    return (
        <div className="booking-details">
            <h2>
                Booking Details
                {isBooker && (
                    <span className="controls">
                        <button className="btn">
                            <FaEdit/>
                        </button>
                    </span>
                )}
            </h2>

            {booking ? (
                <Booking booking={booking} bookable={bookable}/>
            ) : (
                <div className="booking-details-fields">
                    <p>Select a booking or a booking slot.</p>
                </div>
            )}
        </div>
    );
};

export default BookingDetails;