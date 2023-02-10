import { Box, Container, Paper, Tabs } from '@mui/material';
import styled from 'styled-components';

export const StyledTabs = styled(Tabs)`
  & .MuiTabs-flexContainer {
    justify-content: center;
  }
`;

export const StyledSlidersContainer = styled(Box)`
    width: 300,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '0 auto',
`;

export const StyledHomeContainer = styled(Container)`
  &&& {
    display: flex;
    flex-direction: column;
    height: inherit;
    padding: 20px;
  }
`;

export const StyledPaper = styled(Paper).attrs((props) => ({ elevation: 2 }))`
  overflow: auto;
  flex: 1 1 auto;
`;
