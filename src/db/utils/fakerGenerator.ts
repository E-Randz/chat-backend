import faker from 'faker';

export const generator = (schema: any, min = 1, max?: number): any[] => {
  max = max || min;
  return Array.from({ length: faker.random.number({ min, max }) }).map(() =>
    Object.keys(schema).reduce((entity: any, key: any) => {
      entity[key] = faker.fake(schema[key]);
      return entity;
    }, {}),
  );
};
