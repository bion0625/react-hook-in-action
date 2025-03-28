import { Route, Routes } from "react-router-dom";
import BookablesView from "./BookablesView";

export default function BookablesPage () {
    return (
        <Routes>
            <Route path="/:id" element={<BookablesView/>}></Route>
            <Route path="/" element={<BookablesView/>}></Route>
        </Routes>
    )
}