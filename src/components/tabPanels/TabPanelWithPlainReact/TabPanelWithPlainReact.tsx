import { Avatar, Button, Chip } from '@mui/material';
import React, { useState } from 'react';
import { type Descendant } from '../../../types/common';
import TreeItem from '../../TreeItem/TreeItem';
import TreeView from '../../TreeView/TreeView';

// TODO: integrate Pointer instance (current selected item pointer), and display only 10 closest ancestors and descendants.
// Display ... fro the rest ot the elements from start and from the end

const TabPanelWithPlainReact = ({
  tree,
}: {
  tree: Descendant;
}): JSX.Element => {
  const [expandedAll, setExpandedAll] = useState<boolean>(false);

  const handleExpandClick = (): void => {
    setExpandedAll((prev: boolean): boolean => !prev);
  };
  return (
    <>
      <div>
        <Button onClick={handleExpandClick}>
          {expandedAll ? 'Collapse all' : 'Expand all'}
        </Button>
      </div>
      <TreeView expandedAll={expandedAll}>
        <TreeItem
          id={tree.name}
          descendants={tree.descendants}
          content={
            <Chip
              avatar={<Avatar alt={tree.name} src={tree.payload.avatarUrl} />}
              label={tree.name}
              variant="outlined"
            />
          }
        />
      </TreeView>
    </>
  );
};

export default TabPanelWithPlainReact;
