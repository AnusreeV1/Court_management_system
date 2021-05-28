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

export default function SimpleModal({ Handler, casemodal, caseid }) {

  console.log(caseid);
  const classes = useStyles();
  const [caseData, setcaseData] = useState(false);
  console.log(caseData);
  useEffect(() => {
    console.log("FUNCTION");
    const abtcase = () => {
      axios.post("/caseDetails", { case_id: caseid }).then((response) => {
        console.log(response.data[0]);
        setcaseData(response.data[0]);
      });
    };
    abtcase();
    return () => console.log("INFO UNMOUNTED");
  }, []);

  return (
    <div>
      <Modal
        open={casemodal}
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
                      {caseData.case_id ? (
                        <h3>
                          <p>CASE ID : {caseData.case_id}</p>
                        </h3>
                      ) : (
                        <h3>
                          <p>CASE ID : Not Available </p>
                        </h3>
                      )}
                      {caseData.case_title ? (
                        <h3>
                          <p>CASE TITLE : {caseData.case_title}</p>
                        </h3>
                      ) : (
                        <h3>
                          <p>CASE TITLE : Not Available </p>
                        </h3>
                      )}
                      {caseData.case_desc ? (
                        <h3>
                          <p>CASE DESCRIPTION : {caseData.case_desc}</p>
                        </h3>
                      ) : (
                        <h3>
                          <p>CASE DESCRIPTION : Not Available </p>
                        </h3>
                      )}
                      {caseData.client_id ? (
                        <h3>
                          <p>CLIENT ID : {caseData.client_id}</p>
                        </h3>
                      ) : (
                        <h3>
                          <p>CLIENT ID : Not Available </p>
                        </h3>
                      )}
                      {caseData.lawyer_id ? (
                        <h3>
                          <p>CLIENT LAWYER ID : {caseData.lawyer_id}</p>
                        </h3>
                      ) : (
                        <h3>
                          <p>CLIENT LAWYER ID : Not Available </p>
                        </h3>
                      )}
                      {caseData.court_id ? (
                        <h3>
                          <p>COURT ID : {caseData.court_id}</p>
                        </h3>
                      ) : (
                        <h3>
                          <p>COURT ID : Not Available </p>
                        </h3>
                      )}
                      {caseData.judge_id ? (
                        <h3>
                          <p>JUDGE ID : {caseData.judge_id}</p>
                        </h3>
                      ) : (
                        <h3>
                          <p>JUDGE ID : Not Available </p>
                        </h3>
                      )}
                      {caseData.def_id ? (
                        <h3>
                          <p>DEFENDER ID : {caseData.def_id}</p>
                        </h3>
                      ) : (
                        <h3>
                          <p>DEFENDER ID : Not Available </p>
                        </h3>
                      )}
                      {caseData.def_lawyer_id ? (
                        <h3>
                          <p>DEFENDER LAWYER ID : {caseData.def_lawyer_id}</p>
                        </h3>
                      ) : (
                        <h3>
                          <p>DEFENDER LAWYER ID : Not Available </p>
                        </h3>
                      )}
                      {caseData.case_status ? (
                        <h3>
                          <p>CASE STATUS : {caseData.case_status}</p>
                        </h3>
                      ) : (
                        <h3>
                          <p>CASE STATUS : Not Available </p>
                        </h3>
                      )}
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
    position: "relative",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  paper: {
    marginTop: 100,
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
