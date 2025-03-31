import { useMemo } from "react";
import { isDate, shortISO } from "../../util/date-wrangler";
import { getGrid, transformBookings } from "./grid-builder";
import { useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getData, { createItem, deleteItem, editItem } from "../../util/api";

export const useBookings = (bookableId, startDate, endDate) => {
    const start = shortISO(startDate);
    const end = shortISO(endDate);

    const urlRoot = "http://localhost:3001/bookings";

    // const queryString = `bookableId=${bookableId}&date_gte=${start}&date_lte=${end}`;
    const queryString = `bookableId=${bookableId}`;// json-server 기간쿼리 확인되면 삭제 후 윗줄 주석 해제

    // const query = useQuery({queryKey: [bookableId, startDate, endDate], queryFn: () => getData(`${urlRoot}?${queryString}`)});
    const query = useQuery({queryKey: ["bookings", bookableId], queryFn: () => getData(`${urlRoot}?${queryString}`)});// json-server 기간쿼리 확인되면 삭제 후 윗줄 주석 해제

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

    // const idInt = parseInt(bookableId, 10);
    // const hasId = !isNaN(idInt);
    const idInt = bookableId;
    const hasId = true;
    // json-server가 id를 문자열로 받아서 생긴 오류 수정; 만약 숫자로 받는다면 위 두 줄 삭제 후 그 위의 두 줄 주석 해제제

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

export const useCreateBooking = (key) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: item => createItem("http://localhost:3001/bookings", item),
        onSuccess: booking => {
            queryClient.invalidateQueries(key);
            const bookings = queryClient.getQueryData(key) || [];
            queryClient.setQueryData({
                queryKey: key,
                queryFn: () => [...bookings, booking]
            })
        }
    });
    return {
        createBooking: mutation.mutate,
        isCreating: mutation.isLoading
    };
};

export const useUpdateBooking = (key) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: item => editItem(`http://localhost:3001/bookings/${item.id}`, item),
        onSuccess: booking => {
            queryClient.invalidateQueries(key);
            const bookings = queryClient.getQueryData(key) || [];
            const bookingIndex = bookings.findIndex(b => b.id == booking.id);
            bookings[bookingIndex] = booking;
            queryClient.setQueryData({
                queryKey: key,
                queryFn: () => bookings
            });
        }
    });
    return {
        updateBooking: mutation.mutate,
        isUpdating: mutation.isLoading
    };
};

export const useDeleteBooking = (key) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: id => deleteItem(`http://localhost:3001/bookings/${id}`),
        onSuccess: (resp, id) => {
            queryClient.invalidateQueries(key);
            const bookings = queryClient.getQueryData(key) || [];
            queryClient.setQueryData({
                queryKey: key,
                queryFn: () => bookings.filter(b => b.id != id)
            })
        }
    });
    return {
        deleteBooking: mutation.mutate,
        isDeleting: mutation.isLoading
    };
};