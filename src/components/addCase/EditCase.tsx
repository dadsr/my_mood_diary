import "./css/EditCase.css"
import {Controller, useForm} from "react-hook-form";
import {JSX, useEffect, useState} from "react";
import {Case} from "../../models/Case.ts";
import {useLocation, useNavigate} from "react-router-dom";
import casesService from "../../sevices/CasesServices.ts";
import {Emotion} from "../../models/Emotion.ts";
import {CaseFormValues} from "../../models/Types.ts";
import {EmotionsSelector} from "./EmotionsSelector.tsx";
import {EmotionKey} from "../../models/EmotionsConst.ts";

interface LocationState {
    state: {
        myCase: Case | null;
        mode: 'add' | 'edit';
    }
}


export function EditCase(): JSX.Element {
    const navigate = useNavigate();
    const location = useLocation() as LocationState;
    const {myCase, mode} = location.state;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {control, handleSubmit, setValue, watch,
        formState: {errors}} = useForm<CaseFormValues>({
            defaultValues: {
                id: 0,
                caseName: '',
                caseDate: new Date(),
                thought: '',
                emotions: [] as Emotion[],
                behavior: '',
                symptoms: ''
        }
    });


    useEffect(() => {
        console.log("myCase:", myCase);
        if (myCase) {
            setValue('id', myCase.id!);
            setValue('caseName', myCase.caseName!);
            setValue('caseDate', myCase.caseDate!);
            setValue('thought', myCase.thought!);
            setValue('emotions', myCase.emotions!.map(item =>
                item instanceof Emotion
                    ? item
                    : new Emotion(
                        (item as {_emotion: EmotionKey})._emotion,
                        (item as {_intensity: number})._intensity
                    )
            ));
            setValue('behavior', myCase.behavior!);
            setValue('symptoms', myCase.symptoms!);
        }
        console.log("form value:", watch());
    }, [myCase, setValue]);


    const onSubmit = async (data: CaseFormValues) => {
        console.log("onSubmit form values:", watch());
        console.log("onSubmit form values:", watch());
        setIsSubmitting(true);
        const caseToSave = new Case();
        caseToSave.id = data.id;
        caseToSave.caseName = data.caseName;
        caseToSave.caseDate = data.caseDate;
        caseToSave.thought = data.thought;
        caseToSave.emotions = data.emotions.map(e =>
            new Emotion(e.getEmotion, e.getIntensity)
        );
        caseToSave.behavior = data.behavior;
        caseToSave.symptoms = data.symptoms;
        console.log("mode form values:", mode);

        if(mode === 'add') {
            console.log("mode add", );
            casesService.addCase(caseToSave);
        } else {
            console.log("mode edit :",caseToSave);
            casesService.updateCase(caseToSave);
        }
        navigate('/');
        setIsSubmitting(false);
    };


    return (
        <div className="edit-container">
            <h2>{mode === 'add' ? 'צור אירוע חדש' : 'ערוך אירוע'}</h2>
            <div className="edit-title">
                { watch('id') > 0 && <div>ID: {watch('id')}</div> }
            </div>

            <form className="edit-form" onSubmit={handleSubmit(onSubmit)}>

                <div className="edit-form-group">
                    <label>אירוע:</label>
                    <Controller
                        name="caseName"
                        control={control}
                        rules={{ required: "שם האירוע הוא שדה חובה" }}
                        render={({ field }) => (
                            <>
                                <input className="edit-input-case-name" {...field} />
                                {errors.caseName && <span className="error">
                                    {errors.caseName.message}
                                </span>}
                            </>
                        )}
                    />
                </div>

                <div className="edit-form-group">
                    <label>תאריך:</label>
                    <Controller
                        name="caseDate"
                        control={control}
                        render={({ field }) => (
                            <input
                                type="date"
                                onChange={(e) => field.onChange(new Date(e.target.value))}
                                value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : ''}
                            />
                        )}
                    />
                </div>

                <div className="edit-form-group">
                    <label>מחשבה:</label>
                    <Controller
                        name="thought"
                        control={control}
                        render={({ field }) =>
                            <textarea {...field} />}
                    />
                </div>

                <EmotionsSelector  control = {control} name = "emotions" />

                <div className="edit-form-group">
                    <label>התנהגות:</label>
                    <Controller
                        name="behavior"
                        control={control}
                        render={({ field }) => <textarea {...field} />}
                    />
                </div>

                <div className="edit-form-group">
                    <label>סימפטומים:</label>
                    <Controller
                        name="symptoms"
                        control={control}
                        render={({ field }) => <textarea {...field} />}
                    />
                </div>

                <button className="submit-button" type="submit" disabled={isSubmitting}>Submit</button>
            </form>
        </div>

    );
}
