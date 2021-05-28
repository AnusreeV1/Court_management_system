import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Home() {
  const classes = useStyles();
  // console.log(useSelector((state) => state));
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            COURT MANAGEMNET SYSTEM
          </Typography>
          <Button color="inherit">
            <Link to="/clientsauth" className={classes.link}>
              Public
            </Link>
          </Button>
          <Button color="inherit">
            <Link to="/lawyersauth" className={classes.link}>
              Lawyer
            </Link>
          </Button>
          <Button color="inherit">
            <Link to="/judgesauth" className={classes.link}>
              Judge
            </Link>
          </Button>
          <Button color="inherit">
            <Link to="/courtsauth" className={classes.link}>
              Court
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
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
}));
