import { Fragment, useState } from "react";
import data from "../../static.json"
import { FaArrowRight } from "react-icons/fa";

export default function BookablesList () {

    const { bookables, days, sessions } = data;

    const groups = [...new Set(bookables.map(b => b.group))];
    const [group, setGroup] = useState(groups[1]);
    const bookablesInGroup = bookables.filter(b => b.group === group);
    const [bookableIndex, setBookableIndex] = useState(1);

    const bookable = bookablesInGroup[bookableIndex];

    const [hasDetail, setHasDetail] = useState(false);

    function nextBookable () {
        setBookableIndex(i => (i + 1) % bookablesInGroup.length)
    }

    return (
        <Fragment>
            <div>
                <select value={group} onChange={e => setGroup(e.target.value)}>
                    {groups.map(g => <option value={g} key={g}>{g}</option>)}
                </select>
                <ul className="bookables items-list-nav">
                    {bookablesInGroup.map((b, i) => (
                        <li key={b.id} className={i === bookableIndex ? "selected" : null}>
                            <button className="btn" onClick={() => setBookableIndex(i)}>{b.title}</button>
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
                                    <input type="checkbox" checked={hasDetail} onChange={() => setHasDetail(has => !has)}/>
                                    Show Details
                                </label>
                            </span>
                        </div>

                        <p>{bookable.notes}</p>

                        {hasDetail && (
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