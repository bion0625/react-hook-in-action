const getData = (url) => {
    return fetch(url)
    .then(res => {
        if (!res.ok) throw new Error(`There was a problem fetching data.`);
        return res.json()
    });
};

export default getData;

export const createItem = (url, item) => {
    return fetch(
        url,
        {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(item)
        }
    ).then(r => {
        if (!r.ok) throw new Error("There was a problem creating the item!");
        return r.json();
    })
};

export const editItem = (url, item) => {
    return fetch(
        url,
        {
            method: "PUT",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(item)
        }
    ).then(r => {
        if (!r.ok) throw new Error("There was a problem updating the item!");
        return r.json();
    })
};

export const deleteItem = (url) => {
    return fetch(
        url,
        {
            method: "DELETE",
            headers: {"Content-Type":"application/json"}
        }
    ).then(r => {
        if (!r.ok) throw new Error("There was a problem deleting the item!");
        return r.json();
    })
};