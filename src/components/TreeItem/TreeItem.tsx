/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StyledContainer, StyledUl } from './TreeItem.styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { ExpandedContext } from '../TreeView/TreeView';
import { type Ancestor } from '../../types/common';
import { Avatar, Chip } from '@mui/material';

interface TreeItemCoreElementProps {
  children?: React.ReactNode;
  id: string | number;
  content?: JSX.Element;
  expanded?: boolean;
  onClick?: (e: React.SyntheticEvent) => void;
}

const TreeItemCoreElement = ({
  content,
  children,
  id,
  expanded,
  onClick,
}: TreeItemCoreElementProps): JSX.Element => {
  const handleContentClick = (e: React.SyntheticEvent): void => {
    onClick?.(e);
  };

  return (
    <>
      <StyledContainer withPointer={!!children} onClick={handleContentClick}>
        {children && (expanded ? <ExpandMoreIcon /> : <ChevronRightIcon />)}
        {content}
      </StyledContainer>
      {children && (
        <StyledUl
          style={{
            display: expanded ? 'flex' : 'none',
          }}
        >
          {React.Children.map(React.Children.toArray(children), (child) => {
            return (
              <li>
                {React.cloneElement(child as JSX.Element, {
                  // expanded: _expanded,
                })}
              </li>
            );
          })}
        </StyledUl>
      )}
    </>
  );
};

export interface TreeItemProps {
  id: number | string;
  descendants?: Ancestor[];
  content?: JSX.Element;
}
const TreeItem = ({ id, descendants, content }: TreeItemProps): JSX.Element => {
  const [_expanded, setExpanded] = useState<boolean>(false);

  const { expandedAll } = useContext(ExpandedContext);

  useEffect(() => {
    setExpanded(expandedAll);
  }, [expandedAll]);

  const handleClick = (e: React.SyntheticEvent): void => {
    setExpanded((prev) => !prev);
  };

  return (
    <TreeItemCoreElement
      id={id}
      expanded={_expanded}
      onClick={handleClick}
      content={content}
    >
      {descendants?.map(({ name, payload, children }: Ancestor) => (
        <TreeItem
          key={name}
          id={name}
          descendants={children}
          content={
            <Chip
              avatar={<Avatar alt={name} src={payload.avatarUrl} />}
              label={name}
              variant="outlined"
            />
          }
        />
      ))}
    </TreeItemCoreElement>
  );
};

export default TreeItem;
