import { Fragment, useEffect, useReducer, useRef } from "react";
import data from "../../static.json"
import { FaArrowRight } from "react-icons/fa";
import reducer from "./reducer";
import getData from "../../util/api";
import { CgSpinner } from "react-icons/cg";

const initialState = {
    group: "Rooms",
    bookableIndex: 0,
    hasDetails: true,
    bookables: [],
    isLoading: true,
    error: false
};

export default function BookablesList () {

    const { days, sessions } = data;

    const [state, dispatch] = useReducer(reducer, initialState);

    const {group, bookableIndex, hasDetails, bookables, isLoading, error} = state;
    
    const bookablesInGroup = bookables.filter(b => b.group === group);
    const bookable = bookablesInGroup[bookableIndex];
    const groups = [...new Set(bookables.map(b => b.group))];

    const timeRef = useRef(null);

    const stopPresentation = () => {
        clearInterval(timeRef.current);
    };

    useEffect(() => {
        dispatch({tpe: "FETCH_BOOKABLES_REQUEST"});
        getData("http://localhost:3001/bookables")
        .then(data => dispatch({type: "FETCH_BOOKABLES_SUCCESS", payload: data}))
        .catch(error => dispatch({type: "FETCH_BOOKABLES_ERROR", payload: error}));
    }, []);

    useEffect(() => {
        timeRef.current = setInterval(() => {
            dispatch({type: "NEXT_BOOKABLE"});
        }, 3000);
        return stopPresentation;
    }, []);

    function changeGroup (e) {
        dispatch({
            type: "SET_GROUP",
            payload: e.target.value,
        })
    }

    function changeBookable (selectedIndex) {
        dispatch({
            type: "SET_BOOKABLE",
            payload: selectedIndex,
        });
    };

    function nextBookable () {
        dispatch({type: "NEXT_BOOKABLE"});
    }

    function toggleDetails () {
        dispatch({type: "TOGGLE_HAS_DETAILS"});
    }

    if (error) return <p>{error.message}</p>

    if (isLoading) return <p><CgSpinner/></p>

    return (
        <Fragment>
            <div>
                <select value={group} onChange={changeGroup}>
                    {groups.map(g => <option value={g} key={g}>{g}</option>)}
                </select>
                <ul className="bookables items-list-nav">
                    {bookablesInGroup.map((b, i) => (
                        <li key={b.id} className={i === bookableIndex ? "selected" : null}>
                            <button className="btn" onClick={() => changeBookable(i)}>{b.title}</button>
                        </li>
                    ))}
                </ul>
                <p>
                    <button className="btn" onClick={nextBookable} autoFocus>
                        <FaArrowRight/>
                        <span>Next</span>
                    </button>
                </p>
            </div>

            {bookable && (
                <div className="bookable-details">
                    <div className="item">
                        <div className="item-header">
                            <h2>{bookable.title}</h2>
                            <span className="controls">
                                <label>
                                    <input type="checkbox" checked={hasDetails} onChange={toggleDetails}/>
                                    Show Details
                                </label>
                                <button className="btn" onClick={stopPresentation}>
                                    Stop
                                </button>
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
                </div>
            )}
        </Fragment>
    )
}