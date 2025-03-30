import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import getData, { deleteItem, editItem } from "../../util/api";
import useFormState from "./useFormState";
import { FaSpinner } from "react-icons/fa";
import BookableForm from "./BookableForm";

const BookableEdit = () => {
    const {id} = useParams();
    const {data, isLoading} = useBookable(id);
    const formState = useFormState(data);

    const {
        updateBookable,
        isUpdating,
        isUpdateError,
        updateErrorr
    } = useUpdateBookable();

    const {
        deleteBookable,
        isDeleting,
        isDeleteError,
        deleteError
    } = useDeleteBookable();

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete the bookable?")) deleteBookable(formState.state);
    };
    const handleSubmit = () => updateBookable(formState.state);

    if (isUpdateError || isDeleteError) return <p>{updateErrorr?.message || deleteError.message}</p>

    if (isLoading || isUpdating || isDeleting) return <FaSpinner/>;

    return (
        <BookableForm formState={formState} handleSubmit={handleSubmit} handleDelete={handleDelete}/>
    )
};

export default BookableEdit;

const useBookable = (id) => {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: ["bookable", id],
        queryFn: () => getData(`http://localhost:3001/bookables/${id}`),
        refetchOnWindowFocus: false,
        initialData: queryClient.getQueryData("bookables")?.find(b => b.id == id)
    });
}

const updateBookablesCache = (bookable, queryClient) => {
    const bookables = queryClient.getQueryData("bookables") || [];

    const bookableIndex = bookables.findIndex(b => b.id == bookable.id);

    if (bookableIndex != -1) {
        bookables[bookableIndex] = bookable;
        queryClient.setQueryData({
            queryKey: ["bookables"],
            queryFn: () => bookables
        });
    }
};

const useUpdateBookable = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: item => editItem(`http://localhost:3001/bookables/${item.id}`, item),
        onSuccess: bookable => {
            updateBookablesCache(bookable, queryClient);
            queryClient.setQueryData({
                queryKey: ["bookable", String(bookable.id)],
                queryFn: () => bookable
            });
            navigate(`/bookables/${bookable.id}`);
        }
    })
    return {
        updateBookable: mutation.mutate,
        isUpdating: mutation.isLoading,
        isUpdateError: mutation.isError,
        updateError: mutation.error
    };
};

const getIdForFirstInGroup = (bookables, excludedBookable) => {
    const {id, group} = excludedBookable;

    const bookableInGroup = bookables.find(b => b.group == group && b.id != id);

    return bookableInGroup?.id;
};

const useDeleteBookable = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: bookable => deleteItem(`http://localhost:3001/bookables/${bookable.id}`),
        onSuccess: (response, bookable) => {
            const bookables = queryClient.getQueryData("bookables") || [];

            queryClient.setQueryData({
                queryKey: ["bookables"],
                queryFn: () => bookables.filter(b => b.id != bookable.id)
            })

            navigate(`/bookables/${getIdForFirstInGroup(bookables, bookable) || ""}`)
        }
    });

    return {
        deleteBookable: mutation.mutate,
        isDeleting: mutation.isLoading,
        isDeleteError: mutation.isError,
        deleteError: mutation.error
    }
};