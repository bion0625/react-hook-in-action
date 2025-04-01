import { useQuery } from "@tanstack/react-query";
import getData from "../../util/api";
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { Suspense } from "react";

const BookingRow = ({booking: {id, date, session, title, bookableId}}) => {
    const {data: bookable, isFetching, isError} = useQuery({
        queryKey: ["bookable", bookableId],
        queryFn: () => getData(`http://localhost:3001/bookables/${bookableId}`)
    });

    return (
        <tr key={id} className={isFetching ? "fetching" : null}>
            <td>
                <Link to={`/bookings?bookableId=${bookableId}&date=${date}`}>
                    {title}
                </Link>
            </td>
            <td>{(new Date(date)).toDateString()}</td>
            <td>{session}</td>
            <td>{bookable ? bookable.title : isError ? "???" : <FaSpinner/>}</td>
        </tr>
    )
};

const BookingsTable = ({bookings}) => {
    return bookings.length > 0 ? (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Session</th>
                    <th>Bookable</th>
                </tr>
            </thead>
            <tbody>
                {bookings.map(b => <BookingRow booking={b} key={b.id}/>)}
            </tbody>
        </table>
    ) : (
        <p>There are no bookings for this user.</p>
    );
};

const UserBookings = ({id}) => {
    const {data: bookings} = useQuery({
        queryKey: ["userbookings", id],
        queryFn: () => getData(`http://localhost:3001/bookings?bookerId=${id}&_sort=date`)
            .then(res => {
                const today = new Date();
                const todayString = today.toISOString().split('T')[0];
                return res.filter(booking => booking.date >= todayString);
            }),
        suspense: true
    });

    return (
        <div className="user-bookings">
            <Suspense fallback={<p>Loading user bookings...</p>}>
                <BookingsTable bookings={bookings}/>
            </Suspense>
        </div>
    );
};

export default UserBookings;