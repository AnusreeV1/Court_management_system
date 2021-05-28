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
import CloseIcon from '@material-ui/icons/Close';
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
export default function SimpleModal({ Handler, open, courtData }) {
  console.log("EDIT INFO PAGE");
  const [x, setx] = useState(courtData);
  //   console.log(x);
  const updateEditProfile = () => {
    axios.post("/court/edit_court_info", x).then((response) => {
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
                    <div>
                      <TextField
                        label="COURT ID"
                        value={x.court_id}
                        InputProps={{
                          readOnly: true,
                        }}
                        onChange={(text) =>
                          setx({
                            ...x,
                            court_id: text.target.value,
                          })
                        }
                      />
                    </div>
                    <br></br>
                    <div>
                      <TextField
                        label="Name"
                        value={x.court_name}
                        onChange={(text) =>
                          setx({
                            ...x,
                            court_name: text.target.value,
                          })
                        }
                      />
                    </div>
                    <br></br>
                    <div>
                      <TextField
                        label="Address"
                        value={x.court_address}
                        onChange={(text) =>
                          setx({
                            ...x,
                            court_address: text.target.value,
                          })
                        }
                      />
                    </div>
                    <br></br>

                    <div>
                      <TextField
                        label="TYPE"
                        value={x.court_type}
                        onChange={(text) =>
                          setx({
                            ...x,
                            court_type: text.target.value,
                          })
                        }
                      />
                    </div>
                    <br></br>

                    <div>
                      <TextField
                        label="Password"
                        value={x.court_pwd}
                        onChange={(text) =>
                          setx({
                            ...x,
                            court_pwd: text.target.value,
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
                      <Button
                        color="secondary"
                        onClick={() => Handler()}
                      >
                        CLOSE <br /> <CloseIcon />
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
