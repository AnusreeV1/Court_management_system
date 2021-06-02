import React, { useEffect, useState } from "react";
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
import { Box } from "@material-ui/core";
import { Button } from "@material-ui/core";
import AboutCase from "../../AboutCase";
import AssignJudgesList from './AssignJudgesList';

export default function CustomizedTables() {
  //const classes = useStyles();
  const A_id = useSelector((state) => state.Reducer.adminId);
  const [rows, setrows] = useState([]);
  const [caseid, setcaseid] = useState("");
  const [casemodal, setcasemodal] = useState(false);
  const [judgesModal, setjudgesModal] = useState(false);
  const [clientid,setclientid] = useState();
  const [c,setc] = useState(false);

  const useStyles = makeStyles({
    table: {
      minWidth:700,
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

  useEffect(() => {
    //console.log(L_id);
      axios.post("/court/judgeAssign", {court_id: A_id}).then((response) => {
        console.log(response.data);
        setrows(response.data);
      });
  },[judgesModal]);

  const casemodalHandler = () => {
    setcasemodal((state) => !state);
  };
  const listJudge = () => {
    setjudgesModal((state) => !state);
  };

//   const meritStatus = (status) => {
//     if(status == 1)
//       return(<p>Merited</p>)
//     else if(status == 0)
//       return(<p>Demerited</p>)
//     else
//       return(<p>Pending</p>)
//   }

  const classes = useStyles();
  return (
      <Box>
        {casemodal && (
    <AboutCase
      Handler={() => casemodalHandler()}
      caseid={caseid}
      casemodal={casemodal}
    />
  )}
  {judgesModal && (
    <AssignJudgesList
      Handler={() => listJudge()}
      caseid={caseid}
      clientid={clientid}
      judgesModal={judgesModal}
    />
  )}
        <Paper className={classes.paper}>
          <Box align="center">
            <h1>CASES</h1>
          </Box>
        </Paper>
        {rows.length == 0 && (
          <Paper className={classes.paper}>
          <Box align="center">
            <h2>No cases</h2>
          </Box>
        </Paper>
        )}
    {rows.length != 0 && (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">CASE ID</StyledTableCell>
            <StyledTableCell align="center">CASE TITLE</StyledTableCell>
            <StyledTableCell align="center">CLIENT ID</StyledTableCell>
            <StyledTableCell align="center">CASE STATUS</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.case_id}>
             {/* <StyledTableCell component="th" scope="row">
                {row.case_id}
              </StyledTableCell>  */}
              <StyledTableCell align="center">{row.case_id}</StyledTableCell>
              <StyledTableCell align="center">{row.case_title}</StyledTableCell>
              <StyledTableCell align="center">{row.client_id}</StyledTableCell>
              <StyledTableCell align="center">{row.case_status}</StyledTableCell>
              <StyledTableCell align="center">
              <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    casemodalHandler();
                    setcaseid(row.case_id);
                }}
              >
                Case details
              </Button>
              </StyledTableCell>
              <StyledTableCell align="center">
              <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    listJudge();
                    setcaseid(row.case_id);
                    setclientid(row.client_id);
                    setc(true);
                    
                }}
              >
                Assign judge
              </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>)}
    </Box>
  )
}
