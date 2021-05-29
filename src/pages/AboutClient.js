import Modal from "@material-ui/core/Modal";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
export default function SimpleModal({ Handler, open, id }) {
  const C_id = id;
  // console.log(id);
  const [userData, setuserData] = useState(false);
  console.log(userData);
  console.log(C_id);
  useEffect(() => {
    console.log("FUNCTION");
    const clientProfile = () => {
      axios.post("/client/clientInfo", { client_id: C_id }).then((response) => {
          console.log(response.data[0]);
        setuserData(response.data[0]);
      });
    };
    clientProfile();
    return () => console.log("INFO UNMOUNTED");
  }, []);

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  return (
    <div>
      <Modal
        open={open}
        onClose={Handler}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div>{userData && (
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
                      <h3>
                        ID :{" "}
                        {userData.client_id
                          ? userData.client_id
                          : "Not Available"}
                      </h3>
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
                     
                    </Grid>

                    <Grid item>
                      <Typography variant="body2" style={{ cursor: "pointer" }}>
                        <Button color="secondary" onClick={() => Handler()}>
                          CLOSE <br />
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
        )}</div>
      </Modal>
    </div>
  );
}
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  paper: {
    marginTop: 200,
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 1000,
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
