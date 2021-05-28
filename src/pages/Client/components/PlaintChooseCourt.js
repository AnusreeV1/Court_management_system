import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Box } from "@material-ui/core";
import { Button } from "@material-ui/core";
import FilePlaintModal from "./FilePlaintModal";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { file_case } from "../../../redux/Action";

export default function CustomizedTables() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [courtrows, setcourtRows] = useState([]);
  const [type, settype] = useState("");
  const updateCourt = (courtid) => dispatch(file_case({ court_id: courtid }));
  const findCourtbasedonTYPE = (t) => {
    settype(t);
    axios
      .post("/client/findCourt", { type: t })
      .then((res) => setcourtRows(res.data));
  };
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Court Type </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          onChange={(e) => findCourtbasedonTYPE(e.target.value)}
        >
          <MenuItem value={"Civil Court"}>Civil Court</MenuItem>
          <MenuItem value={"Criminal Court"}>Criminal Court</MenuItem>
          <MenuItem value={"High Court"}>High Court</MenuItem>
        </Select>
      </FormControl>
      <br></br>
      <br></br>

      {courtrows.length != 0 && (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">COURT ID</StyledTableCell>

                <StyledTableCell align="center">COURT NAME</StyledTableCell>
                <StyledTableCell align="center">ADDRESS </StyledTableCell>
                <StyledTableCell align="center">TYPE </StyledTableCell>
                <StyledTableCell align="center"> </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courtrows.map((row) => (
                <StyledTableRow key={row.court_id}>
                  <StyledTableCell align="center">
                    {row.court_id}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.court_name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.court_address}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.court_type}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    <Button
                      color="secondary"
                      onClick={() => updateCourt(row.court_id)}
                    >
                      SELECT
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  formControl: {
    minWidth: 220,
  },
});
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
