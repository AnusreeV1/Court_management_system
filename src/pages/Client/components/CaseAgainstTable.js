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
import { useSelector } from "react-redux";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import AboutClient from "../../AboutClient";
export default function CustomizedTables() {
  const classes = useStyles();
  const C_id = useSelector((state) => state.Reducer.clientId);
  const [caseIdforFindlawyer, setFindlawyerForCase] = useState(false);
  const [rows, setrows] = useState([]);
  const [type, setType] = useState("");
  const [lawyermodalopen, setlawyermodal] = useState(false);
  const [courtmodalopen, setcourtmodal] = useState(false);
  const [lawyerid, setlawyerid] = useState("");
  const [courtid, setCourtid] = useState("");
  const [clientmodal, setclientmodal] = useState(false);
  const [clientid, setclientid] = useState("");
  const [caseIdforPayFEE, setCaseidforPayfee] = useState(false);

  const payFeefunction = (id) => {
    axios
      .post("/client/def_pay_fees", {
        case_id: id,
        client_id: C_id,
      })
      .then((res) => setCaseidforPayfee(res.data));
  };
  const ClientModalHandler = () => {
    setclientmodal((state) => !state);
  };
  const sendLawyerRequest = (id) => {
    console.log(id);
    console.log(caseIdforFindlawyer);
    console.log(C_id);
    axios
      .post("/client/def_request_lawyer", {
        case_id: caseIdforFindlawyer,
        lawyer_id: id,
        client_id: C_id,
      })
      .then((res) => setFindlawyerForCase(false));
  };
  const findlawyer = () => {
    axios
      .post("/client/def_get_lawyers", { case_id: caseIdforFindlawyer })
      .then((res) => setlawyerRows(res.data));
  };
  const [lawyerRows, setlawyerRows] = useState([]);

  useEffect(() => {
    const f = () => {
      console.log("F");
      const url = "/client/cases_against";
      axios
        .post(url, { client_id: C_id })
        .then((res) => {
          // console.log(res.data);
          setrows(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    f();
  }, [caseIdforFindlawyer, caseIdforPayFEE]);

  return (
    <Box>
      <Paper className={classes.paper}>
        <Box align="center">
          <h1>CASES AGAINST </h1>
        </Box>
      </Paper>
      <TableContainer component={Paper}>
        {rows.length != 0 && (
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">CASE ID </StyledTableCell>
                <StyledTableCell align="center">CASE TITLE</StyledTableCell>
                <StyledTableCell align="center">
                  CASE DESCRIPTION
                </StyledTableCell>
                <StyledTableCell align="center">
                  ABOUT PROCECUTOR{" "}
                </StyledTableCell>
                <StyledTableCell align="center">{""} </StyledTableCell>
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
                        setclientmodal(true);
                        setclientid(row.client_id);
                      }}
                    >
                      {" "}
                      CLICK HERE{" "}
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <div>
                      {row.def_fees_paid ? (
                        <Button variant="outlined" color="primary" disabled>
                          FEES PAID{" "}
                        </Button>
                      ) : (
                        <div>
                          {row.def_lawyer_req_accept ? (
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={() => {
                                setCaseidforPayfee(row.case_id);
                                payFeefunction(row.case_id);
                              }}
                            >
                              PAY FEE
                            </Button>
                          ) : (
                            <div>
                              {row.def_lawyer_req_send ? (
                                <Button variant="outlined" color="primary">
                                  REQUEST PENDING{" "}
                                </Button>
                              ) : (
                                <Button
                                  variant="outlined"
                                  color="primary"
                                  onClick={() => {
                                    setFindlawyerForCase(row.case_id);
                                    findlawyer();
                                  }}
                                >
                                  Find Lawyer
                                </Button>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      <div>
        <br></br>
        <br></br>
        {caseIdforFindlawyer && (
          <div>
            {lawyerRows.length != 0 && (
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">
                        LAWYER ID
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        LAWYER NAME
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        MOBILE NO.{" "}
                      </StyledTableCell>
                      <StyledTableCell align="center">EMAIL </StyledTableCell>
                      <StyledTableCell align="center">
                        CASES WON{" "}
                      </StyledTableCell>
                      <StyledTableCell align="center"> </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {lawyerRows.map((lawyerRows) => (
                      <StyledTableRow key={lawyerRows.lawyer_id}>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          align="center"
                        >
                          {lawyerRows.lawyer_id}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {lawyerRows.lawyer_name}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {lawyerRows.mobile_no}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {lawyerRows.email}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {lawyerRows.cases_won}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                              sendLawyerRequest(lawyerRows.lawyer_id);
                            }}
                          >
                            Send Request{" "}
                          </Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </div>
        )}
      </div>

      {clientmodal && (
        <AboutClient
          open={clientmodal}
          Handler={() => ClientModalHandler()}
          id={clientid}
        />
      )}
    </Box>
  );
}
const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  formControl: {
    minWidth: 120,
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
