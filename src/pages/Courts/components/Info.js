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
import EditinfoMOdal from "../components/editInfo";

export default function ComplexGrid() {
  const classes = useStyles();
  const A_id = useSelector((state) => state.Reducer.adminId);
  const [open, setOpen] = useState(false);

  const EditModalHandler = () => {
    setOpen((state) => !state);
  };
  const [courtData, setcourtData] = useState({});
  console.log(A_id);
  useEffect(() => {
    console.log("FUNCTION");
    const courtProfile = () => {
      axios.post("/court/court_info", { court_id: A_id }).then((response) => {
        //   console.log(response.data[0]);
        setcourtData(response.data[0]);
      });
    };
    courtProfile();
    return () => console.log("INFO UNMOUNTED");
  }, [open]);

  return (
    <Box>
      {open ? (
        <EditinfoMOdal Handler={EditModalHandler} open courtData={courtData} />
      ) : (
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase className={classes.image}>
                  <img
                    className={classes.img}
                    alt="complex"
                    src="https://cdn.dnaindia.com/sites/default/files/styles/full/public/2019/08/09/857287-sc-031919.jpg"
                  />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <h1>
                      <p> COURT DETAILS</p>
                    </h1>
                    <h3>COURT ID : {courtData.court_id}</h3>
                    <h3>
                      Court Name :{" "}
                      {courtData.court_name
                        ? courtData.court_name
                        : "Not available"}
                    </h3>
                    <h3>
                      Court type :{" "}
                      {courtData.court_type
                        ? courtData.court_type
                        : "Not available"}
                    </h3>
                    <h3>
                      Address :{" "}
                      {courtData.court_address ? courtData.court_address : "Not available"}
                    </h3>
                    <h3>
                      Password :{" "}
                      {courtData.court_pwd ? courtData.court_pwd : "Not available"}
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
                      src="https://cdn.dnaindia.com/sites/default/files/styles/full/public/2019/08/09/857287-sc-031919.jpg"
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
