import React,{useState} from "react";
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
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { setC_id } from "../../../redux/Action";
import { setL_id } from "../../../redux/Action";
import { useDispatch } from "react-redux";

export default function SignIn({ Handler }) {

  const classes = useStyles();
  const history = useHistory();

  const [lid, setLid] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, seterror] = useState(false);
  const dispatch = useDispatch();

  const login = () => {
    Axios.post("/lawyer/login", {
      lawyer_id: lid,
      l_pwd: pwd,
    }).then((response) => {
      if (response.data) {
        dispatch(setL_id(lid));
        history.push("/lawyers");
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
              id="email"
              label="Lawyer ID"
              name="lawyer_id"
              autoComplete="lawyer_id"
              autoFocus
              onChange={(e) => {
                setLid(e.target.value);
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
                setPwd(e.target.value);
              }}
            />

{/* <Link to="/lawyers"> */}
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={login}
                // onClick={() => props.Handler()}
              >
                Sign In
              </Button>
            {/* </Link> */}
            {/* <Grid container>
              <Grid item>
                <Link variant="body2">
                  <div onClick={() => Handler()}>
                    "Don't have an account? Sign Up"
                  </div>
                </Link>
              </Grid>
            </Grid> */}
            <Grid container>
              <Grid item>{error && "INCORRECT PASSWORD OR EMAIL "}</Grid>
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
