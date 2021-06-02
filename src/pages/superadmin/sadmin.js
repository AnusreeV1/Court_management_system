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
import AppBar from "../MyAppbar";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { setC_id } from "../../redux/Action";
import { setL_id } from "../../redux/Action";
import { useDispatch } from "react-redux";

export default function SignIn({ Handler }) {

  const classes = useStyles();
  const history = useHistory();

  const [l_id, setl_id] = useState("");
  const [l_pwd, setl_pwd] = useState("");
  const [l_name, setl_name] = useState("");
  const [l_email, setl_email] = useState("");
  const [l_mobile, setl_mobile] = useState("");
  const [l_type, setl_type] = useState("");

  const [j_id, setj_id] = useState("");
  const [j_pwd, setj_pwd] = useState("");
  const [j_name, setj_name] = useState("");
  const [j_email, setj_email] = useState("");
  const [c_id, setc_id] = useState("");
  const [c_pwd, setc_pwd] = useState("");
  const [c_name, setc_name] = useState("");
  const [c_add, setc_add] = useState("");
  const [c_type, setc_type] = useState("");

  

  

  const [error, seterror] = useState(false);
  const dispatch = useDispatch();

//   const login = () => {
//     Axios.post("/lawyer/login", {
//       lawyer_id: lid,
//       l_pwd: pwd,
//     }).then((response) => {
//       if (response.data) {
//         dispatch(setL_id(lid));
//         history.push("/lawyers");
//       } else seterror(true);
//     });
//   };

  const lawyer = () =>{
      Axios.post("/superadmin/addlawyer",{
          lawyer_id: l_id,
          lawyer_name: l_name,
          lawyer_email:l_email,
          lawyer_pwd:l_pwd,
          lawyer_type:l_type,
          lawyer_mobile:l_mobile,
      });
  }

  const judge = () =>{
    Axios.post("/superadmin/addjudges",{
        judge_id: j_id,
        judge_name: j_name,
        judge_email:j_email,
        judge_pwd:j_pwd,
    });
}

const court = () =>{
    Axios.post("/superadmin/addcourts",{
        court_id: c_id,
        court_name: c_name,
        court_address:c_add,
        court_type:c_type,
        court_pwd:c_pwd,
    });
}





  return (
    <div>
      <AppBar state={false} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Add lawyer
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="l_name"
              label="Lawyer name"
              name="l_name"
              autoComplete="l_name"
              autoFocus
              onChange={(e) => {
                setl_name(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lawyer_email"
              label="Lawyer email"
              name="lawyer_email"
              autoComplete="lawyer_email"
              autoFocus
              onChange={(e) => {
                setl_email(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lawyer_mobile"
              label="Lawyer mobile"
              name="lawyer_mobile"
              autoComplete="lawyer_mobile"
              autoFocus
              onChange={(e) => {
                setl_mobile(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lawyer_type"
              label="Lawyer type"
              name="lawyer_type"
              autoComplete="lawyer_type"
              autoFocus
              onChange={(e) => {
                setl_type(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                setl_pwd(e.target.value);
              }}
            />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={lawyer}
              >
                Add lawyer
              </Button>
          </form>
        </div>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Add Judge
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="j_name"
              label="Judge name"
              name="j_name"
              autoComplete="j_name"
              autoFocus
              onChange={(e) => {
                setj_name(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="judge_email"
              label="judge email"
              name="judge_email"
              autoComplete="judge_email"
              autoFocus
              onChange={(e) => {
                setj_email(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                setj_pwd(e.target.value);
              }}
            />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={judge}
              >
                Add judge
              </Button>
          </form>
        </div>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Add court
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="c_name"
              label="Court name"
              name="c_name"
              autoComplete="c_name"
              autoFocus
              onChange={(e) => {
                setc_name(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="court_address"
              label="court address"
              name="court_address"
              autoComplete="court_address"
              autoFocus
              onChange={(e) => {
                setc_add(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="court_type"
              label="court type"
              name="court_type"
              autoComplete="court_type"
              autoFocus
              onChange={(e) => {
                setc_type(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                setc_pwd(e.target.value);
              }}
            />
            
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={court}
              >
                Add court
              </Button>
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
