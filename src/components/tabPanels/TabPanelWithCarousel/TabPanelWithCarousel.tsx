/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable no-console */
import * as React from 'react';
import { useEffect, useState } from 'react';
import { type Descendant } from '../../../types/common';
import Item from './components/Item';
import { type NormalizedTreeItem, normalizeTree } from './utils';

interface TabPanelWithCarouselProps {
  tree: Descendant;
}

interface CurrPointerState {
  itemId: string;
  parentsIds: string[];
  childrenIds?: string[];
}

const TabPanelWithCarousel = ({
  tree,
}: TabPanelWithCarouselProps): JSX.Element => {
  const [normalizedTree, setNormalizedTree] = useState<
    Record<string, NormalizedTreeItem>
  >({});
  const [currPoiterState, setCurrPointerState] = useState<CurrPointerState>({
    itemId: tree?.name,
    parentsIds: [],
    childrenIds: [],
  });

  useEffect(() => {
    setNormalizedTree(normalizeTree(tree));
  }, [tree]);

  useEffect(() => {
    setCurrPointerState({
      itemId: tree?.name,
      parentsIds:
        typeof normalizedTree?.[tree?.name]?.parentId === 'string'
          ? [normalizedTree[tree?.name]?.parentId]
          : [],
      childrenIds: [...(normalizedTree[tree?.name]?.descendantsIds ?? [])],
    });
  }, [normalizedTree]);
  const currItem = normalizedTree[currPoiterState.itemId];
  const handleItemClick = (id: string) => () => {
    setCurrPointerState({
      itemId: id,
      parentsIds:
        typeof normalizedTree?.[id]?.parentId === 'string'
          ? [normalizedTree[id]?.parentId]
          : [],
      childrenIds: [...(normalizedTree[id]?.descendantsIds ?? [])],
    });
  };
  return (
    <div className="overflow-hidden">
      <div className="flex h-32 justify-center space-x-5 py-5">
        {currPoiterState.parentsIds?.length > 0 &&
          currPoiterState.parentsIds?.map((id) => {
            const item = normalizedTree[id];
            return (
              <Item
                key={item?.name}
                name={item?.name || ''}
                avatar={item?.payload?.avatarUrl || ''}
                active={item?.payload.atHome}
                text={item?.payload.quote || ''}
                onClick={handleItemClick(id)}
              />
            );
          })}
      </div>
      <div className="flex min-h-[32px] justify-center space-x-5 py-5">
        <Item
          key={currItem?.name}
          name={currItem?.name || ''}
          avatar={currItem?.payload?.avatarUrl || ''}
          active={currItem?.payload.atHome}
          text={currItem?.payload.quote || ''}
        />
      </div>
      <div className="flex min-h-[32px]  justify-center space-x-5 overflow-y-auto py-5">
        {currPoiterState.childrenIds?.map((id) => {
          const item = normalizedTree[id];
          return (
            <Item
              key={item?.name}
              name={item?.name || ''}
              avatar={item?.payload?.avatarUrl || ''}
              active={item?.payload.atHome}
              text={item?.payload.quote || ''}
              onClick={handleItemClick(id)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TabPanelWithCarousel;
