import type { NextApiRequest, NextApiResponse } from 'next'
import { SerializedValidationRuleSet } from '../../../../validation-module/validationRuleSet';
import validationRuleSetService from '../../../../validation-module/validationRuleSetService';

function get(req: NextApiRequest, res: NextApiResponse<SerializedValidationRuleSet>, name: string) {
  const validationRuleSet = validationRuleSetService.getByName(name);
  if (!!validationRuleSet) {
    res.status(200).json(validationRuleSet.serialize());
  } else {
    res.status(404);
  }
}

async function del(req: NextApiRequest, res: NextApiResponse<{ result: Boolean }>, name: string) {
  const result = await validationRuleSetService.delete(name);
  res.status(200).json({ result });
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SerializedValidationRuleSet | { result: Boolean }>
) {
  const name = req.query.name!.toString();
  const { method } = req;

  switch (method) {
    case 'GET':
      get(req, res, name);
      break;
    case 'DELETE':
      del(req, res, name);
      break;
    default:
      res.setHeader('Allow', ['GET', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
    
}
