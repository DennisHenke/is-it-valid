import type { NextApiRequest, NextApiResponse } from 'next'
import { SerializedValidationRuleSet } from '../../../../validation-module/validationRuleSet';
import validationRuleSetService from '../../../../validation-module/validationRuleSetService';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ result: Boolean }>
) {
  const { name, input } = req.query;
  const validationRuleSet = validationRuleSetService.getByName(name!.toString());
  if (!!validationRuleSet) {
    res.status(200).json({
      result: validationRuleSet.validate(input!.toString());
    });
  } else {
    res.status(404);
  }
}
