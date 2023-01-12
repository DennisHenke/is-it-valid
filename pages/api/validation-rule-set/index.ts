import type { NextApiRequest, NextApiResponse } from 'next'
import { SerializedValidationRuleSet } from '../../../validation-module/validationRuleSet';
import validationRuleSetService from '../../../validation-module/validationRuleSetService'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SerializedValidationRuleSet[]>
) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const validationRuleSets = validationRuleSetService.getAll();
      res.status(200).json(validationRuleSets.map(validationRuleSet => validationRuleSet.serialize()));
      break;
    case 'POST':
    // TODO
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
