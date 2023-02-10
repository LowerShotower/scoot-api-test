import React, { createContext, useEffect, useState } from 'react';
import { StyledTreeContainer } from './TreeView.styles';

interface TreeViewProps {
  readonly children: React.ReactNode;
  expandedAll: boolean;
}

interface ExpandedContextProps {
  expandedAll: boolean;
  expanded: string[];
}
export const ExpandedContext = createContext<ExpandedContextProps>({
  expandedAll: false,
  expanded: [],
});

const TreeView = ({ children, expandedAll }: TreeViewProps): JSX.Element => {
  const [expandedContext, setExpandedContext] = useState<ExpandedContextProps>({
    expandedAll: false,
    expanded: [],
  });

  useEffect(() => {
    setExpandedContext({ ...expandedContext, expandedAll });
  }, [expandedAll]);

  return (
    <StyledTreeContainer>
      <ExpandedContext.Provider value={expandedContext}>
        {React.Children.map(React.Children.toArray(children), (child) => {
          return React.cloneElement(child as React.ReactElement<any>);
        })}
      </ExpandedContext.Provider>
    </StyledTreeContainer>
  );
};

export default TreeView;
