import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
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
import axios from "axios";
import { useSelector } from "react-redux";
import AboutLawyer from "../../AboutLawyer";
import AboutCourt from "../../AboutCourt";
import AboutJudge from "../../AboutJudge";
import AboutClient from "../../AboutClient";
import AboutCase from "../../AboutCase";


//var changed=true;
export default function CustomizedTables({ Handler, open }) {
    console.log("Open Hearing table for Admin");
    
    const A_id = useSelector((state) => state.Reducer.adminId);
    const [rows, setrows] = useState([]);
    const [changed,setChanged] = useState(false);
    const [lawyermodalopen, setlawyermodal] = useState(false);
    const [courtmodalopen, setcourtmodal] = useState(false);
    const [judgemodalopen, setjudgemodal] = useState(false);
    const [clientmodalopen,setclientmodal] = useState(false);
    const [casemodalopen,setcasemodal] = useState(false);

    const [clientid, setclientid] = useState("");
    const [lawyerid, setlawyerid] = useState("");
    const [courtid, setCourtid] = useState("");
    const [judgeid, setjudgeid] = useState("");
    const [caseid, setcaseid] = useState("");

    const JudgemodalHandler = () => {
      setjudgemodal((state) => !state);
    };
    const CourtModalHandler = () => {
      setcourtmodal((state) => !state);
    };
    const LawyerModalHandler = () => {
      setlawyermodal((state) => !state);
    };
    const ClientModalHandler = () => {
      setclientmodal((state) => !state);
    };
    const CaseModalHandler = () => {
      setcasemodal((state) => !state);
    };
  
    const useStyles = makeStyles((theme)=>({ 
        table: {
          minWidth: 700,
        },
        paper: {
          margin: "auto",
          // maxWidth: 1000,
        },
        formControl: {
          minWidth: 120,
        },
        Button:{
            padding: 15,
        },
        selectEmpty: {},
        
      }));
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
        console.log("FUNCTION");
          axios
            .post("/court/expired", { court_id: A_id })
            .then((response) => {
              console.log(response.data);
              setrows(response.data);
            });
      },[changed]);
    
      const classes = useStyles();
      return(
        <Box>
        <Paper className={classes.paper}>
          <Box align="center">
            <h1>EXPIRED CASES</h1>
          </Box>
        </Paper>
        <br></br>
        <br></br>
        {rows.length != 0 && (
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">CASE DETAILS</StyledTableCell>
                    <StyledTableCell align="center">CLIENT DETAILS</StyledTableCell>
                    <StyledTableCell align="center">
                      DEFENDANT DETAILS
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      CLIENT LAWYER
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      DEFENDANT LAWYER
                    </StyledTableCell>
                    <StyledTableCell align="center">JUDGE DETAILS</StyledTableCell>
                    <StyledTableCell align="center">
                      JUDGEMENT
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      LAWYER WON DETAILS
                    </StyledTableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.case_id,row.client_id}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
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
                      <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        setclientid(row.client_id);

                        setclientmodal(true);
                      }}
                    >
                      Client Details{" "}
                    </Button>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        setclientid(row.def_id);

                        setclientmodal(true);
                      }}
                    >
                       Defendant Details{" "}
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
                       Plaint lawyer Details{" "}
                    </Button>
                      </StyledTableCell>
                      <StyledTableCell  align="center">
                      <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        setlawyerid(row.def_lawyer_id);

                        setlawyermodal(true);
                      }}
                    >
                       Defendant lawyer Details{" "}
                    </Button>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        setjudgeid(row.judge_id);

                        setjudgemodal(true);
                      }}
                    >
                       Judge Details{" "}
                    </Button>
                      </StyledTableCell>
                    
                      <StyledTableCell align="center">
                        {row.judgement}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        setlawyerid(row.winner);

                        setlawyermodal(true);
                      }}
                    >
                       Won lawyer details{" "}
                    </Button>
                    </StyledTableCell>
                      </StyledTableRow>
                  ))}
                      </TableBody>
                      </Table>
                      
                      </TableContainer>
                      
                     
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
      {lawyermodalopen && (
        <AboutLawyer
          Handler={LawyerModalHandler}
          lawyermodalopen
          lawyerid={lawyerid}
        />
      )}
      {clientmodalopen && (
        <AboutClient
          Handler={ClientModalHandler}
          open={clientmodalopen}
          id={clientid}
        />
      )}
       {casemodalopen && (
        <AboutCase
          Handler={CaseModalHandler}
          casemodel={casemodalopen}
          caseid={caseid}
        />
      )}
        </Box>
        
      
)

}