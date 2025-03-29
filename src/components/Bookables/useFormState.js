import { useEffect, useState } from "react";

const useFormState = (data) => {

    const [state, setState] = useState(data);

    useEffect(() => {
        if (data) setState(data);
    }, [data]);

    const handleChange = (e) => setState({
        ...state,
        [e.target.name]: e.target.value
    });

    const handleChecked = (e) => {
        const {name, value, checked} = e.target;
        const values = new Set(state[name]);
        const intValue = parseInt(value, 10);

        values.delete(intValue);
        if (checked) values.add(intValue);

        setState({
            ...state,
            [name]: [...values]
        });
    };

    return {
        state,
        handleChange,
        handleChecked
    }
};

export default useFormState;