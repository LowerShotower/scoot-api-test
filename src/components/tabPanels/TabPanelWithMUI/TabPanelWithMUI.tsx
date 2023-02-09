import React, { useEffect, useState, useTransition } from 'react';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import { type Ancestor } from '../../../common';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { StyledTreeItem } from './TabPanelWithMUI.styles';
import Skeleton from '@mui/material/Skeleton';
import { Button } from '@mui/material';

// TODO: optimize children of the Tree component with React.memo
// TODO: checkout handlers and useUseCallback fro it
// TODO: use useMemo for results of calculations
// TODO: normolize the ancestors, so that it would be possible to get values by id from flat list of objects

const Tree = ({ ancestor }: { ancestor: Ancestor }): JSX.Element => {
  return (
    <StyledTreeItem
      nodeId={ancestor.name}
      label={
        <Chip
          avatar={
            <Avatar alt={ancestor.name} src={ancestor.payload.avatarUrl} />
          }
          label={ancestor.name}
          variant="outlined"
        />
      }
    >
      {Array.isArray(ancestor.children) && ancestor.children.length > 0
        ? ancestor.children.map((child: Ancestor) => (
            <Tree key={child.name} ancestor={child} />
          ))
        : null}
    </StyledTreeItem>
  );
};

const MemTree = React.memo(Tree);

export const TabPanelWithMUI = ({ tree }: { tree: Ancestor }): JSX.Element => {
  const [expanded, setExpanded] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setExpanded([]);
  }, [tree]);

  const handleToggle = (_: React.SyntheticEvent, nodeIds: string[]): void => {
    setExpanded(nodeIds);
  };

  const handleSelect = (_: React.SyntheticEvent, nodeIds: string[]): void => {
    setSelected(nodeIds);
  };

  const handleExpandClick = (): void => {
    startTransition(() => {
      const extractIds = (item: Ancestor): string[] => {
        return item.children.length > 0
          ? item.children.reduce(
              (acc: string[], child: Ancestor): string[] => {
                return (acc = [...acc, ...extractIds(child)]);
              },
              [item.name]
            )
          : [];
      };

      const expandibleIds = extractIds(tree);

      setExpanded((prev: string[]): string[] =>
        prev.length === 0 ? expandibleIds : []
      );
    });
  };

  return (
    <>
      <Button onClick={handleExpandClick}>
        {expanded.length === 0 ? 'Expand all' : 'Collapse all'}
      </Button>
      {isPending ? (
        <Skeleton animation="wave" />
      ) : (
        <>
          <TreeView
            aria-label="controlled"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            expanded={expanded}
            selected={selected}
            onNodeToggle={handleToggle}
            onNodeSelect={handleSelect}
            multiSelect
          >
            <MemTree ancestor={tree} />
          </TreeView>
        </>
      )}
    </>
  );
};
