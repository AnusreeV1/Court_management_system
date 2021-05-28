import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import AppBar from "../MyAppbar";
import HearingsTable from "./components/HearingsTable";
import ExpiredTable from "./components/ExpiredTable";
import OngoingTable from "./components/OngoingTable";
import Judgement from "./components/Judgement";
export default function ClientsPage() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar state={true} heading = {"Judge"}/>

      <div className={classes.sideBar}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <Tab label="My Profile" {...a11yProps(0)} />
          <Tab label="Hearings" {...a11yProps(1)} />
          <Tab label="Ongoing Cases" {...a11yProps(2)} />
          <Tab label="Expired Cases" {...a11yProps(3)} />
          <Tab label="Judgement" {...a11yProps(4)} />
        </Tabs>
        <TabPanel className={classes.table} value={value} index={0}>
          My Profile
        </TabPanel>

        <TabPanel className={classes.table} value={value} index={1}>
          Hearings
          <HearingsTable />
        </TabPanel>
        <TabPanel className={classes.table} value={value} index={2}>
          Ongoing Cases
          <OngoingTable />
        </TabPanel>
        <TabPanel className={classes.table} value={value} index={3}>
          Expired Cases
          <ExpiredTable />
        </TabPanel>
        <TabPanel className={classes.table} value={value} index={4}>
          Judgement
          {/* <Judgement /> */}
        </TabPanel>
      </div>
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: "white",
  },
  sideBar: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "100vh",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  table: {
    width: "100%",
  },

}));
