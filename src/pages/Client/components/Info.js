import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import { useSelector } from "react-redux";
import axios from "axios";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import EditinfoMOdal from "../components/Editinfo";

export default function ComplexGrid() {
  const classes = useStyles();
  const C_id = useSelector((state) => state.Reducer.clientId);
  const [open, setOpen] = useState(false);

  const EditModalHandler = () => {
    setOpen((state) => !state);
  };
  const [userData, setuserData] = useState({});
  console.log(C_id);
  useEffect(() => {
    console.log("FUNCTION");
    const clientProfile = () => {
      axios.post("/client/clientInfo", { client_id: C_id }).then((response) => {
        //   console.log(response.data[0]);
        setuserData(response.data[0]);
      });
    };
    clientProfile();
    return () => console.log("INFO UNMOUNTED");
  }, [open]);

  return (
    <Box>
      {open ? (
        <EditinfoMOdal Handler={EditModalHandler} open userData={userData} />
      ) : (
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase className={classes.image}>
                  <img
                    className={classes.img}
                    alt="complex"
                    src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQU2JRbbl3LBOm_an3eI5iplFhOoLESyBwUfmWDO49BS1EYuGUE"
                  />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <h1>
                      <p> CLIENT DETAILS</p>
                    </h1>
                    <h3>CLIENT ID : {userData.client_id}</h3>
                    <h3>
                      Name :{" "}
                      {userData.client_name
                        ? userData.client_name
                        : "Not available"}
                    </h3>
                    <h3>
                      Mobile Number :{" "}
                      {userData.mobile_no
                        ? userData.mobile_no
                        : "Not available"}
                    </h3>
                    <h3>
                      Email :{" "}
                      {userData.email ? userData.email : "Not available"}
                    </h3>
                    <h3>
                      Password :{" "}
                      {userData.password ? userData.password : "Not available"}
                    </h3>
                  </Grid>

                  <Grid item>
                    <Typography variant="body2" style={{ cursor: "pointer" }}>
                      <Button color="secondary" onClick={EditModalHandler}>
                        EDIT INFO <br /> <EditIcon />
                      </Button>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">
                    <Avatar
                      alt="Cindy Baker"
                      src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQU2JRbbl3LBOm_an3eI5iplFhOoLESyBwUfmWDO49BS1EYuGUE"
                    />
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </div>
      )}
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    // maxWidth: 1000,
  },
  image: {
    width: 500,
    height: 500,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));
