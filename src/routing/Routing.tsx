import "./Routing.css"
import {JSX} from "react";
import {Route, Routes} from "react-router-dom";
import {Home} from "../components/home/Home.tsx";
import {EditCase} from "../components/addCase/EditCase.tsx";

export function Routing():JSX.Element {
    return (
        <div className="routing-container">
            <Routes >
                <Route path="/" element={<Home />} />
                <Route path="/editCase/:id" element={<EditCase />} />
            </Routes>
        </div>
    )
}