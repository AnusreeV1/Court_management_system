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
import { PassThrough } from "stream";
import AboutCase from "../../AboutCase";
import AboutClient from '../../AboutClient';

export default function CustomizedTables() {
  //const classes = useStyles();
  const L_id = useSelector((state) => state.Reducer.lawyerId);
  const [rows, setrows] = useState([]);
  const [drows, setdrows] = useState([]);
  const [c, setc] = useState(false);
  const [caseid, setcaseid] = useState("");
  const [casemodal, setcasemodal] = useState(false);
  const [clientid, setclientid] = useState("");
  const [clientmodal, setclientmodal] = useState(false);

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
      axios.post("/lawyer/fetch_plaint_request_lawyer", {lawyer_id: L_id}).then((response) => {
        console.log(response.data);
        setrows(response.data);
      });
      axios.post("/lawyer/fetch_def_plaint_request_lawyer", {lawyer_id: L_id}).then((response) => {
        console.log(response.data);
        setdrows(response.data);
      });
  },[c]);

  const casemodalHandler = () => {
    setcasemodal((state) => !state);
  };

  const clientmodalHandler = () => {
    setclientmodal((state) => !state);
  };

  const accept = (case_id,client_id) => {
    axios.post("/lawyer/accept_plaint_request",{
        lawyer_id : L_id,
        case_id: case_id,
        client_id: client_id,
    }).then((res) => {
        console.log(res.data);
  });
}
const reject = (case_id,client_id) => {
    axios.post("/lawyer/reject_plaint_request",{
        lawyer_id : L_id,
        case_id: case_id,
        client_id: client_id,
    }).then((res) => {
        console.log(res.data);
  });
}
const defaccept = (case_id,client_id) => {
    axios.post("/lawyer/accept_def_request",{
        lawyer_id : L_id,
        case_id: case_id,
        def_id: client_id,
    }).then((res) => {
        console.log(res.data);
  });
}
const defreject = (case_id,client_id) => {
    axios.post("/lawyer/reject_deft_request",{
        lawyer_id : L_id,
        case_id: case_id,
        def_id: client_id,
    }).then((res) => {
        console.log(res.data);
  });
}
const acceptance_status=(s,row)=>{
    if(s==1){
        return (<p>Accepted</p>)
    }
    else if(s==0){
        return(<p>Rejected</p>)
    }
}

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
  {clientmodal && (
    <AboutClient
      Handler={() => clientmodalHandler()}
      open={clientmodal}
      id={clientid}
    />
  )}
        <Paper className={classes.paper}>
          <Box align="center">
            <h1>CLIENT REQUESTS</h1>
          </Box>
        </Paper>
       {rows.length == 0 && (
         <Paper className={classes.paper}>
         <Box align="center">
           <h2>No requests</h2>
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
            <StyledTableCell align="center">COURT ID</StyledTableCell>
            <StyledTableCell align="center">CLIENT ID</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
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
              <StyledTableCell align="center">{row.court_id}</StyledTableCell>
              <StyledTableCell align="center">{row.client_id}</StyledTableCell>
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
                      clientmodalHandler();
                      setclientid(row.client_id);
                  }}
              >
                Client details
              </Button>
              </StyledTableCell>
              <StyledTableCell align="center">
              {row.lawyer_req_accept == 0 ? (
              <div>
              <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                      accept(row.case_id,row.client_id);
                      setc(true);
                      //acceptance_status(row.lawyer_req_accept);
                  }}
              >
                Accept
              </Button>&nbsp;
              <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                      reject(row.case_id,row.client_id);
                      setc(true);
                      //acceptance_status(row.lawyer_req_accept);
                  }}
              >
                Reject
              </Button>
              </div>
              ):(row.lawyer_id != L_id ? (PassThrough) : (<p>Accepted</p>))}
              
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>)}
              <br></br>
        <Paper className={classes.paper}>
          <Box align="center">
            <h1>CLIENT REQUESTS (AS DEFENDANT LAWYER)</h1>
          </Box>
        </Paper>
        {drows.length == 0 && (
         <Paper className={classes.paper}>
         <Box align="center">
           <h2>No requests</h2>
         </Box>
       </Paper>
       )}
       
    {drows.length != 0 && (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">CASE ID</StyledTableCell>
            <StyledTableCell align="center">CASE TITLE</StyledTableCell>
            <StyledTableCell align="center">COURT ID</StyledTableCell>
            <StyledTableCell align="center">CLIENT ID</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {drows.map((row) => (
            <StyledTableRow key={row.case_id}>
             {/* <StyledTableCell component="th" scope="row">
                {row.case_id}
              </StyledTableCell>  */}
              <StyledTableCell align="center">{row.case_id}</StyledTableCell>
              <StyledTableCell align="center">{row.case_title}</StyledTableCell>
              <StyledTableCell align="center">{row.court_id}</StyledTableCell>
              <StyledTableCell align="center">{row.def_client_id}</StyledTableCell>
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
                      clientmodalHandler();
                      setclientid(row.client_id);
                  }}
              >
                Client details
              </Button>
              </StyledTableCell>
              <StyledTableCell align="center">
              <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    defaccept(row.case_id,row.def_id);
                  }}
              >
                Accept
              </Button>&nbsp;
              <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    defreject(row.case_id,row.def_id);
                  }}
              >
                Reject
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
