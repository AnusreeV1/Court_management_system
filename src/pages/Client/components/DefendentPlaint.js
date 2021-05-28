import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from "react-redux";
import { file_case } from "../../../redux/Action";

const ChooseCourt = () => {
  const cid = useSelector((state) => state.Reducer.clientId);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");

  const dispatch = useDispatch();
  const updateDef = () =>
    dispatch(
      file_case({
        def_client_name: name,
        def_client_email: email,
        client_id: cid,
      })
    );

  return (
    <Box>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Defendent Name"
        autoFocus
        onChange={(e) => {
          setname(e.target.value);
        }}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Defendent Email"
        onChange={(e) => setemail(e.target.value)}
      />
      <br></br>
      <br></br>

      <Button fullWidth color="secondary" onClick={() => updateDef()}>
        Update{" "}
      </Button>
    </Box>
  );
};

export default ChooseCourt;
