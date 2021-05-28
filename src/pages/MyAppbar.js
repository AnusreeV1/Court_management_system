import React, { useState } from "react";
import MyAppbar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";
const Appbar = ({ state ,heading}) => {
  const classes = useStyles();

  return (
    <MyAppbar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          COURT MANAGEMNET SYSTEM
        </Typography>
        <Typography variant="h6" className={classes.title}>
          {heading}
        </Typography>
        {state ? (
          <Button color="inherit">
            <Link to="/" className={classes.link}>
              Logout{" "}
            </Link>
          </Button>
        ) : (
          <Button color="inherit">
            <Link to="/" className={classes.link}>
              Back
            </Link>
          </Button>
        )}
      </Toolbar>
    </MyAppbar>
  );
};
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
}));
export default Appbar;
