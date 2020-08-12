import faker from 'faker';
import { IStringMap } from '../../typescript/IGeneric';

export const generator = (schema: IStringMap, min = 1, max?: number): any[] => {
  max = max || min;
  return Array.from({ length: faker.random.number({ min, max }) }).map(() =>
    Object.keys(schema).reduce((entity: any, key: any) => {
      entity[key] = faker.fake(schema[key]);
      return entity;
    }, {}),
  );
};
