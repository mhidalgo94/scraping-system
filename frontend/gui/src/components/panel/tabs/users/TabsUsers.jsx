import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DataGridUsers from '../../table/user/DataGridUsers'



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
function TabsUsers(){
    const [value, setValue] = React.useState(1)

  const handleChange = (event, newValue)=>{
    setValue(newValue)
  }

  return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider',padding:" 0 10px"}}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="All" {...a11yProps(0)} iconPosition="start" />
            <Tab label="Active" {...a11yProps(1)} iconPosition="start" />
            <Tab label="Banned" {...a11yProps(2)} iconPosition="start" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0} style={{padding:'0px 10px', marginTop:"8px"}}>
          <DataGridUsers />
        </TabPanel>
        <TabPanel value={value} index={1} style={{padding:'10px'}}>
          <DataGridUsers status={1} />
        </TabPanel>
        <TabPanel value={value} index={2} style={{padding:'10px'}}>
          <DataGridUsers status={0} />

        </TabPanel>
      </Box>
    );
};

export default TabsUsers;
