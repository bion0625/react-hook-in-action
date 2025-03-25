import { useState } from "react";
import data from "../../static.json";

const BookableDetails = ({bookable}) => {
    const {days, sessions} = data;
    const [hasDetails, setHasDetails] = useState(true);

    const toggleDetails = () => {
        setHasDetails(has => !has);
    };

    return bookable ? (
        <div className="bookable-details item">
            <div className="item-header">
                <h2>{bookable.title}</h2>
                <span className="controls">
                    <label>
                        <input type="checkbox" checked={hasDetails} onChange={toggleDetails}/>
                        Show Details
                    </label>
                </span>
            </div>

            <p>{bookable.notes}</p>

            {hasDetails && (
                <div className="item-details">
                    <h3>Availablilty</h3>
                    <div className="bookable-avilability">
                        <ul>
                            {bookable.days
                            .sort()
                            .map(d => <li key={d}>{days[d]}</li>)}
                        </ul>
                        <ul>
                            {bookable.sessions
                            .map(s => <li key={s}>{sessions[s]}</li>)}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    ): null;
};

export default BookableDetails;