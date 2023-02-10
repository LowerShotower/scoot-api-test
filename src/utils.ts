import { faker } from '@faker-js/faker';
import { type Ancestor } from './types/common';

export const createNode = (width: number, depth: number): Ancestor => {
  return {
    name: faker.name.fullName(),
    payload: {
      age: +faker.random.numeric(2),
      atHome: faker.datatype.boolean(),
      avatarUrl: faker.image.avatar(),
      quote: 'https://favqs.com/api/qotd',
    },
    children:
      depth > 0
        ? Array.from(
            Array(Math.floor(Math.random() * width) + 1),
            (): Ancestor => createNode(width, depth - 1)
          )
        : [],
  };
};

export const createFamilyTree = (depth: number, width: number): Ancestor => {
  return createNode(width, depth - 1);
};
