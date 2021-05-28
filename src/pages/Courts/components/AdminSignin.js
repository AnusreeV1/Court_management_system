import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AppBar from "../../MyAppbar";
import Axios from 'axios';
import { setA_id } from "../../../redux/Action";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export default function SignIn({ Handler }) {
  const classes = useStyles();
  const history = useHistory();
  const [c_id, setCourt_id] = useState("");
  const [pwd, setCourtPwd] = useState("");
  const [error, seterror] = useState(false);
  const dispatch = useDispatch();
  const login = () => {
    Axios.post("/court/login", {
      court_id: c_id,
      c_pwd: pwd,
    }).then((response) => {
      if (response.data) {
        dispatch(setA_id(c_id));
        history.push("/courts");
      } else seterror(true);
    });
  };

  return (
    <div>
      <AppBar state={false} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="court_id"
              label="Court Id"
              name="court_id"
              autoComplete="court_id"
              autoFocus
              onChange={(e) => {
                setCourt_id(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                setCourtPwd(e.target.value);
              }}
            />
            
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={login}
              >
                Sign In
              </Button>
          </form>
        </div>
        <Grid container>
              <Grid item>{error && "INCORRECT PASSWORD OR EMAIL "}</Grid>
        </Grid>
      </Container>
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
