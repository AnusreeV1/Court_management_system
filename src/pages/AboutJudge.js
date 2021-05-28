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
export default function SimpleModal({ Handler, judgemodal, judgeid }) {
  console.log(judgeid);
  const classes = useStyles();
  const [judgedata, setjudgedata] = useState(false);
  console.log(judgedata);
  useEffect(() => {
    console.log("FUNCTION");
    const abtjudge = () => {
      axios.post("/judgeDetails", { judge_id: judgeid }).then((response) => {
        console.log(response.data[0]);
        setjudgedata(Object.entries(response.data[0]));
      });
    };
    abtjudge();
    return () => console.log("INFO UNMOUNTED");
  }, []);
  return (
    <div>
      <Modal
        open={judgemodal}
        // onClose={Handler}
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
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzO5WKCL7gjXubvLgHa0hOw6QNlZr8efwiE_WzUv7k4TTkfaadkoTVPaT9XSVMWrIiAaY&usqp=CAU"
                  />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <div>
                      <h1>
                        <p> CASE DETAILS </p>
                      </h1>
                      {judgedata &&
                        judgedata.map((item, index) => (
                          <div key={index}>
                            {item[0] != "judge_pwd" && (
                              <h3 >
                                <br></br>
                                <br></br>
                                <p>
                                  {item[0]} : {item[1]}
                                </p>
                              </h3>
                            )}
                          </div>
                        ))}
                    </div>
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
                  <Typography variant="subtitle1"></Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </Modal>
    </div>
  );
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
