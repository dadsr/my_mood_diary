import "./CaseCard.css";
import {Case} from "../../models/Case.ts";
import {useNavigate} from "react-router-dom";

import casesService from "../../sevices/CasesServices.ts";
import * as React from "react";
import { ReducerAction } from "../../contexts/Reducer";


interface caseProps {
    case: Case;
    dispatch: React.Dispatch<ReducerAction>;
    setCases: React.Dispatch<React.SetStateAction<Case[]>>;
}

export function CaseCard(props: caseProps): JSX.Element {
    const navigate = useNavigate();


    const editCase = () => {
        navigate(`/editCase/${props.case.id}`, {
            state: {
                myCase: props.case,
                mode: 'edit'
            }
        });
    }

    const deleteCase = async () => {
        casesService.deleteCase(props.case.id!);
        props.setCases(casesService.getCases());
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