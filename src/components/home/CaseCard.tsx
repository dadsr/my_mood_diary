import "./css/CaseCard.css";
import {Case} from "../../models/Case.ts";
import {useNavigate} from "react-router-dom";

import casesService from "../../sevices/CasesServices.ts";
import * as React from "react";
import { ReducerAction } from "../../contexts/Reducer";

interface caseProps {
    case: Case;
    dispatch: React.Dispatch<ReducerAction>;
}

/**
 * CaseCard Component
 *
 * Displays a summary card for a single case, with options to preview, edit, or delete the case.
 *
 * @param {Object} props - The component props.
 * @param {Case} props.case - The case object to display.
 * @param {React.Dispatch<ReducerAction>} props.dispatch - Dispatch function for state management actions.
 *
 * @returns {JSX.Element} The rendered case card.
 *
 * @example
 * <CaseCard case={myCase} dispatch={dispatch} />
 */
export function CaseCard(props: caseProps): JSX.Element {
    const navigate = useNavigate();

    /**
     * Navigates to the edit case page with the current case data.
     */
    const editCase = () => {
        navigate(`/editCase/${props.case.id}`, {
            state: {
                myCase: props.case,
                mode: 'edit'
            }
        });
    }

    /**
     * Deletes the current case and clears the preview.
     */
    const deleteCase = async () => {
        props.dispatch({ type: 'SET_CASES', payload: casesService.deleteCase(props.case.id!)});
        props.dispatch({ type: 'CLEAR_PREVIEW' });
    };

    return (
        <div className="case-card" onClick={() => props.dispatch({ type: 'SET_PREVIEW', payload: props.case })}>
            <div className="case-info">

                <label>אירוע: </label>
                <div className="case-name-container">
                    <h2>{props.case.caseName} </h2>
                    <p className="case-id">({props.case.id})</p>
                </div>
                <label>תאריך: </label>
                <p>{props.case.caseDate.toLocaleDateString('en-GB')}</p>

                <label> מחשבה: </label>
                <p>{props.case.thought}</p>
            </div>

            <button className="button-card" onClick={editCase}>edit</button>
            <button className="button-card" onClick={deleteCase}>delete</button>

        </div>
    );
}
