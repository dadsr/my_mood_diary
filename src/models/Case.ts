import {Emotion} from "./Emotion.ts";

export class Case {
    id:number;
    caseDate:Date;
    caseName: string | null;
    thought: string | null;
    emotions: Emotion[];
    behavior: string | null;
    symptoms: string | null;


    constructor() {
        this.id = 0;
        this.caseDate = new Date();
        this.caseName = null;
        this.thought = null;
        this.emotions = [];
        this.behavior = null;
        this.symptoms = null;
    }

    toJSON() {
        return {
            id: this.id,
            caseDate: this.caseDate.toISOString(),
            caseName: this.caseName,
            thought: this.thought,
            emotions: this.emotions.map(e => ({
                _emotion: e.getEmotion,
                _intensity: e.getIntensity
            })),
            behavior: this.behavior,
            symptoms: this.symptoms
        };
    }
}