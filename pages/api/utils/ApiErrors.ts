/**
 * Helper class for holding error messages that can be returned by the API in case of an error.
 */
export default class ApiErrors {
    public static TYPE_ERROR = (attribute: string, type: string) =>
        `Attribute ${attribute} must be of type string, but it is ${type}.`;

    public static MISSING_ATTRIBUTE = (attribute: string) => `Missing attribute: ${attribute}`;
}