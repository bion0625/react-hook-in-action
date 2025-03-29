import BookablesList from "../Bookables/BookablesList";
import Bookings from "./Bookings";
import { useBookingsParams } from "./bookingsHooks";
import useFetch from "../../util/useFetch";
import { shortISO } from "../../util/date-wrangler";
import { FaSpinner } from "react-icons/fa";

export default function BookingsPage () {

    const {data: bookables=[], status, error} = useFetch("http://localhost:3001/bookables")
    const {date, bookableId} = useBookingsParams();

    const bookable = bookables.find(b => b.id == bookableId) || bookables[0];
    
    const getUrl = id => {
        const root = `/bookings?bookableId=${id}`;
        return date ? `${root}&date=${shortISO(date)}` : root;
    };

    if (status === "error") return <p>{error.message}</p>;

    if (status === "loading") return <FaSpinner/>

    return (
        <main className="bookings-page">
            <BookablesList bookable={bookable} bookables={bookables} getUrl={getUrl}/>
            <Bookings bookable={bookable}/>
        </main>
    )
}