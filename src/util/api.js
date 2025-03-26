import { shortISO } from "./date-wrangler";

const getData = (url) => {
    return fetch(url)
    .then(res => {
        if (!res.ok) throw new Error(`There was a problem fetching data.`);
        return res.json();
    });
};

export default getData;

export const getBookings = (bookableId, startDate, endDate) => {
    const start = shortISO(startDate);
    const end = shortISO(endDate);

    const urlRoot = "http://localhost:3001/bookings";

    // const query = `bookableId=${bookableId}&date_gte=${start}&date_lte=${end}`;
    const query = `bookableId=${bookableId}`;// todo json-server 기간쿼리 확인되면 이 줄 삭제 후 윗줄 주석 해제

    return getData(`${urlRoot}?${query}`);
}