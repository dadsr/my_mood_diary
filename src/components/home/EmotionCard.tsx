import "./css/EmotionCard.css"
import {JSX} from "react";

interface emotionProps {
    name: string;
    intensity: number;
}

/**
 * EmotionCard Component
 *
 * Displays a single emotion with its name and a visual intensity bar.
 * The bar color/appearance is determined by the intensity level (low, medium, high).
 *
 * @param {Object} props - Component props.
 * @param {string} props.name - The display name of the emotion.
 * @param {number} props.intensity - The intensity value (1-100) of the emotion.
 *
 * @returns {JSX.Element} The rendered emotion card.
 *
 * @example
 * <EmotionCard name="שמחה" intensity={75} />
 */
export function EmotionCard(props: emotionProps): JSX.Element {

    // Determine intensity level for styling
    let level:string ='high';
    if(props.intensity<45)
        level = 'low';
    else if(props.intensity >= 45 && props.intensity< 65)
        level = 'medium';


    return (
        <div className="emotion-card">
                <label className="emotion-name" > {props.name} - </label>
            <div  className="intensity-bar"
                  data-intensity={level}
                  style={{width: `${(props.intensity === 100? props.intensity-10 :
                          (props.intensity <5? props.intensity+10 :
                              props.intensity ) )}%`,}}>
                <span className="intensity-value">{props.intensity}%</span>
            </div>

        </div>
    );
}
