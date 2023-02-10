/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { StyledContainer, StyledUl } from './TreeItem.styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { ExpandedContext } from '../TreeView/TreeView';
import { type Descendant } from '../../types/common';

interface TreeItemCoreElementProps
  extends Pick<
    TreeItemProps<ItemContentType>,
    'content' | 'onItemClick' | 'item'
  > {
  children?: React.ReactNode;
  id: string | number;
  expanded?: boolean;
}

type ItemContentType = Pick<Descendant, 'name' | 'payload' | 'descendants'>;

const TreeItemCoreElement = ({
  content,
  id,
  children,
  item,
  expanded,
  onItemClick,
}: TreeItemCoreElementProps): JSX.Element => {
  const hasChildren = !!(
    children &&
    Array.isArray(children) &&
    children.length
  );
  const memorizedContent = useMemo(() => {
    return (
      <>
        {hasChildren && (expanded ? <ExpandMoreIcon /> : <ChevronRightIcon />)}
        {content(item)}
      </>
    );
  }, [expanded, content, item]);
  const handleContentClick = (e: React.SyntheticEvent): void => {
    onItemClick?.(e, id);
  };

  return (
    <>
      <StyledContainer withPointer={hasChildren} onClick={handleContentClick}>
        {memorizedContent}
      </StyledContainer>
      {hasChildren && (
        <StyledUl
          style={{
            display: expanded ? 'flex' : 'none',
          }}
        >
          {React.Children.map(React.Children.toArray(children), (child) => {
            return (
              <li key={id}>{React.cloneElement(child as JSX.Element, {})}</li>
            );
          })}
        </StyledUl>
      )}
    </>
  );
};

export interface TreeItemProps<ItemContentType> {
  id: number | string;
  item: ItemContentType;
  content: (item: ItemContentType) => JSX.Element;
  onItemClick: (e: React.SyntheticEvent, id: string | number) => void;
}
export interface InjectedProps extends TreeItemProps<ItemContentType> {
  extended: boolean;
}

const TreeItem: <T extends TreeItemProps<ItemContentType>>(
  props: T
) => React.ReactElement<T> = ({ id, item, content, onItemClick }) => {
  const [_expanded, setExpanded] = useState<boolean>(false);

  const { expandedAll } = useContext(ExpandedContext);

  useEffect(() => {
    setExpanded(expandedAll);
  }, [expandedAll]);

  const handleContentClick = useCallback((e: React.SyntheticEvent): void => {
    setExpanded((prev) => !prev);
    onItemClick?.(e, id);
  }, []);

  return (
    <TreeItemCoreElement
      id={id}
      item={item}
      expanded={_expanded}
      onItemClick={handleContentClick}
      content={content}
    >
      {item?.descendants?.map((descendant: Descendant) => (
        <MemorizedTreeItem
          onItemClick={onItemClick}
          key={descendant.name}
          id={descendant.name}
          item={descendant}
          content={content}
        />
      ))}
    </TreeItemCoreElement>
  );
};

const MemorizedTreeItem = React.memo(TreeItem);

export default TreeItem;
