import { useNavigate } from "react-router-dom";
import BookableForm from "./BookableForm";
import useFormState from "./useFormState";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createItem } from "../../util/api";

const BookableNew = () => {
    const navigate = useNavigate();
    const formState = useFormState();
    const queryClient = useQueryClient();

    const {mutate: createBookable, status, error} = useMutation({
        mutationFn: item => createItem("http://localhost:3001/bookables", item),
            onSuccess: bookable => {
                queryClient.setQueryData({
                    queryKey: ["bookables"],
                    queryFn: old => [...(old || []), bookable]
                });

                navigate(`/bookables/${bookable.id}`)
        }}
    );

    const handleSubmit = () => {
        createBookable(formState.state);
    };

    if (status === "error") return <p>{error.message}</p>;

    if (status === "loading") return <p>Loading!!!</p>;

    return (
        <BookableForm formState={formState} handleSubmit={handleSubmit}/>
    );
};

export default BookableNew;