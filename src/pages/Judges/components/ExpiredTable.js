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
import AboutLawyer from "../../AboutLawyer";
import AboutCourt from "../../AboutCourt";
import AboutJudge from "../../AboutJudge";
import AboutCase from "../../AboutCase";
import AboutClient from "../../AboutClient";

export default function CustomizedTables() {
  const classes = useStyles();
  const J_id = useSelector((state) => state.Reducer.judgeId);
  console.log(J_id);
  const [rows, setrows] = useState([]);
  const [lawyermodalopen, setlawyermodal] = useState(false);
  const [courtmodalopen, setcourtmodal] = useState(false);
  const [judgemodalopen, setjudgemodal] = useState(false);
  const [casemodal, setcasemodal] = useState(false);
  const [clientmodal, setclientmodal] = useState(false);
  const [clientid, setclientid] = useState("");
  const [lawyerid, setlawyerid] = useState("");
  const [courtid, setCourtid] = useState("");
  const [judgeid, setjudgeid] = useState("");
  const [caseid, setcaseid] = useState("");
  const ClientModalHandler = () => setclientmodal((state) => !state);
  const casemodalHandler = () => setcasemodal((state) => !state);
  const JudgemodalHandler = () => setjudgemodal((state) => !state);
  const CourtModalHandler = () => setcourtmodal((state) => !state);
  const LawyerModalHandler = () => setlawyermodal((state) => !state);

  useEffect(() => {
    const Expiredlist = () => {
      axios.post("/judge/expired", { judge_id: J_id }).then((response) => {
        // console.log(response.data);
        setrows(response.data);
      });
    };
    Expiredlist();
  }, []);
  return (
    <div>
      {lawyermodalopen && (
        <AboutLawyer
          Handler={LawyerModalHandler}
          lawyermodalopen
          lawyerid={lawyerid}
        />
      )}
      {clientmodal && (
        <AboutClient
          open={clientmodal}
          Handler={() => ClientModalHandler()}
          id={clientid}
        />
      )}
      {judgemodalopen && (
        <AboutJudge
          Handler={JudgemodalHandler}
          judgemodal={judgemodalopen}
          judgeid={judgeid}
        />
      )}
      {courtmodalopen && (
        <AboutCourt
          Handler={CourtModalHandler}
          courtmodalopen
          courtid={courtid}
        />
      )}

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

                <StyledTableCell align="center">ABOUT CLIENT</StyledTableCell>
                <StyledTableCell align="center">
                  ABOUT DEFENDENT{" "}
                </StyledTableCell>
                <StyledTableCell align="center">CLIENT LAWYER</StyledTableCell>
                <StyledTableCell align="center">
                  DEFENDENT LAWYER
                </StyledTableCell>
                <StyledTableCell align="center">ABOUT COURT </StyledTableCell>

                <StyledTableCell align="center">ABOUT CASE </StyledTableCell>
                <StyledTableCell align="center">JUDGEMENT </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.case_id}>
                  <StyledTableCell align="center">
                    {row.case_id}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        setclientmodal(true);
                        setclientid(row.client_id);
                      }}
                    >
                      {" "}
                      CLICK HERE{" "}
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        setclientmodal(true);
                        setclientid(row.def_client_id);
                      }}
                    >
                      {" "}
                      CLICK HERE{" "}
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        setlawyerid(row.lawyer_id);

                        setlawyermodal(true);
                      }}
                    >
                      Lawyer Details{" "}
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        setlawyerid(row.def_lawyer_id);

                        setlawyermodal(true);
                      }}
                    >
                      Lawyer Details{" "}
                    </Button>
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        setCourtid(row.court_id);

                        setcourtmodal(true);
                      }}
                    >
                      Court Details{" "}
                    </Button>
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
                  <StyledTableCell align="center">
                    {row.judgement}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <h1>NO EXPIRED CASES </h1>
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
