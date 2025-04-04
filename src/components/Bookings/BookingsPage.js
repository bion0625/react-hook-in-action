import BookablesList from "../Bookables/BookablesList";
import Bookings from "./Bookings";
import { useBookingsParams } from "./bookingsHooks";
import { shortISO } from "../../util/date-wrangler";
import { FaSpinner } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import getData from "../../util/api";

export default function BookingsPage () {

    const {data: bookables=[]} = useQuery({
        queryKey: ["bookables"], 
        queryFn: () => getData("http://localhost:3001/bookables"), 
        suspense: true
    });
    const {date, bookableId} = useBookingsParams();

    const bookable = bookables.find(b => b.id == bookableId) || bookables[0];
    
    const getUrl = id => {
        const root = `/bookings?bookableId=${id}`;
        return date ? `${root}&date=${shortISO(date)}` : root;
    };

    return (
        <main className="bookings-page">
            <BookablesList bookable={bookable} bookables={bookables} getUrl={getUrl}/>
            <Bookings bookable={bookable}/>
        </main>
    )
}