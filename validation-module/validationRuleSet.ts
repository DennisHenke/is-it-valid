import { stringify } from "querystring";

export type SerializedValidationRuleSet = {
    name: string;
    minLength: number | undefined;
    characterTypesRequired: CharacterTypes[] | undefined;
};

export enum CharacterTypes {
    numbers = 'numbers',
    letters = 'letters',
    uppercaseLetters = 'uppercaseLetters',
    lowercaseLetters = 'lowercaseLetters',
    specialCharacters = 'specialCharacters'
};

export type ValidationResult = {
    minLength?: {
        isValid: Boolean;
    };
    characterTypes?: {
        [key in CharacterTypes]?: {
            isValid: Boolean;
        };
    };
};

const characterTypesRegExp = {
    [CharacterTypes.numbers]: /[0-9]/,
    [CharacterTypes.letters]: /[A-Z]/i,
    [CharacterTypes.uppercaseLetters]: /[A-Z]/,
    [CharacterTypes.lowercaseLetters]: /[a-z]/,
    [CharacterTypes.specialCharacters]: /[^A-Za-z0-9]/,
};

export default class ValidationRuleSet {

    public name: string;
    public minLength: number | undefined;
    public characterTypesRequired: CharacterTypes[] | undefined;

    constructor(name: string, minLength?: number, characterTypesRequired?: CharacterTypes[]) {
        this.name = name;
        this.minLength = minLength;
        this.characterTypesRequired = characterTypesRequired;
    }

    public validate(input: string): ValidationResult {
        const validationResult: ValidationResult = {};

        if (!!this.minLength) {
            validationResult.minLength = { isValid: input.length >= this.minLength };
        }

        if (!!this.characterTypesRequired) {
            validationResult.characterTypes = {};
            this.characterTypesRequired.forEach(characterType => {
                validationResult.characterTypes![characterType] = {
                    isValid: input.match(characterTypesRegExp[characterType]) !== null
                }
            });
        }

        return validationResult;
    }

    static deserialize(object: SerializedValidationRuleSet): ValidationRuleSet {
        return new ValidationRuleSet(object.name, object.minLength, object.characterTypesRequired);
    }

    public serialize(): SerializedValidationRuleSet {
        return {
            name: this.name,
            minLength: this.minLength,
            characterTypesRequired: this.characterTypesRequired
        };
    }

}