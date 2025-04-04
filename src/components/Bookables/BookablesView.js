import BookablesList from "./BookablesList";
import BookableDetails from "./BookableDetails";
import { Link, useParams } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";
import { FaPlus } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import getData from "../../util/api";

const BookablesView = () => {

    const {data: bookables = []} = 
        useQuery({
            queryKey: ["bookables"], 
            queryFn: () => getData("http://localhost:3001/bookables"),
            suspense: true
        });

    const {id} = useParams();

    const bookable = bookables.find(b => b.id == id) || bookables[0];

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