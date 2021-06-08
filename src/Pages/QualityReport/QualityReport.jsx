
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { db } from '../../firebase';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { CSVLink } from "react-csv";
import { firebaseLooper } from '../../utils/tools';
import DashboardNavbar from './DashboardNavbar'
import { Button, ButtonBase, Card, Dialog, TableHead, Toolbar, Typography } from '@material-ui/core';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import ClearIcon from '@material-ui/icons/Clear';
import BugReportIcon from '@material-ui/icons/BugReport';
import UpdateIcon from '@material-ui/icons/Update';
import { useHistory } from 'react-router-dom';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; 
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import Page from '../../components/Page';


const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  

  return (
   
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const useStyles = makeStyles((theme) => ({
  layoutRoot: {
    backgroundColor: 'white',
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
     background:'linear-gradient(#f3f3f3, #e7e7e7)' 
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#141256',
  },
 wrapper: {
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 0
  },
   
  },
  container: {
      display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
  },
  content: {
     
      flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
    },
    table: {
    minWidth: 500,
  },
}));


export default function QualityReport({match}) {
  const history = useHistory()
  const classes = useStyles();
  const [mTitle, setMTitle] = useState('')
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [issuecomment, setIssueComment] = useState('')
  const [open, setOpen] = useState(false)
    const [dq, setDq] = useState([])
    useEffect(() => {
       db.collection('DQReport')
       .doc(match.params.id)
        .onSnapshot(doc => {
         setMTitle(doc.data().title)
        })
        db.collection('DQReportData').where('module_id', '==', `${match.params.id}`).onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setDq(data)
            console.log(data)
        })
    },[])
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, dq.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const responseform = (response) => {
    if(response===0){
        return(<b style={{color: 'orangered'}}><UpdateIcon/>Not Updated</b>)
    }
    if(response===1){
        return(<b style={{color: '#29bb89'}}><DoneAllIcon/>Accepted</b>)
    }
    if(response===2){
        return(<b style={{color: 'red'}}><ClearIcon/>Rejected</b>)
    }
    if(response===3){
        return(<b style={{color: '#3c415c'}}><BugReportIcon/>Issued</b>)
    }
  }


  function handleReturn(){
    history.go(-1)
  }

  const headers = [
  { label: "Title", key: "title" },
  { label: "Value", key: "value" },
  { label: "Response", key: "response" }
];

function printDocument() {  
    const input = document.getElementById('pdfdiv');  
    html2canvas(input)  
      .then((canvas) => {  
        var imgWidth = 200;  
        var pageHeight = 290;  
        var imgHeight = canvas.height * imgWidth / canvas.width;  
        var heightLeft = imgHeight;  
        const imgData = canvas.toDataURL('image/png');  
        const pdf = new jsPDF('p', 'in', [612, 792]) 
        var position = 0;  
        var heightLeft = imgHeight;  
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);  
        pdf.save("dqReportx.pdf");  
      });  
  }
  function handleComment(id){
   
    db.collection('issueData').doc(id).onSnapshot(snapshot => {
     const data = snapshot.data()
     setIssueComment(data.content )
    })

}

function handleOpen(){
  setOpen(true)
}
function handleClose(){
  setOpen(false)
}
  return (
 <Page title='Quality Report | LyoIms'>

          <>
      <DashboardNavbar/>
     
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
            <br/>
             <Button
          onClick={handleReturn}
          style={{backgroundImage: "linear-gradient(to left bottom, #a39df3, #8885e8, #6b6fdd, #4859d1, #0144c6)", color: "white", width: "150px"}}
          startIcon={<KeyboardReturnIcon/>}
            variant="contained"
          >
            Return
          </Button>
              <div>
              <Typography align='center' variant='h1'><b>DQ Data</b></Typography>
               <Typography align='center' variant='body2' >These are all your Required Data</Typography>
              </div>
              <br/>
              <div style={{display: 'flex', justifyContent: 'flex-end'}}>
               
                 <Button startIcon={<CloudDownloadIcon/>} style={{backgroundImage: "linear-gradient(to left bottom, #a39df3, #8885e8, #6b6fdd, #4859d1, #0144c6)", color: 'white', marginRight: '3%'}}>
             <CSVLink
              data={dq}
              headers={headers}
              filename={"DQReport.csv"}
              style={{ textDecoration: 'none', color: 'white'}}
              target="_blank"
            >
              Export
            </CSVLink>
          </Button>
         
          <Button startIcon={<PictureAsPdfIcon/>} style={{backgroundImage: "linear-gradient(to right top, #f91c1c, #dc1e20, #be2022, #a12122, #852121)", color: 'white'}} onClick={printDocument} variant="contained">  
            Generate Pdf  
           </Button>  
              </div>
                    <TableContainer id='pdfdiv' component={Paper}>
      <Table id='pdfdiv' className={classes.table} aria-label="custom pagination table">
         <TableHead>
            <Typography variant='h4' align='left' gutterBottom><b>{mTitle}</b></Typography>
          <TableRow>
            <TableCell style={{backgroundColor: '#d8e3e7'}}><b>Title</b></TableCell>
            <TableCell style={{backgroundColor: '#d8e3e7'}} align="left"><b>Value</b></TableCell>
            <TableCell style={{backgroundColor: '#d8e3e7'}} align="right"><b>Response</b></TableCell>
           
           
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? dq.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : dq
          ).map((row) => (
            <TableRow key={row.name}>
              <TableCell style={{width: 160, backgroundColor: '#e8ffff'}} component="th" scope="row">
                <b>{row.title}</b>
              </TableCell>
              <TableCell style={{ width: 200 }} align="left">
                {row.value}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {responseform(row.response)}
              </TableCell>
               <TableCell style={{ width: 160 }} align="right">
                {row.issue_id != ""? <button onClick={(e) => {
                  handleOpen(e);
                  handleComment(row.issue_id)
                }}>Check</button> : <p>N/A</p>}
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
      <TableFooter>
        
           
          <TableRow >
            
            <TablePagination
              rowsPerPageOptions={[10, 20, 30, { label: 'All', value: -1 }]}
              colSpan={3}
              count={dq.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
          </Card>
        </div>
      </div>
    <Dialog fullWidth onClose={handleClose} open={open}>
      <Toolbar>
        <Button onClick={handleClose}>Close</Button>
      </Toolbar>
              <b className='text-xl underline text-bold text-center mb-3'>Comment</b>
              <p className='text-xl text-blue-gray-500 text-center'>{issuecomment}</p>
    </Dialog>
    </>
    </Page>
  );
}

