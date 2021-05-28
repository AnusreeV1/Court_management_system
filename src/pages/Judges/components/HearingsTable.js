import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button } from "@material-ui/core";
import AboutCase from "../../AboutCase";
export default function CustomizedTables() {
  const classes = useStyles();
  const J_id = useSelector((state) => state.Reducer.judgeId);
  console.log(J_id);
  const [rows, setrows] = useState([]);
  const [caseid, setcaseid] = useState("");
  const casemodalHandler = () => setcasemodal((state) => !state);
  const [casemodal, setcasemodal] = useState(false);

  useEffect(() => {
    const Hearinglist = () => {
      axios.post("/judge/hearing", { judge_id: J_id }).then((response) => {
        // console.log(response.data);
        setrows(response.data);
      });
    };
    Hearinglist();
  }, []);
  return (
    <div>
      {casemodal && (
        <AboutCase
          Handler={() => casemodalHandler()}
          caseid={caseid}
          casemodal={casemodal}
        />
      )}
      {rows.length != 0 ? (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">CASE ID </StyledTableCell>

                <StyledTableCell align="center">CASE TITLE </StyledTableCell>
                <StyledTableCell align="center">
                  CASE DESCRIPTION{" "}
                </StyledTableCell>
                <StyledTableCell align="center">ABOUT CASE </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.case_id}>
                  <StyledTableCell align="center">
                    {row.case_id}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.case_title}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.case_desc}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        setcaseid(row.case_id);

                        setcasemodal(true);
                      }}
                    >
                      Case Details{" "}
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <h1>NO HEARINGS </h1>
      )}
    </div>
  );
}
const useStyles = makeStyles({
  table: {
    minWidth: 700,
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
