import { Avatar, Button, Chip } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { type Descendant } from '../../../types/common';
import TreeView from '../../TreeView/TreeView';

// TODO: integrate Pointer instance (current selected item pointer), and display only 10 closest ancestors and descendants.
// Display ... fro the rest ot the elements from start and from the end
// TODO: load content (or take it from the array) ONLY when the item is expanded. So we will have a representation of expanded items, that will be displayed
const TabPanelWithPlainReact = ({
  tree,
}: {
  tree: Descendant;
}): JSX.Element => {
  const [expandedAll, setExpandedAll] = useState<boolean>(false);

  const handleExpandClick = (): void => {
    setExpandedAll((prev: boolean): boolean => !prev);
  };
  const memorizedChip = useCallback(
    (item: Descendant) => (
      <Chip
        avatar={<Avatar alt={item?.name} src={item?.payload.avatarUrl} />}
        label={item?.name}
        variant="outlined"
      />
    ),
    []
  );
  return (
    <>
      <div>
        <Button onClick={handleExpandClick}>
          {expandedAll ? 'Collapse all' : 'Expand all'}
        </Button>
      </div>
      <TreeView
        tree={[tree]}
        expandedAll={expandedAll}
        content={memorizedChip}
      ></TreeView>
    </>
  );
};

export default TabPanelWithPlainReact;
