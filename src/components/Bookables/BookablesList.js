import { useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function BookablesList ({bookable, bookables, getUrl}) {

    const group = bookable?.group;
    const bookablesInGroup = bookables.filter(b => b.group === group);
    const groups = [...new Set(bookables.map(b => b.group))];

    const navigate = useNavigate();

    const nextButtonRef = useRef();

    function changeGroup (e) {
        const bookablesInSelectedGroup = bookables.filter(b => b.group === e.target.value);
        navigate(getUrl(bookablesInSelectedGroup[0].id));
    }

    function nextBookable () {
        const i = bookablesInGroup.indexOf(bookable);
        const nextIndex = (i + 1) % bookablesInGroup.length;
        const nextBookable = bookablesInGroup[nextIndex];
        navigate(getUrl(nextBookable.id));
    }

    return (
        <div>
            <select value={group} onChange={changeGroup}>
                {groups.map(g => <option value={g} key={g}>{g}</option>)}
            </select>
            <ul className="bookables items-list-nav">
                {bookablesInGroup.map(b => (
                    <li key={b.id} className={b.id === bookable.id ? "selected" : null}>
                        <Link to={getUrl(b.id)} className="btn" replace={true}>{b.title}</Link>
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