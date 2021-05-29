import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./PaymentCheckoutForm";


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

const promise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

export default function Payment({ Handler, open, caseid, clientid }) {

  const classes = useStyles();
  //const [modalStyle] = useState(getModalStyle);

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
            
          <div>
      <Elements stripe={promise}>
        <CheckoutForm 
          caseid={caseid}
          clientid={clientid}
          />
      </Elements>
      <Grid item>
                    <Typography variant="body2" style={{ cursor: "pointer" }}>
                      <Button color="secondary" onClick={() => Handler()}>
                        CLOSE <br />
                      </Button>
                    </Typography>
                  </Grid>
    </div>   
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
    maxWidth: 500,
    height:200,
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

