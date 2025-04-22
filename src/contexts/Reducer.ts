import {Case} from "../models/Case.ts";

export interface ReducerState {
    cases: Case[];
    preview: Case | null;
}
export type ReducerAction =
    | { type: 'SET_CASES'; payload: Case[] }
    | { type: 'SET_PREVIEW'; payload: Case | null }
    | { type: 'CLEAR_PREVIEW' };

export const reducerState: ReducerState = {
    cases: [],
    preview: null,
};

export function Reducer(state: ReducerState, action: ReducerAction): ReducerState {
    switch (action.type) {
        case 'SET_CASES':
            return { ...state, cases: action.payload };
        case 'SET_PREVIEW':
            return { ...state, preview: action.payload };
        case 'CLEAR_PREVIEW':
            return { ...state, preview: null };
        default:
            return state;
    }

}