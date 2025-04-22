import {Case} from "../models/Case.ts";
import {Emotion} from "../models/Emotion.ts";
import {SerializedCase, SerializedEmotion} from "../models/Types.ts";

export class CasesService {

    getCases():Case[] {
        const storedCases = localStorage.getItem("cases");
        if (storedCases) {
            const parsed = JSON.parse(storedCases) as SerializedCase[];
            return parsed.map(caseItem => {
                const caseInstance = new Case();
                caseInstance.id = caseItem.id;
                caseInstance.caseName = caseItem.caseName;
                caseInstance.caseDate = new Date(caseItem.caseDate);
                caseInstance.thought = caseItem.thought;

                caseInstance.emotions = caseItem.emotions?.map((e: SerializedEmotion) =>
                    new Emotion(e._emotion, e._intensity)) || [];

                caseInstance.behavior = caseItem.behavior;
                caseInstance.symptoms = caseItem.symptoms;
                return caseInstance;
            });
        }
        return [];
    }


    addCase(newCase:Case):void {
        const storedCases = this.getCases();
        newCase.id = storedCases.length + 1;
        const serializedCase = {
            ...newCase,
            emotions: newCase.emotions.map(e => ({
                _emotion: e.getEmotion,
                _intensity: e.getIntensity
            })),
            caseDate: newCase.caseDate.toISOString()
        };
        localStorage.setItem("cases", JSON.stringify([...storedCases, serializedCase]));
    }


    updateCase(updatedCase:Case):void {
        const storedCases = this.getCases();
        console.log("updatedCase:",updatedCase);
        console.log("index values:", storedCases);
        const index = storedCases.findIndex(caseItem => caseItem.id === updatedCase.id);
        console.log("index values:", index);
        if (index !== -1) {
            const serializedCase: SerializedCase = {
                ...updatedCase,
                emotions: updatedCase.emotions.map(e => ({
                    _emotion: e.getEmotion,
                    _intensity: e.getIntensity
                })),
                caseDate: updatedCase.caseDate.toISOString()
                };
            const updatedCases  = [...storedCases];
            updatedCases[index] = this.parseSerializedCase(serializedCase);
            console.log("updatedCases index values:", index ,updatedCases[index]);
            console.log("stringify:", JSON.stringify(updatedCases.map(c => this.serializeCase(c))));


            localStorage.setItem("cases", JSON.stringify(updatedCases.map(c => this.serializeCase(c))));
        }
    }
    deleteCase(caseId:number):void {
        const storedCases = this.getCases();
        const index = storedCases.findIndex(caseItem => caseItem.id === caseId);
        storedCases.splice(index,1);
        localStorage.setItem("cases", JSON.stringify(storedCases));
    }

    private serializeCase(caseInstance: Case): SerializedCase {
        return {
            ...caseInstance,
            caseDate: caseInstance.caseDate.toISOString(),
            emotions: caseInstance.emotions.map(e => ({
                _emotion: e.getEmotion,
                _intensity: e.getIntensity
            }))
        };
    }

    private parseSerializedCase(serialized: SerializedCase): Case {
        const caseInstance = new Case();
        caseInstance.id = serialized.id;
        caseInstance.caseDate = new Date(serialized.caseDate);
        caseInstance.caseName = serialized.caseName;
        caseInstance.thought = serialized.thought;
        caseInstance.emotions = serialized.emotions.map(e =>
            new Emotion(e._emotion, e._intensity)
        );
        caseInstance.behavior = serialized.behavior;
        caseInstance.symptoms = serialized.symptoms;
        return caseInstance;
    }
}
const casesService = new CasesService();
export default casesService;