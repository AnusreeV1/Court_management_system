import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button, Box } from "@material-ui/core";
import AboutCase from "../../AboutCase";
export default function CustomizedTables() {
  const classes = useStyles();
  const C_id = useSelector((state) => state.Reducer.clientId);
  const [rows, setrows] = useState([]);
  const [defrows, setdefrows] = useState([]);

  const [caseid, setcaseid] = useState("");
  const [casemodal, setcasemodal] = useState(false);

  const casemodalHandler = () => {
    setcasemodal((state) => !state);
  };

  useEffect(() => {
    const f = () => {
      console.log("F");
      const url = "/client/CExpiredCasesAsClient";
      axios
        .post(url, { client_id: C_id })
        .then((res) => {
          // console.log(res.data);
          setrows(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      axios
        .post("/client/CexpiredCasesAsDef", { client_id: C_id })
        .then((res) => {
          // console.log(res.data);
          setdefrows(res.data);
        });
    };
    f();
  }, []);
  return (
    <div>
      <Paper className={classes.paper}>
        <Box align="center">
          <h1>EXPIRED CASES </h1>
        </Box>
      </Paper>
      {defrows.length != 0 && (
        <div>
          <Box align="center">
            <h2>CASES AS DEFENDENT </h2>
          </Box>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">CASE ID </StyledTableCell>

                  <StyledTableCell align="center">
                    CASE DESCRIPTION
                  </StyledTableCell>
                  <StyledTableCell align="center">ABOUT CASE </StyledTableCell>
                  <StyledTableCell align="center">STATUS</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {defrows.map((row) => (
                  <StyledTableRow key={row.case_id}>
                    <StyledTableCell align="center">
                      {row.case_id}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.case_desc}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      <Button
                        variant={"outlined"}
                        color={"secondary"}
                        onClick={() => {
                          setcaseid(row.case_id);

                          setcasemodal(true);
                        }}
                      >
                        CLICK HERE{" "}
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="center">EXPIRED </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
      <div>
        {rows.length != 0 && (
          <div>
            {" "}
            <Box align="center">
              <h2>CASES AS CLIENT </h2>
            </Box>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">CASE ID </StyledTableCell>

                    <StyledTableCell align="center">
                      CASE DESCRIPTION
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      ABOUT CASE{" "}
                    </StyledTableCell>
                    <StyledTableCell align="center">STATUS</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.case_id}>
                      <StyledTableCell align="center">
                        {row.case_id}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.case_desc}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        <Button
                          variant={"outlined"}
                          color={"secondary"}
                          onClick={() => {
                            setcaseid(row.case_id);

                            setcasemodal(true);
                          }}
                        >
                          CLICK HERE{" "}
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell align="center">EXPIRED </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
      {casemodal && (
        <AboutCase
          Handler={() => casemodalHandler()}
          caseid={caseid}
          casemodal={casemodal}
        />
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
