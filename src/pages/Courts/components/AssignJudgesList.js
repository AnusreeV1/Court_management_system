import Modal from "@material-ui/core/Modal";
import React, { useEffect, useState } from "react";
//import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { withStyles, makeStyles } from "@material-ui/core/styles";

export default function SimpleModal({ Handler, caseid,clientid, judgesModal }) {

  //console.log(caseid);
  const classes = useStyles();
  const [rows, setrows] = useState([]);
  //const [c,setc] = useState(false);
  //console.log(caseData);

  useEffect(() => {
    //console.log("FUNCTION");
    //const abtcase = () => {
      axios.post("/judgelist").then((response) => {
        console.log(response.data);
        setrows(response.data);
      });
    // };
    // abtcase();
    // return () => console.log("INFO UNMOUNTED");
  }, []);

  const assign = (judge_id) => {
    console.log(clientid);
    axios.post("/admin/judgeAssign",{judge_id:judge_id,case_id:caseid,client_id:clientid}).then((response) => {
        console.log(response.data);
      });
  }

  return (
    <div>
      <Modal
        open={judgesModal}
        // onClose={Handler}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        
        <div className={classes.root}>
          <Paper className={classes.paper}>
        {rows.length != 0 && (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">JUDGE ID</StyledTableCell>
            <StyledTableCell align="center">JUDGE NAME</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.judge_id}>
             {/* <StyledTableCell component="th" scope="row">
                {row.case_id}
              </StyledTableCell>  */}
              <StyledTableCell align="center">{row.judge_id}</StyledTableCell>
              <StyledTableCell align="center">{row.judge_name}</StyledTableCell>
              <StyledTableCell align="center">
              <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    assign(row.judge_id);
                    Handler();
                    //setc(true);
                    //setcaseid(row.case_id);
                }}
              >
                Assign
              </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>)}
    <Grid item>
                    <Typography variant="body2" style={{ cursor: "pointer" }}>
                      <Button color="secondary" onClick={() => Handler()}>
                        CLOSE <br />
                      </Button>
                    </Typography>
                  </Grid>
                <Grid item>
                  <Typography variant="subtitle1"></Typography>
                </Grid>
          </Paper>
        </div>
    </Modal>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth:700,
      },
  paper: {
    position: "relative",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  paper: {
    marginTop: 100,
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 1000,
  },
  image: {
    width: 500,
    height: 500,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
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
