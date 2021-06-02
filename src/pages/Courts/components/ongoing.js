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
//import Modal from "@material-ui/core/Modal";
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
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
import JudgementModal from "../components/judgement_modal";


//var changed=true;
export default function CustomizedTables({ Handler, open }) {
    console.log("Open Hearing table for Admin");
    
    const A_id = useSelector((state) => state.Reducer.adminId);
    const [rows, setrows] = useState([]);
    const [changed,setchanged] = useState(false);
    const [isOpen,setOpen]=useState(false);
     const [judgement,setJudgement]=useState();
     const [wonLID,setWinner]=useState();
     const [case_details,setCaseDetails]=useState([]);
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
  
    const JudgementHandler = () =>{
      setOpen((state) => !state);
    }
  
     
    //const [feesVerified,setFeesVerified] = useState(false);
    const useStyles = makeStyles((theme)=>({
        paper: {
            position: "absolute",
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: "2px solid #000",
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
          },
        
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

     
    //  const handleSubmit=(row)=>{
    //      axios.post("/admin/updateJudgement",{
    //      "case_id":case_details.case_id,"judgement":judgement,"winner":wonLID,"client_id":case_details.client_id,"lawyer_id":case_details.lawyer_id,"def_client_id":case_details.def_id,"def_lawyer_id":case_details.def_lawyer_id,"court_id":case_details.court_id,"judge_id":case_details.judge_id,}
    //      )
    //      setchanged(true);

    //  }
     const openModel =()=>{
         setOpen(true);
     }
     const closeModel = ()=>{
         setOpen(false);
     }
    //  const GiveJudgement=()=>{
    //     return (
    //         <div>
    //                 <Modal 
    //                     show={isOpen} 
    //                     handleClose={e => closeModel()}
    //                     backdrop="static"
    //                 >
    //                     <Modal.Header closeButton>
    //                         <Modal.Title>Case Judgement</Modal.Title>
    //                     </Modal.Header>
    //                     <Modal.Body classes={useStyles.paper}>
    //                     <form className={classes.form} noValidate>
    //                             <TextField
    //                             variant="outlined"
    //                             margin="normal"
    //                             required
    //                             fullWidth
    //                             id="judgement"
    //                             label="Judgement"
    //                             name="judgement"
    //                             autoComplete="judgement"
    //                             value={judgement}
    //                             autoFocus
    //                             onChange={(e) => {
    //                                 setJudgement(e.target.value);
    //                             }}
                                
    //                             />
    //                             <TextField
    //                             variant="outlined"
    //                             margin="normal"
    //                             required
    //                             fullWidth
    //                             name="Winner"
    //                             label="won lawyer id"
    //                             type="text"
    //                             id="winner"
    //                             autoComplete="winner"
    //                             value={wonLID}
    //                             onChange={(e) => {
    //                                 setWinner(e.target.value);
    //                             }}
    //                             />
                                
    //                             <Button
    //                                 fullWidth
    //                                 variant="contained"
    //                                 color="primary"
    //                                 className={classes.submit}
    //                                 onClick={()=>{handleSubmit()}}
    //                             >
    //                                 Give judgement
    //                             </Button>
    //                         </form>
    //                     </Modal.Body>
    //                 </Modal>
    //         </div>
    //       );

    //  }

    
      
      
      useEffect(() => {
        console.log("FUNCTION");
          axios
            .post("/court/ongoing", { court_id: A_id })
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
            <h1>ONGOING CASES</h1>
          </Box>
        </Paper>
        <br></br>
        <br></br>
        {rows.length != 0 && (
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">CASE</StyledTableCell>
                    <StyledTableCell align="center">CLIENT</StyledTableCell>
                    <StyledTableCell align="center">
                      DEFENDANT
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      CLIENT LAWYER
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      DEFENDANT LAWYER
                    </StyledTableCell>
                    <StyledTableCell align="center">JUDGE</StyledTableCell>
                    <StyledTableCell align="center">
                      JUDGEMENT
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
                      <StyledTableCell align="center">
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
                      <Button variant="outlined" color="primary" onClick={()=>{
                           setCaseDetails(row);
                           console.log("hhhhhhh");
                          setOpen(true);
                          setchanged(true);
                          
                      }}>Give Judgement
                      </Button> 
                      </StyledTableCell>
                      
                      </StyledTableRow>
                  ))}
                      </TableBody>
                      </Table>
                      
                      </TableContainer>
                     
                      
                      
        )}
        {/* {isOpen?<GiveJudgement/>:null} */}
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
       {isOpen && (
        <JudgementModal
          Handler={JudgementHandler}
          open
          case_details={case_details}
        />
      )}

        </Box>
      
)

}