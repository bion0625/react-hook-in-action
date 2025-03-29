import { Route, Routes } from "react-router-dom";
import BookablesView from "./BookablesView";
import BookableEdit from "./BookableEdit";
import BookableNew from "./BookableNew";

export default function BookablesPage () {
    return (
        <Routes>
            <Route path="/:id" element={<BookablesView/>}></Route>
            <Route path="/" element={<BookablesView/>}></Route>
            <Route path="/:id/edit" element={<BookableEdit/>}></Route>
            <Route path="/new" element={<BookableNew/>}></Route>
        </Routes>
    )
}