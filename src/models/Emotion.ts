// Emotion.ts
import {EmotionKey, EmotionsConst} from "./EmotionsConst.ts";

export class Emotion {
    private _emotion: EmotionKey | null;
    private _intensity: number;

    constructor(emotionType: EmotionKey | null = null, intensity: number = 0) {
        this._emotion = emotionType;
        this._intensity = intensity;
    }

    toJSON() {
        return {
            _emotion: this._emotion,
            _intensity: this._intensity
        };
    }

    get getEmotion(): EmotionKey | null {
        return this._emotion;
    }

    set setEmotion(emotionType: EmotionKey | null) {
        this._emotion = emotionType;
    }
    get getIntensity(): number {
        return this._intensity;
    }

    set setIntensity(intensity: number) {
        this._intensity = intensity;
    }

    get displayName(): string {
        if (!this._emotion) return 'Unknown Emotion';
        return EmotionsConst[this._emotion]?.displayName || this._emotion;
    }

}
