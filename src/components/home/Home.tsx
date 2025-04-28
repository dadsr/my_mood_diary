import "./css/Home.css"
import {JSX, useEffect, useReducer} from "react";
import {Case} from "../../models/Case.ts";
import {useNavigate} from "react-router-dom";
import {CaseCard} from "./CaseCard.tsx";
import casesService from "../../sevices/CasesServices.ts";
import {CasePreview} from "./CasePreview.tsx";
import {Reducer, reducerState} from "../../contexts/Reducer.ts";


/**
 * Home Component
 *
 * Main landing page displaying a list of cases and a preview panel.
 * Allows users to add a new case, view existing cases, and preview details.
 * Integrates with a reducer for state management and loads cases from storage on mount.
 *
 * @returns {JSX.Element} The rendered home page.
 *
 * @example
 * <Home />
 */
export function Home(): JSX.Element {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(Reducer, reducerState);

    // Load stored cases on component mount
    useEffect(() => {
        const storedCases:Case[] = casesService.getCases();
        if (storedCases.length > 0) {
            dispatch({ type: 'SET_CASES', payload: storedCases });
        }
    }, []);

    /**
     * Navigates to the add new case page.
     */
    const addNewCase = () => {
        navigate(`/editCase/${0}`, {
            state: {
                myCase: null,
                mode: 'add'
            }
        });
    }

    return (
        <div className="home">

            <div className="home-cases-flex" >
                <button className="home-case-button" onClick={addNewCase}>Add New Case</button>
                {/* List of Case Cards */}
                <div className="cases-flex">
                    {state.cases.length > 0 &&
                        state.cases.map(caseItem => (
                            <CaseCard
                                case={caseItem}
                                dispatch={dispatch}
                            />
                        ))
                    }
                </div>
                {/* Case Preview Panel */}
                <div className="home-preview-case">
                    {state.preview && state.cases.find(c => c.id === state.preview?.id)
                            ? <CasePreview case={state.preview} /> : <h1 className="preview-choose">בחר אירוע לצפייה</h1>}
                </div>
            </div>
        </div>
    );
}
