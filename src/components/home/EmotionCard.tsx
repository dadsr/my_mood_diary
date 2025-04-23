import "./css/EmotionCard.css"
import {JSX} from "react";

interface emotionProps {
    name: string;
    intensity: number;
}


export function EmotionCard(props: emotionProps): JSX.Element {

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