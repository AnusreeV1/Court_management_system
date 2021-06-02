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

export default function ComplexGrid() {
  const classes = useStyles();
  const J_id = useSelector((state) => state.Reducer.judgeId);

  const [userData, setuserData] = useState({});
  console.log(J_id);
  useEffect(() => {
    console.log("FUNCTION");
    const judgeProfile = () => {
      axios.post("/judges/info", { judge_id: J_id }).then((response) => {
         console.log(response.data[0]);
        setuserData(response.data[0]);
      });
    };
    judgeProfile();
  }, []);

  return (
    <Box>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img
                  className={classes.img}
                  alt="complex"
                  src="https://7wallpapers.net/wp-content/uploads/1_The-Judge.jpg"
                />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs alignItems="center">
                  <h1>
                    <p> JUDGE DETAILS</p>
                  </h1>
                  <h3>JUDGE ID : {userData.judge_id}</h3>
                  <h3>
                    Name :{" "}
                    {userData.judge_name
                      ? userData.judge_name
                      : "Not available"}
                  </h3>

                  <h3>
                    Email :{" "}
                    {userData.judge_email
                      ? userData.judge_email
                      : "Not available"}
                  </h3>
                  <h3>
                    Password :{" "}
                    {userData.judge_pwd ? userData.judge_pwd : "Not available"}
                  </h3>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">
                  <Avatar
                    alt="Cindy Baker"
                    src="https://7wallpapers.net/wp-content/uploads/1_The-Judge.jpg"
                  />
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
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
