import {Emotion} from "./Emotion.ts";
import {EmotionKey} from "./EmotionsConst.ts";


export interface SerializedEmotion {
    _emotion: EmotionKey | null;
    _intensity: number;
}

export interface SerializedCase {
    id: number;
    caseDate: string;
    caseName: string | null;
    thought: string | null;
    emotions: SerializedEmotion[];
    behavior: string | null;
    symptoms: string | null;
}

export type CaseFormValues = {
    id: number;
    caseName: string;
    caseDate: Date;
    thought: string;
    emotions: Emotion[];
    behavior: string;
    symptoms: string;
};

export interface EmotionOption {
    value: EmotionKey;
    label: string;
    intensity: number;
}

export function isEmotionOption(item: unknown): item is EmotionOption {
    return typeof item === 'object' &&
        item !== null &&
        'value' in item &&
        'intensity' in item;
}