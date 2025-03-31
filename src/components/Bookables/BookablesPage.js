import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const BookablesView = lazy(() => import("./BookablesView"));
const BookableEdit = lazy(() => import("./BookableEdit"));
const BookableNew = lazy(() => import("./BookableNew"));

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