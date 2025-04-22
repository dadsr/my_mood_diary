import "./EmotionsSelector.css"
import {EmotionKey, EmotionsConst} from "../../models/EmotionsConst.ts";
import {Control, Controller} from "react-hook-form";
import {Emotion} from "../../models/Emotion.ts";
import Select from "react-select";
import {CaseFormValues, EmotionOption} from "../../models/Types.ts";

interface EmotionsSelectorProps {
    control: Control<CaseFormValues>;
    name: "emotions";
}

export function EmotionsSelector({ control, name }: EmotionsSelectorProps): JSX.Element {
    // Create options for the Select component
    const emotionOptions: EmotionOption[] = Object.entries(EmotionsConst).map(([key, emotion]) => ({
        value: key as EmotionKey,
        label: emotion.displayName,
        intensity: 50
    }));

    return (
        <div className="edit-emotions-container">
            <Controller
                name={name}
                control={control}
                render={({ field }) => {
                    // Map emotions to the format React Select expects
                    const selectValue: EmotionOption[] = Array.isArray(field.value) ?
                        field.value
                            .filter((emotion: Emotion) => emotion.getEmotion !== null && emotion.getEmotion !== undefined)
                            .map((emotion: Emotion) => (
                            {
                                value: emotion.getEmotion as EmotionKey,
                                label: EmotionsConst[emotion.getEmotion as EmotionKey].displayName,
                                intensity: emotion.getIntensity
                            }
                        )) : [];

                    return (

                        <div className="emotions-selector-container">
                            {/* Emotions dropdown */}
                            <div className="edit-emotions-top-container">
                                <label>רגשות:</label>
                                <Select
                                    classNamePrefix="emotion-select"
                                    unstyled
                                    isMulti
                                    options={emotionOptions}
                                    value={selectValue}
                                    onChange={(selectedOptions: readonly EmotionOption[]) => {
                                        const emotions = selectedOptions.map(option =>
                                            new Emotion(option.value, option.intensity)
                                        );
                                        field.onChange(emotions);
                                    }}
                                />
                            </div>
                            <div className="intensity-sliders-bottom-container">
                                {selectValue.map((option:EmotionOption) => (
                                        <div key={option.value} className="intensity-control">
                                            <label>{option.label}</label>
                                            <input
                                                className="intensity-slider"
                                                type="range"
                                                min="1"
                                                max="100"
                                                value={option.intensity}
                                                onChange={(e) => {
                                                    const updated = field.value.map(emotion =>
                                                        emotion.getEmotion === option.value
                                                            ? new Emotion(option.value, parseInt(e.target.value))
                                                            : emotion
                                                    );
                                                    field.onChange(updated);
                                                }}
                                            />
                                            <span>{option.intensity}%</span>
                                        </div>
                                    )
                                )
                                }
                            </div>
                        </div>
                    );
                }}
            />
        </div>
    )
}

