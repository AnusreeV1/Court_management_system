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
import axios from "axios";
import { useSelector } from "react-redux";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {useRef} from 'react';
import { PassThrough } from "stream";
import AboutLawyer from "../../AboutLawyer";
import AboutCourt from "../../AboutCourt";
import AboutJudge from "../../AboutJudge";
import AboutClient from "../../AboutClient";
import AboutCase from "../../AboutCase";

//var changed=true;
export default function CustomizedTables({ value }) {
    console.log("Open Hearing table for Admin");
    
    const A_id = useSelector((state) => state.Reducer.adminId);
    const [rows, setrows] = useState([]);
    const [changed,setchanged] = useState(false);
    const [feesVerified,setFeesVerified] = useState(false);
    const [verified,setVerified] = useState(false);
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
    const casemodalHandler = () => {
      setcasemodal((state) => !state);
    };
  
  
    const useStyles = makeStyles({
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
        const verifyFees =(row)=>{
          axios.post("/admin/update_client_fees_status",{
            case_id:row.case_id,
            court_id:row.court_id,
            client_id:row.client_id,
          }).then((res) => {
            console.log(res.data);
            setFeesVerified(true);
            console.log(changed);
            
            
        });
        }
        const verify =(row,status)=>{
          axios.post("/admin/verify",{
            case_id:row.case_id,
            court_id:row.court_id,
            client_id:row.client_id,
            status:status
          }).then((res) => {
            console.log(res.data);
            setVerified(true);
            console.log(changed);
            
            
        });
        }
        const notverify =(row,status)=>{
          axios.post("/admin/notVerify",{
            case_id:row.case_id,
            court_id:row.court_id,
            client_id:row.client_id,
            case_title:row.case_title,
            case_desc:row.case_desc,
            case_type:row.case_type,
            status:status
          }).then((res) => {
            console.log(res.data);
            setVerified(true);
            console.log(changed);
            
            
        });
        }

    
      
      
      useEffect(() => {
        console.log("FUNCTION");
        //const plaintList = () => {
           // if(changed){
          axios
            .post("/admin/cases", { court_id: A_id })
            .then((response) => {
              console.log(response.data);
              setrows(response.data);
            });
            //changed=false;
       // };
           // }
      },[changed,feesVerified,verified]);
    
    
      const renderVerification_Status=(verification,row)=>{
            if(verification==1){
                return (
                    <p>Verified</p>
                )
            }
            else if(verification==0){
                return(
                    <p>Not Verified</p>
                )
            }
           
            

      }

      const classes = useStyles();
      return(
        <Box>
        <Paper className={classes.paper}>
          <Box align="center">
            <h1>CASES</h1>
          </Box>
        </Paper>
        <br></br>
        <br></br>
        {rows.length != 0 && (
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">CASE ID</StyledTableCell>
                    <StyledTableCell align="center">CLIENT DETAILS</StyledTableCell>
                    <StyledTableCell align="center">CASE DETAILS</StyledTableCell>
                    <StyledTableCell align="center">
                      VERIFICATION STATUS{" "}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      FEES STATUS
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      CASE STATUS
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.case_id}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {row.case_id}
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
                      Client Details{" "}
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
                          {row.verification !=null ? (
                          PassThrough
                        ) : (
                            <div>
                            <Button variant="outlined" color="primary" onClick={()=>{
                                verify(row,1);
                            }}>
                            VERIFY
                        </Button>
                    <Button variant="outlined" color="secondary" onClick={()=>{
                        notverify(row,0);
                    }}>
                          DENY
                        </Button>
                        </div>
                        )}
                        {renderVerification_Status(row.verification,row)} 
                      </StyledTableCell>
                      <StyledTableCell align="center" disabled={row.verification_status==1?0:1}>
                        {row.fee_status!=1?
                        <Button variant="outlined" color="primary" disabled={row.fees_paid==1?0:1} onClick={()=>{
                          verifyFees(row);
                      }}>
                      Verify Fees
                  </Button> : 
                  
                  <p>Verified</p>
                  
                  };
                      
                      </StyledTableCell>
                      <StyledTableCell align="center" >
                        {row.case_status==null?
                        <p>Yet to be assigned</p>:
                        <p>{row.case_status}</p>}
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
      Handler={() => casemodalHandler()}
      caseid={caseid}
      casemodal={casemodalopen}
    />
  )}
        </Box>
      
)

}