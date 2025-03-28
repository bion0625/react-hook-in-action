const getData = (url) => {
    return fetch(url)
    .then(res => {
        if (!res.ok) throw new Error(`There was a problem fetching data.`);
        return res.json();
    });
};

export default getData;