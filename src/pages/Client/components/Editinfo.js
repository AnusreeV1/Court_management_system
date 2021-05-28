import Modal from "@material-ui/core/Modal";
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
import UpdateIcon from "@material-ui/icons/Update";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import EditinfoMOdal from "../components/Editinfo";
import TextField from "@material-ui/core/TextField";
export default function SimpleModal({ Handler, open, userData }) {
  console.log("EDIT INFO PAGE");
  const [x, setx] = useState(userData);
  //   console.log(x);
  const updateEditProfile = () => {
    axios.post("/client/clientEditInfo", x).then((response) => {
        console.log(response.data);
      if (response.data) Handler();
    });
  };

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
                    <div>
                      <TextField
                        label="CLIENT ID"
                        value={x.client_id}
                        InputProps={{
                          readOnly: true,
                        }}
                        onChange={(text) =>
                          setx({
                            ...x,
                            client_id: text.target.value,
                          })
                        }
                      />
                    </div>
                    <br></br>
                    <div>
                      <TextField
                        label="Name"
                        value={x.client_name}
                        onChange={(text) =>
                          setx({
                            ...x,
                            client_name: text.target.value,
                          })
                        }
                      />
                    </div>
                    <br></br>
                    <div>
                      <TextField
                        label="Mobile Number"
                        value={x.mobile_no}
                        onChange={(text) =>
                          setx({
                            ...x,
                            mobile_no: text.target.value,
                          })
                        }
                      />
                    </div>
                    <br></br>

                    <div>
                      <TextField
                        label="Email"
                        value={x.email}
                        onChange={(text) =>
                          setx({
                            ...x,
                            email: text.target.value,
                          })
                        }
                      />
                    </div>
                    <br></br>

                    <div>
                      <TextField
                        label="Password"
                        value={x.password}
                        onChange={(text) =>
                          setx({
                            ...x,
                            password: text.target.value,
                          })
                        }
                      />
                    </div>
                  </Grid>

                  <Grid item>
                    <Typography variant="body2" style={{ cursor: "pointer" }}>
                      <Button
                        color="secondary"
                        onClick={() => updateEditProfile()}
                      >
                        UPDATE INFO <br /> <UpdateIcon />
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
