import "./Header.css"
import {JSX} from "react";

/**
 * Header Component
 *
 * Renders the main application header with the title "יומן מצב רוח".
 *
 * @returns {JSX.Element} The rendered header.
 *
 * @example
 * <Header />
 */
export function Header(): JSX.Element {

    return (
        <div className = "header">
            <h1 className = "header-title">יומן מצב רוח</h1>
        </div>
    );
}
