import { useEffect, useState } from 'react';
import ValidationRuleSet, { CharacterTypes, ValidationResult } from '../../validation-module/validationRuleSet';

const characterTypesText = {
    [CharacterTypes.numbers]: 'eine Zahl',
    [CharacterTypes.letters]: 'ein Buchstabe',
    [CharacterTypes.lowercaseLetters]: 'ein Kleinbuchstabe',
    [CharacterTypes.uppercaseLetters]: 'ein Großbuchstabe',
    [CharacterTypes.specialCharacters]: 'ein Sonderzeichen'
}

export default function PasswordField(props: { validationRuleSetName: string }) {
  const [value, setValue] = useState('');
  const [validationRuleSet, setValidationRuleSet] = useState<ValidationRuleSet>();
  const [validationResult, setValidationResult] = useState<ValidationResult>();

  useEffect(() => {
    if (typeof props.validationRuleSetName === 'string') {
      fetch(`/api/validation-rule-set/${props.validationRuleSetName}`)
        .then(res => res.json())
        .then(obj => setValidationRuleSet(ValidationRuleSet.deserialize(obj)));
    }
  }, [props.validationRuleSetName]);

  useEffect(() => {
    if (!!validationRuleSet) {
      setValidationResult(validationRuleSet.validate(value));
    }
  }, [value])

  return (
    <>
      <input type='text' onChange={(event) => {
        setValue(event.target.value);
      }} />
      <div>
        Regeln:
        <ul>
          {validationRuleSet?.minLength && <li>{ validationResult?.minLength?.isValid ? '✓' : '❌' } Minimale Länge beträgt {validationRuleSet?.minLength}</li>}
          {validationRuleSet?.characterTypesRequired?.map(characterType => {
            return <li>{ validationResult?.characterTypes![characterType]!.isValid ? '✓' : '❌' } Das Passwort muss mindestens {characterTypesText[characterType]} enthalten</li>;
          })}
        </ul>
      </div>
      
    </>
  )
}
