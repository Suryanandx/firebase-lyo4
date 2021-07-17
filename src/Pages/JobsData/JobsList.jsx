import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { db } from '../../firebase';
import { firebaseLooper } from '../../utils/tools';
import ContentDashboardLayout from '../../components/ContentSidebar/ContentDashboardLayout';
import { Card, Checkbox, TextField, Typography, Button } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import DatePicker, { CalendarContainer } from "react-datepicker";
import Page from '../../components/Page';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  wrapper: {
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 256
  },
   
  },
  container: {
      display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
  },
  content: {
     padding: '20px',
      flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
    },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}



export default function JobsList({match}) {

     const [job, setJob] = useState([])
     const [mTitle, setMTitle] = useState('')
     const [date, setDate] = useState('')
     const [title, setTitle] = useState('')
    useEffect(() => {
      db.collection('machineData')
       .doc(match.params.id)
        .onSnapshot(doc => {
         setMTitle(doc.data().title)
        })
        db.collection('jobData').where('mid', '==', `${match.params.id}`).onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setJob(data)
        })
    }, [])
  const classes = useStyles();

  const handleChangeDate = (e) => {
     
    const jobDate = e.target.value
    db.collection('jobData').where('mid', '==', `${match.params.id}`)
    .where('date', '==', `${jobDate}`).onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setJob(data)
        })
  }

  const handleClick = () => {
    db.collection('jobData').where('mid', '==', `${match.params.id}`).onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setJob(data)
        })
  }
  
  return (
      <Page title='Jobs | LyoIms'>
      <ContentDashboardLayout match={match}/>
       <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
            
            <div>
              <Typography align='center' variant='h1'><b>Jobs</b></Typography>
               <Typography align='center' variant='body2' >- These are all the Job status -</Typography>
              </div>
              <br/>
              <div style={{display: 'flex', justifyContent: 'space-evenly', marginBottom: '30px'}}>
              <div className="relative mr-2"> 
                 <input style={{ border: '2px solid whitesmoke'}} onChange={(e) => setTitle(e.target.value)} type="text" className="h-14 w-96 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none" placeholder="Search Jobs..."/>
                  <div className="absolute top-4 right-3"> <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i> </div>
              </div>
                 <TextField
                id="date"
                label="Select Date"
                type="date"
            
                onChange={handleChangeDate}
                InputLabelProps={{
                  shrink: true,
                }}
              />
             <Button onClick={handleClick}>Reset</Button>
              
               
                
              </div>
           
                 <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
                 <Typography className='ml-2' variant='h5' align='left' gutterBottom><b>{mTitle}</b></Typography>
          <TableRow>  
            <TableCell  style={{backgroundColor: '#d8e3e7'}}><b>Title</b></TableCell>
            <TableCell style={{backgroundColor: '#d8e3e7'}} align="center"><b>Description</b></TableCell>
            <TableCell   style={{backgroundColor: '#d8e3e7'}} align="right"><b>Status</b></TableCell>
            <TableCell  style={{backgroundColor: '#d8e3e7'}} align="right"><b>Date</b></TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {job.filter((row) => {
            if(title === "" ){
              return row
            } else if (row.title.toLowerCase().includes(title.toLocaleLowerCase())){
              return row
            }
          }).map((row) => (
            <TableRow key={row.id}>

              <TableCell style={{width: 160, backgroundColor: '#e8ffff'}} component="th" scope="row">
               <b> {row.title}</b>
              </TableCell>
              <TableCell align="center">{row.desc}</TableCell>
              <TableCell align="right">{row.status ?
               <b style={{color: '#9ede73', display: 'flex', justifyContent: 'flex-end'}}><DoneIcon style={{color: '#9ede73'}}/>Completed</b> :
               <b style={{color: 'orange', display: 'flex', justifyContent: 'flex-end'}}><ErrorOutlineIcon style={{color: '#ff7a00d'}}/> Pending</b>}
               </TableCell>
               <TableCell align="right">{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          </Card>
        </div>
      </div> 
   
    </Page>
  );
}