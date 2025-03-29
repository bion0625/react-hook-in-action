import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import getData from "../../util/api";
import useFormState from "./useFormState";
import { FaSpinner } from "react-icons/fa";
import BookableForm from "./BookableForm";

const BookableEdit = () => {
    const {id} = useParams();
    const queryClient = useQueryClient();

    const {data, isLoading} = useQuery({
        queryKey: ["bookables", id],
        queryFn: () => getData(`http://localhost:3001/bookables/${id}`),
        initialData: queryClient.getQueryData("bookables")?.find(b => b.id == id),
    });

    const formState = useFormState(data);

    const handleDelete = () => {};
    const handleSubmit = () => {};

    if (isLoading) return <FaSpinner/>;

    return (
        <BookableForm formState={formState} handleSubmit={handleSubmit} handleDelete={handleDelete}/>
    )
};

export default BookableEdit;