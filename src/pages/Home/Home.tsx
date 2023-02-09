import * as React from 'react';
import { useState } from 'react';
import { Container, Slider } from '@mui/material';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TabPanelWithMUI } from '../../components/tabPanels/TabPanelWithMUI/TabPanelWithMUI';
import { type Ancestor } from '../../types/common';
import { createFamilyTree } from '../../utils';
import { StyledTabs } from './Home.styles';

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

export const Home = (): JSX.Element => {
  const [value, setValue] = useState<number>(0);
  const [treeDepthValue, setTreeDepthValue] = useState<number>(9);
  const [treeWidthValue, setTreeWidthValue] = useState<number>(3);
  const [currFamilyTree, setCurrFamilyTree] = useState<Ancestor>(
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
    <Container maxWidth="sm">
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            width: 300,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            margin: '0 auto',
          }}
        >
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
        </Box>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <StyledTabs
            sx={{ justifyContent: 'center' }}
            value={value}
            onChange={handleTabChange}
          >
            <Tab label="With Material UI" />
            <Tab label="Carousel" />
          </StyledTabs>
        </Box>
        <TabPanel value={value} index={0}>
          <TabPanelWithMUI tree={currFamilyTree} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Box>
    </Container>
  );
};
