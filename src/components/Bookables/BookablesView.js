import { Fragment, useState } from "react";
import BookablesList from "./BookablesList";
import BookableDetails from "./BookableDetails";

const BookablesView = () => {
    const [bookable, setBookable] = useState();

    return (
        <Fragment>
            <BookablesList bookable={bookable} setBookable={setBookable}/>
            <BookableDetails bookable={bookable}/>
        </Fragment>
    )
};

export default BookablesView;