import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from "react-redux";
import { file_case } from "../../../redux/Action";
const CaseDetails = () => {
  // console.log("case Details");
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [casetype, setcasetype] = useState("");

  const dispatch = useDispatch();
  const updateCase = () =>
    dispatch(
      file_case({ case_title: title, case_desc: desc, case_type: casetype })
    );
  return (
    <Box>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Case Type"
        autoFocus
        onChange={(e) => {
          setcasetype(e.target.value);
        }}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Case Title"
        autoFocus
        onChange={(e) => {
          settitle(e.target.value);
        }}
      />
      <TextField
        multiline
        rows={5}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Case Details"
        onChange={(e) => {
          setdesc(e.target.value);
        }}
      />

      <Button fullWidth color="secondary" onClick={() => updateCase()}>
        Update{" "}
      </Button>
    </Box>
  );
};

export default CaseDetails;

// const f = () => {
//   return;
//   <p>ihuhuhuh</p>;
// };
// export default f;
