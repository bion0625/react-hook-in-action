import { useEffect, useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import getData from "../../util/api";
import { CgSpinner } from "react-icons/cg";

export default function BookablesList ({state, dispatch}) {

    const {group, bookableIndex, bookables, isLoading, error} = state;
    
    const bookablesInGroup = bookables.filter(b => b.group === group);
    const groups = [...new Set(bookables.map(b => b.group))];

    const nextButtonRef = useRef();

    useEffect(() => {
        dispatch({tpe: "FETCH_BOOKABLES_REQUEST"});
        getData("http://localhost:3001/bookables")
        .then(data => dispatch({type: "FETCH_BOOKABLES_SUCCESS", payload: data}))
        .catch(error => dispatch({type: "FETCH_BOOKABLES_ERROR", payload: error}));
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
        nextButtonRef.current.focus();
    };

    function nextBookable () {
        dispatch({type: "NEXT_BOOKABLE"});
    }

    if (error) return <p>{error.message}</p>

    if (isLoading) return <p><CgSpinner/></p>

    return (
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
                <button className="btn" onClick={nextBookable} autoFocus ref={nextButtonRef}>
                    <FaArrowRight/>
                    <span>Next</span>
                </button>
            </p>
        </div>
    )
}