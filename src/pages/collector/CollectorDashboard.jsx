import React, { useState } from "react";
import { Box, Tabs, Tab, Typography, Container } from "@mui/material";
import Explore from "./Explore";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`collector-tabpanel-${index}`}
      aria-labelledby={`collector-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const CollectorDashboard = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Collector Dashboard
      </Typography>

      <Tabs value={tabIndex} onChange={handleTabChange} aria-label="collector dashboard tabs">
        <Tab label="Explore" />
      </Tabs>

      <TabPanel value={tabIndex} index={0}>
        <Explore />
      </TabPanel>
    </Container>
  );
};

export default CollectorDashboard;
