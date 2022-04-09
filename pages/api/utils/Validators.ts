/**
 * Contains static helper methods used to validate request data.
 * Covers validations that repeat a lot.
 */
export default class Validators {
    /**
     * Check's if input is a string. If not, throws Error.
     * @param input Value to be validated
     * @param errorMessage Error message that will be used when error is thrown
     */
    public static isString(input: any, errorMessage: string): void {
        if (typeof input !== 'string') {
            throw new Error(errorMessage);
        }
    }

    /**
     * Check's if input is a number. If not, throws Error.
     * @param input Value to be validated
     * @param errorMessage Error message that will be used when error is thrown
     */
    public static isNumber(input: any, errorMessage: string): void {
        if (typeof input !== 'number') {
            throw new Error(errorMessage);
        }
    }

    /**
     * Check if input has the attribute
     * @param input Object that should contain the attribute.
     * @param attribute Name of the attribute to check.
     * @param errorMessage Error message that will be used when error is thrown
     */
    public static hasAttribute(input: any, attribute: string, errorMessage: string): void {
        if (input[attribute] === undefined || input[attribute] === null) {
            throw new Error(errorMessage);
        }
    }
}