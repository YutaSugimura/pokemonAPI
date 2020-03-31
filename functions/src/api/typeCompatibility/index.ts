import functions from 'firebase-functions';
import Result from '../../interface';
import { queries } from './interface';
import jsonData from '../../json/typeCompatibility.json';

const func = async (req: functions.Request): Promise<Result> => {
  const result: Result = { code: 200, message: 'Success' };

  try {
    const query: queries = req.query ? req.query : {};
    const type = query.type;
    const battleType = query.battleType;

    if (type) {
      if (battleType) {
        if (battleType === 'attack') {
          result.data = jsonData[type].attack;
        } else if (battleType === 'defense') {
          result.data = jsonData[type].defense;
        }
      } else {
        result.data = jsonData[type];
      }
    } else {
      result.code = 400;
      result.data = 'Bad Request';
    }
  } catch {
    result.code = 500;
    result.message = 'Server Error';
  }
  return result;
};
export default func;
