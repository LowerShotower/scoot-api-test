import { TreeItem } from '@mui/lab';
import styled from 'styled-components';

export const StyledTreeItem = styled(TreeItem)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  & .MuiChip-root {
    cursor: pointer;
  }
  && .MuiTreeItem-content:hover,
  && .MuiTreeItem-content.Mui-focused,
  && .MuiTreeItem-content.Mui-selected,
  && .MuiTreeItem-content.Mui-selected.Mui-focused {
    background-color: transparent;
  }
`;
