import { useMemo } from "react";
import { isDate, shortISO } from "../../util/date-wrangler";
import useFetch from "../../util/useFetch";
import { getGrid, transformBookings } from "./grid-builder";
import { useSearchParams } from "react-router-dom";

export const useBookings = (bookableId, startDate, endDate) => {
    const start = shortISO(startDate);
    const end = shortISO(endDate);

    const urlRoot = "http://localhost:3001/bookings";

    // const queryString = `bookableId=${bookableId}&date_gte=${start}&date_lte=${end}`;
    const queryString = `bookableId=${bookableId}`;// json-server 기간쿼리 확인되면 삭제 후 윗줄 주석 해제

    const query = useFetch(`${urlRoot}?${queryString}`);

    return {
        bookings: query.data ? transformBookings(query.data) : {},
        ...query
    };
};

export const useGrid = (bookable, startDate) => {
    return useMemo(
        () => bookable ? getGrid(bookable, startDate) : {},
        [bookable, startDate]
    );
};

export const useBookingsParams = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const searchDate = searchParams.get("date");
    const bookableId = searchParams.get("bookableId");

    const date = isDate(searchDate) ? new Date(searchDate) : new Date();

    const idInt = parseInt(bookableId, 10);
    const hasId = !isNaN(idInt);

    const setBookingsDate = date => {
        const params = {};

        if (hasId) {params.bookableId = bookableId};
        if (isDate(date)) {params.date = date};

        if (params.date || params.bookableId !== undefined) setSearchParams(params, {replace:true});
    };

    return {
        date,
        bookableId: hasId ? idInt : undefined,
        setBookingsDate
    };
};