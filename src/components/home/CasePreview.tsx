import "./css/CasePreview.css";
import {Case} from "../../models/Case.ts";
import {JSX} from "react";
import {Emotion} from "../../models/Emotion.ts";
import {EmotionCard} from "./EmotionCard.tsx";

interface caseProps {
    case: Case;
}

/**
 * CasePreview Component
 *
 * Displays a detailed, read-only view of a single case, including all case fields and a list of associated emotions.
 *
 * @param {Object} props - The component props.
 * @param {Case} props.case - The case object to preview.
 *
 * @returns {JSX.Element} The rendered case preview.
 *
 * @example
 * <CasePreview case={myCase} />
 */
export function CasePreview(props: caseProps): JSX.Element {

    // Prepare emotion values for display using EmotionCard
    const selectedValues = (props.case.emotions || [])
        .map(data => new Emotion(data.getEmotion, data.getIntensity))
        .map(emotion => ({
            value: emotion.getEmotion,
            label: emotion.displayName,
            intensity: emotion.getIntensity
        }));

    return (
        <div className="case-preview">
            <div className="case-preview-info">
                <label>אירוע: </label>
                <div className="case-preview-name-container">
                    <h3>{props.case.caseName} </h3>
                    <p className="case-preview-id">({props.case.id})</p>
                </div>
                <label>תאריך: </label>
                <p>{props.case.caseDate.toLocaleDateString('en-GB')}</p>
                <label> מחשבה: </label>
                <p>{props.case.thought}</p>
                <label>רגשות: </label>
                <div className="case-preview-emotions-container">
                    {selectedValues.length > 0 && selectedValues.map((emotion, index) => (
                        <EmotionCard  key={index} name={emotion.label} intensity={emotion.intensity} />
                    ))
                    }
                </div>
                <label> התנהגות:  </label>
                <p>{props.case.behavior}</p>
                <label> סימפטומים: </label>
                <p>{props.case.symptoms}</p>
            </div>
        </div>
    );
}
