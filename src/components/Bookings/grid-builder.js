import data from "../../static.json";
import { addDays, shortISO } from "../../util/date-wrangler";

export const getGrid = (bookable, startDate) => {

    const dates = bookable.days.sort().map(d => shortISO(addDays(startDate, d)));

    const sessions = bookable.sessions.map(i => data.sessions[i]);

    const grid = {};

    sessions.forEach(session => {
        grid[session] = {};
        dates.forEach(date => grid[session][date] = {
            session,
            date,
            bookableId: bookable.id,
            title: "",
        });
    });

    return {
        grid,
        dates,
        sessions
    }
};

export const transformBookings = (bookingsArray) => {
    return bookingsArray.reduce((bookings, booking) => {
        const {session, date} = booking;

        if (!bookings[session]) bookings[session] = {};

        bookings[session][date] = booking;

        return bookings;
    }, {})
}