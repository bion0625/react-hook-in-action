import data from "../../static.json"

export default function BookablesList () {

    const group = "Rooms";

    const bookablesInGroup = data.bookables.filter(b => b.group === group);

    let bookableIndex = 1;

    const changeBookable = (selectedIndex) => {
        bookableIndex = selectedIndex;
        console.log(selectedIndex);
    }

    return (
        <ul className="bookables items-list-nav">
            {bookablesInGroup.map((b, i) => (
                <li key={b.id} className={i === bookableIndex ? "selected" : null}>
                    <button className="btn" onClick={() => changeBookable(i)}>{b.title}</button>
                </li>
            ))}
        </ul>
    )
}