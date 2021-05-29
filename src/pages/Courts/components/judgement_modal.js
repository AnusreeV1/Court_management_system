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
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import CloseIcon from '@material-ui/icons/Close';
export default function SimpleModal({ Handler, open, case_details}) {
  console.log("EDIT INFO PAGE");
  const [judgement,setJudgement]=useState();
  const [wonLID,setWinner]=useState();
  //   console.log(x);
  const handleSubmit=(row)=>{
    axios.post("/admin/updateJudgement",{
    "case_id":case_details.case_id,"judgement":judgement,"winner":wonLID,"client_id":case_details.client_id,"lawyer_id":case_details.lawyer_id,"def_client_id":case_details.def_id,"def_lawyer_id":case_details.def_lawyer_id,"court_id":case_details.court_id,"judge_id":case_details.judge_id,}
    )
    //setchanged(true);

}

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
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <h1>
                      <p> JUDGEMENT</p>
                    </h1>
                    <div>
                      <TextareaAutosize aria-label="minimum height" rowsMin={3}
                        label="Judgement"
                        placeholder="Judgement"
                        onChange={(e) =>
                          setJudgement(
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <br></br>
                    <div>
                      <TextField
                        label="Won Lawyer id:"
                        onChange={(e) =>
                          setWinner(
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <br></br>
                  </Grid>

                  <Grid item>
                    <Typography variant="body2" style={{ cursor: "pointer" }}>
                      <Button
                        color="secondary"
                        onClick={() => handleSubmit()}
                      >
                        GIVE JUDGEMENT <br/>
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
    width: 200,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  paper: {
    marginTop: 200,
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
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
