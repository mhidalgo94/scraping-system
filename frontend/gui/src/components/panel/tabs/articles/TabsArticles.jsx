import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DataGridArticles from '../../table/articles/DataGridArticles'
import ContainerCard from '../../card/containerCard'
import ContainerFavoriteCard from '../../card/containerFavoriteCard'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }} style={{padding:"0px"}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabsArticles() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%'}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Table" {...a11yProps(0)} iconPosition="start" />
          <Tab label="Card" {...a11yProps(1)} iconPosition="start" />
          <Tab label="Favorites" {...a11yProps(2)} iconPosition="start" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} style={{padding:'0px'}}>
        <DataGridArticles />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ContainerCard />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ContainerFavoriteCard />
      </TabPanel>
    </Box>
  );
}


export default TabsArticles;