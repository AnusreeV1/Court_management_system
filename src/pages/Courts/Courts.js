import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import AppBar from "../MyAppbar";
import PlaintsTable from "./components/PlaintsTable";
import HearingsTable from "./components/HearingTable";
import OngoingTable from "./components/ongoing";
import JudgementAssignment from "./components/JudgeAssignment";
import ExpiredTable from "./components/expired";
import Info from "./components/Info";

export default function ClientsPage() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className={classes.c}>
      <AppBar state={true} heading = {"Admin"} />

      <div className={classes.sideBar}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <Tab label="About Court" {...a11yProps(0)} />
          <Tab label="Plaints" {...a11yProps(1)} />
          <Tab label="JudgeAssignment" {...a11yProps(2)} />
          <Tab label="Hearing" {...a11yProps(3)} />
          <Tab label="Ongoing" {...a11yProps(4)} />
          <Tab label="Expired" {...a11yProps(5)} />
        </Tabs>

        <TabPanel className={classes.table} value={value} index={0}>
          <Info/>
        </TabPanel>
        <TabPanel className={classes.table} value={value} index={1}>
          <PlaintsTable />
        </TabPanel>
        <TabPanel className={classes.table} value={value} index={2}>
          JudgeAssignment
          {/* <JudgementAssignment /> */}
        </TabPanel>
        <TabPanel className={classes.table} value={value} index={3}>
          <HearingsTable />
        </TabPanel>
        <TabPanel className={classes.table} value={value} index={4}>
          <OngoingTable />
        </TabPanel>
        <TabPanel className={classes.table} value={value} index={5}>
          <ExpiredTable />
        </TabPanel>

      </div>
    </Box>
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
  const classes = useStyles();

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
  c: { backgroundColor: "red" },
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
