export type SerializedValidationRuleSet = {
    name: string;
    minLength: number | undefined;
    characterTypesRequired: CharacterTypes[] | undefined;
};

export enum CharacterTypes {
    numbers = 'numbers',
    uppercaseLetters = 'uppercaseLetters',
    lowercaseLetters = 'lowercaseLetters',
    specialCharacters = 'specialCharacters'
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

    public validate(input: string): Boolean {

        return true;
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