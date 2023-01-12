import fs from 'fs/promises';
import * as path from 'path';
import ValidationRuleSet, { SerializedValidationRuleSet } from './validationRuleSet';

class ValidationRuleSetService {

    private validationRuleSets: ValidationRuleSet[] = [];
    private pathToDataFile: string;

    constructor() {
        this.pathToDataFile = path.resolve(process.cwd(), process.env.PATH_TO_DATA_FILE!);
        this.loadData();
    }

    private async loadData() {
        try {
            const dataFileContent = await fs.readFile(this.pathToDataFile);
            const serializedValidationRuleSets = JSON.parse(dataFileContent.toString('utf-8'));
            this.validationRuleSets = serializedValidationRuleSets.map((serializedValidationRuleSet: SerializedValidationRuleSet) => {
                return ValidationRuleSet.deserialize(serializedValidationRuleSet);
            });
        } catch (error) {
            console.error(error);
        }
    }

    private async storeData() {
        try {
            await fs.writeFile(this.pathToDataFile, JSON.stringify(
                this.validationRuleSets.map(validationRuleSet => validationRuleSet.serialize())
            ), 'utf-8');
        } catch (error) {
            console.error(error);
        }
    }

    public async create() {
        // TODO
    }

    public async delete(name: string): Promise<Boolean> {
        const indexOfToBeDeletedItem = this.validationRuleSets.findIndex(validationRuleSet => validationRuleSet.name === name);
        if (indexOfToBeDeletedItem !== -1) {
            this.validationRuleSets.splice(indexOfToBeDeletedItem, 1);
            await this.storeData();
            return true;
        }

        return false;
    }

    public async update(name: string) {
        this.validationRuleSets.find(validationRuleSet => validationRuleSet.name === name);
        // TODO
    }

    public getAll() {
        return this.validationRuleSets;
    }

    public getByName(name: string): ValidationRuleSet | undefined {
        return this.validationRuleSets.find(validationRuleSet => validationRuleSet.name === name);
    }

}

export default new ValidationRuleSetService();