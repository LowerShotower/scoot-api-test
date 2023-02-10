import * as React from 'react';
import { useState } from 'react';
import { Slider } from '@mui/material';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TabPanelWithMUI } from '../../components/tabPanels/TabPanelWithMUI/TabPanelWithMUI';
import TabPanelWithPlainReact from '../../components/tabPanels/TabPanelWithPlainReact/TabPanelWithPlainReact';
import { type Descendant } from '../../types/common';
import { createFamilyTree } from '../../utils';
import {
  StyledTabs,
  StyledSlidersContainer,
  StyledHomeContainer,
  StyledPaper,
} from './Home.styles';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = ({
  children,
  value,
  index,
  ...other
}: TabPanelProps): JSX.Element => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const enum TAB {
  MUI,
  plain,
  carousel,
}

export const Home = (): JSX.Element => {
  const [value, setValue] = useState<TAB>(TAB.plain);
  const [treeDepthValue, setTreeDepthValue] = useState<number>(9);
  const [treeWidthValue, setTreeWidthValue] = useState<number>(3);
  const [currFamilyTree, setCurrFamilyTree] = useState<Descendant>(
    createFamilyTree(treeDepthValue, treeWidthValue)
  );

  const handleTabChange = (
    event: React.SyntheticEvent,
    newValue: number
  ): void => {
    setValue(newValue);
  };

  const handleTreeWidthChange = (
    event: Event,
    newValue: number | number[]
  ): void => {
    setTreeWidthValue(newValue as number);
    setCurrFamilyTree(createFamilyTree(treeDepthValue, treeWidthValue));
  };

  const handleTreeDepthChange = (
    event: Event,
    newValue: number | number[]
  ): void => {
    setTreeDepthValue(newValue as number);
    setCurrFamilyTree(createFamilyTree(treeDepthValue, treeWidthValue));
  };

  return (
    <StyledHomeContainer maxWidth="md">
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          height: 'inherit',
        }}
      >
        <StyledSlidersContainer>
          <Typography>Depth</Typography>
          <Slider
            onChange={handleTreeDepthChange}
            defaultValue={2}
            value={treeDepthValue}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={20}
          />
          <Typography> Max Width</Typography>
          <Slider
            onChange={handleTreeWidthChange}
            defaultValue={2}
            step={1}
            marks
            min={1}
            max={5}
            valueLabelDisplay="auto"
            value={treeWidthValue}
          />
        </StyledSlidersContainer>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <StyledTabs
            sx={{ justifyContent: 'center' }}
            value={value}
            onChange={handleTabChange}
          >
            <Tab label="With Material UI" />
            <Tab label="Custom Component" />
          </StyledTabs>
        </Box>
        <StyledPaper>
          <TabPanel value={value} index={0}>
            <TabPanelWithMUI tree={currFamilyTree} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TabPanelWithPlainReact tree={currFamilyTree} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
        </StyledPaper>
      </Box>
    </StyledHomeContainer>
  );
};
