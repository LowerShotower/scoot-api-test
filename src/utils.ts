import { faker } from '@faker-js/faker';
import { type Descendant } from './types/common';

export const createNode = (width: number, depth: number): Descendant => {
  return {
    name: faker.name.fullName(),
    payload: {
      age: +faker.random.numeric(2),
      atHome: faker.datatype.boolean(),
      avatarUrl: faker.image.avatar(),
      quote: faker.address.cityName(),
    },
    descendants:
      depth > 0
        ? Array.from(
            Array(Math.floor(Math.random() * width) + 1),
            (): Descendant => createNode(width, depth - 1)
          )
        : [],
  };
};

export const createFamilyTree = (depth: number, width: number): Descendant => {
  return createNode(width, depth - 1);
};
