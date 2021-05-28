import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import AppBar from "../../MyAppbar";

import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setC_id } from "../../../redux/Action";
export default function SignUp({ Handler }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [clientname, setClientName] = useState();
  const [clientemail, setClientEmail] = useState();
  const [clientmobile, setClientMobile] = useState();
  const [clientpsw, setClientPsw] = useState();
  const [emailalready, setemailalready] = useState(false);

  const idcheck = useSelector((state) => !!state.Reducer.clientId);

  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "/client/signup";
    const user = {
      c_name: clientname,
      email: clientemail,
      mobile: clientmobile,
      pwd: clientpsw,
    };
    // console.log(user);
    Axios.post(url, user)
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          dispatch(setC_id(res.data[0].client_id));
          if (idcheck) history.push("/clients");
        } else {
          console.log(res.data);
          setemailalready(true);
        }
      })
      .catch((err) => {
        console.log(err);
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
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="cname"
                  name="client_name"
                  variant="outlined"
                  required
                  fullWidth
                  id="Client_name"
                  label="Name"
                  autoFocus
                  onChange={(e) => {
                    setClientName(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="mobile"
                  label="Mobile number"
                  name="mobile"
                  autoComplete="mobile"
                  onChange={(e) => {
                    setClientMobile(e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="E-mail"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => {
                    setClientEmail(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="psw"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => {
                    setClientPsw(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Sign Up
            </Button>

            <Grid container justify="flex-end">
              <Grid item>
                <div onClick={() => Handler()}>
                  Already have an account? Sign in
                </div>
              </Grid>
            </Grid>
            <Grid container justify="flex-end">
              <Grid item>{emailalready && "Email already exist "}</Grid>
            </Grid>
          </form>
        </div>
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
