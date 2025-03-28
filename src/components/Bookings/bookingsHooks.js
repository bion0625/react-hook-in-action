import { useMemo } from "react";
import { shortISO } from "../../util/date-wrangler";
import useFetch from "../../util/useFetch";
import { getGrid, transformBookings } from "./grid-builder";

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