import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import PaperTabs from "./PaperTabs";
export default function SimpleModal({ Handler, open }) {
  const classes = useStyles();
  return (
    <div>
      <Modal
        open={open}
        onClose={Handler}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div>
          <PaperTabs classes={useStyles.paper} x={() => Handler()} />
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
}));
