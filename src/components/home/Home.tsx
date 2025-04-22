import "./Home.css"
import {JSX, useEffect, useReducer, useState} from "react";
import {Case} from "../../models/Case.ts";
import {useNavigate} from "react-router-dom";
import {CaseCard} from "./CaseCard.tsx";
import casesService from "../../sevices/CasesServices.ts";
import {CasePreview} from "./preview/CasePreview.tsx";
import {Reducer, reducerState} from "../../contexts/Reducer.ts";



export function Home(): JSX.Element {
    const navigate = useNavigate();
    const [cases, setCases] = useState<Case[]>([]);
    const [state, dispatch] = useReducer(Reducer, reducerState);


    useEffect(() => {
        const storedCases:Case[] = casesService.getCases();
        if (storedCases.length > 0) {
            setCases(storedCases);
            dispatch({ type: 'SET_CASES', payload: storedCases });
        }
    }, []);

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
                <div className="cases-flex">
                    {cases.length > 0 &&
                        cases.map(caseItem => (
                            <CaseCard
                                case={caseItem}
                                dispatch={dispatch}
                                setCases={setCases}
                            />
                        ))
                    }
                </div>
                <div className="home-preview-case">
                    {state.preview ? <CasePreview case = {state.preview}/> :
                        <h1 className="preview-choose">בחר אירוע לצפייה</h1> }
                </div>
            </div>
        </div>
    );
}
