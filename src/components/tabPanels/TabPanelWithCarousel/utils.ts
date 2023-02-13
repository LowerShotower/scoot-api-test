import { type DescendantPayload, type Descendant } from '../../../types/common';

export interface NormalizedTreeItem {
  name: string;
  parentId: string;
  descendantsIds: string[] | undefined;
  payload: DescendantPayload;
}
export const normalizeTree = (
  tree: Descendant
): Record<string, NormalizedTreeItem> => {
  const createNormalizedItemObject = (
    descendants: Descendant[],
    parentId?: string
  ): Record<string, NormalizedTreeItem> => {
    return descendants?.reduce((normalizedItems, item) => {
      const { descendants, ...itemRest } = item;
      const normalizedDescendantItems = createNormalizedItemObject(
        descendants,
        item.name
      );
      return {
        ...normalizedItems,
        [item.name]: {
          parentId,
          ...itemRest,
          descendantsIds: descendants?.map((v: Descendant) => v.name),
        },
        ...normalizedDescendantItems,
      };
    }, {});
  };
  return createNormalizedItemObject([tree]);
};
