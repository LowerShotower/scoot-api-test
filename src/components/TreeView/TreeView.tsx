import React, { createContext, useCallback, useEffect, useState } from 'react';
import { type Descendant } from '../../types/common';
import TreeItem from '../TreeItem/TreeItem';
import { StyledTreeContainer } from './TreeView.styles';

interface TreeViewProps {
  readonly tree: Descendant[];
  readonly treeItem?: React.FC<any>;
  readonly expandedAll: boolean;
  readonly content: (item: Descendant) => JSX.Element;
}

interface ExpandedContextProps {
  expandedAll: boolean;
  expanded: string[];
  selected: null | string | number;
  visibleDepth: number;
}

const defaultExpandedContextState: ExpandedContextProps = {
  expandedAll: false,
  expanded: [],
  selected: null,
  visibleDepth: 5,
};
export const ExpandedContext = createContext<ExpandedContextProps>(
  defaultExpandedContextState
);

const TreeView = ({
  tree,
  content,
  treeItem,
  expandedAll,
}: TreeViewProps): JSX.Element => {
  const [expandedContext, setExpandedContext] = useState<ExpandedContextProps>(
    defaultExpandedContextState
  );

  const TreeItemComponent = treeItem ?? TreeItem;

  useEffect(() => {
    setExpandedContext({ ...expandedContext, expandedAll });
  }, [expandedAll]);

  const onItemClick = useCallback(
    (e: React.SyntheticEvent, id: string | number): void => {
      // eslint-disable-next-line no-console
      console.log('on item click', id);
    },
    []
  );

  return (
    <StyledTreeContainer>
      <ExpandedContext.Provider value={expandedContext}>
        <TreeItemComponent
          item={tree[0]}
          onItemClick={onItemClick}
          id={tree[0].name}
          content={content}
        />
      </ExpandedContext.Provider>
    </StyledTreeContainer>
  );
};

export default TreeView;
