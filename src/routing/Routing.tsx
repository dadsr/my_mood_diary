import "./Routing.css"
import {JSX} from "react";
import {Route, Routes} from "react-router-dom";
import {Home} from "../components/home/Home.tsx";
import {EditCase} from "../components/addCase/EditCase.tsx";

/**
 * Routing Component
 *
 * Defines the main application routes using React Router.
 * - "/" renders the Home component.
 * - "/editCase/:id" renders the EditCase component for adding or editing a case.
 *
 * @returns {JSX.Element} The routing container with defined routes.
 *
 * @example
 * <Routing />
 */
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
