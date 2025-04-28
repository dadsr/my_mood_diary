import {Case} from "../models/Case.ts";
import {Emotion} from "../models/Emotion.ts";
import {SerializedCase, SerializedEmotion} from "../models/Types.ts";

/**
 * CasesService
 *
 * Provides methods for managing Case instances in localStorage,
 * including create, read, update, and delete (CRUD) operations.
 *
 * @class
 *
 * @example
 * const casesService = new CasesService();
 * const cases = casesService.getCases();
 * casesService.addCase(newCase);
 * casesService.updateCase(updatedCase);
 * casesService.deleteCase(caseId);
 */
export class CasesService {

    /**
     * Retrieves all stored cases from localStorage.
     *
     * - Parses the "cases" item from localStorage.
     * - Converts each serialized case object into a Case instance, including nested Emotion objects.
     * - Returns an array of Case instances, or an empty array if no cases are stored.
     *
     * @returns {Case[]} Array of Case instances loaded from localStorage.
     */
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

    /**
     * Adds a new case to localStorage.
     *
     * - Generates a new unique ID for the case
     * - Serializes the Case object (including nested Emotion instances)
     * - Updates localStorage with the new case added to existing cases
     *
     * @param {Case} newCase - The Case instance to be added
     *
     * @example
     * const newCase = new Case();
     * newCase.caseName = "Job Interview";
     * casesService.addCase(newCase);
     */
    addCase(newCase:Case):void {
        const storedCases = this.getCases();
        console.log("storedCases:",storedCases);
        if(storedCases.length >0){
            // Generate new ID (max existing ID + 1)
            newCase.id = Math.max(...storedCases.map(c => c.id || 0)) + 1;
        }
        else
            newCase.id = 1;
        // Serialize for storage
        const serializedCase = {
            ...newCase,
            emotions: newCase.emotions.map(e => ({
                _emotion: e.getEmotion,
                _intensity: e.getIntensity
            })),
            caseDate: newCase.caseDate.toISOString()
        };
        // Update localStorage
        localStorage.setItem("cases", JSON.stringify([...storedCases, serializedCase]));
    }

    /**
     * Updates an existing case in localStorage.
     *
     * - Finds the case by ID in stored cases
     * - Serializes the updated case (including Emotion objects and Date)
     * - Updates localStorage with modified cases array
     * - Does nothing if case ID isn't found
     *
     * @param {Case} updatedCase - The modified Case instance to save
     *
     * @example
     * const existingCase = casesService.getCases()[0];
     * existingCase.caseName = "Updated Name";
     * casesService.updateCase(existingCase);
     */
    updateCase(updatedCase:Case):void {
        const storedCases = this.getCases();
        console.log("updatedCase:",updatedCase);
        console.log("index values:", storedCases);
        const index = storedCases.findIndex(caseItem => caseItem.id === updatedCase.id);
        console.log("index values:", index);
        if (index !== -1) {
            // Serialize for storage
            const serializedCase: SerializedCase = {
                ...updatedCase,
                emotions: updatedCase.emotions.map(e => ({
                    _emotion: e.getEmotion,
                    _intensity: e.getIntensity
                })),
                caseDate: updatedCase.caseDate.toISOString()
            };
            // Update cases array
            const updatedCases  = [...storedCases];
            updatedCases[index] = this.parseSerializedCase(serializedCase);
            console.log("updatedCases index values:", index ,updatedCases[index]);
            console.log("stringify:", JSON.stringify(updatedCases.map(c => this.serializeCase(c))));

            // Save to localStorage
            localStorage.setItem("cases", JSON.stringify(updatedCases.map(c => this.serializeCase(c))));
        }
    }

    /**
     * Deletes a case by ID from localStorage.
     *
     * - Retrieves all stored cases.
     * - Filters out the case with the specified ID.
     * - Updates localStorage with the new cases array.
     * - Returns the updated cases array.
     *
     * @param {number} caseId - The ID of the case to delete.
     * @returns {Case[]} The updated array of Case instances.
     *
     * @example
     * casesService.deleteCase(5);
     */
    deleteCase(caseId:number):Case[] {
        const storedCases = this.getCases();
        const newCases = storedCases.filter(caseItem => caseItem.id !== caseId);
        localStorage.setItem("cases", JSON.stringify(newCases));
        return newCases;
    }

    /**
     * Serializes a Case instance into a plain object suitable for storage.
     *
     * - Converts the Date object to an ISO string.
     * - Converts each Emotion object to a plain object with _emotion and _intensity.
     *
     * @param {Case} caseInstance - The Case instance to serialize.
     * @returns {SerializedCase} The serialized case object.
     *
     * @example
     * const serialized = this.serializeCase(caseInstance);
     */
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

    /**
     * Converts a serialized case object back into a Case instance.
     *
     * - Rehydrates Date from ISO string
     * - Converts plain emotion objects into Emotion instances
     * - Maintains all other case properties
     *
     * @param {SerializedCase} serialized - The serialized case data from storage
     * @returns {Case} A fully reconstructed Case instance
     * @private
     *
     * @example
     * const serialized = JSON.parse(localStorage.getItem("cases")[0]);
     * const caseInstance = this.parseSerializedCase(serialized);
     */
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
