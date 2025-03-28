import BookablesList from "./BookablesList";
import BookableDetails from "./BookableDetails";
import useFetch from "../../util/useFetch";
import { Link, useParams } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";
import { FaPlus } from "react-icons/fa";

const BookablesView = () => {

    const {data: bookables = [], status, error} = useFetch("http://localhost:3001/bookables");

    const {id} = useParams();

    const bookable = bookables.find(b => b.id == id) || bookables[0];

    if (status === "error") return <p>{error.message}</p>
    if (status === "loading") return <CgSpinner/>

    return (
        <main className="bookables-page">
            <div>
                <BookablesList bookable={bookable} bookables={bookables} getUrl={id => `/bookables/${id}`}/>
                <p className="controls">
                    <Link to="/bookables/new" replace={true} className="btn">
                        <FaPlus/>
                        <span>New</span>
                    </Link>
                </p>
            </div>

            <BookableDetails bookable={bookable}/>
        </main>
    )
};

export default BookablesView;