import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { Button, Card, Container, Dialog, Grid, InputLabel, Select, TablePagination, TextField, Typography } from '@material-ui/core';
 import ContentDashboardLayout from '../../components/ContentSidebar/ContentDashboardLayout';
import { db } from '../../firebase';
import { firebaseLooper } from '../../utils/tools';
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



export default function CallLogs({match}) {
  const classes = useStyles();
  const [title, setTitle] = useState('')
  const [mTitle, setMTitle] = useState('')
  const [open, setOpen] = useState(false)
  const [batch, setBatch] = useState([])
  useEffect(() => {
     db.collection('machineData')
       .doc(match.params.id)
        .onSnapshot(doc => {
         setMTitle(doc.data().title)
        })
    db.collection('CallLogData').where('machine_id', '==', `${match.params.id}`).onSnapshot(doc => {
      const data = firebaseLooper(doc)
      data.sort(function(a,b){
        return(b.time - a.time)
      })
       setBatch(data)
     console.log(data)
    })
    
  }, [])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Page title='Call Logs | LyoIms'>
  
      <ContentDashboardLayout match={match}/>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
            <Typography variant='h4' align='left'><b>{mTitle}</b></Typography>
            <Typography variant='h1' align='center'><b>Call Logs</b></Typography>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              <TextField onChange={(e) => setTitle(e.target.value)}  label="Search Call Logs.." variant="outlined" />
              </div>
              <br/>
               <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><b>Manual</b></TableCell>
            <TableCell align="right"><b>User</b></TableCell>
            
            <TableCell align="right"><b>Step</b></TableCell>
           <TableCell align="right"><b>Date & Time</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {batch.
          filter((data) => {
              if(title === ""){
                  return data
              } else if (data.manual_name.toLowerCase().includes(title.toLocaleLowerCase())){
                      return data
              }else if (data.user_id.toLowerCase().includes(title.toLocaleLowerCase())){
                      return data
              }else if (data.step.toLowerCase().includes(title.toLocaleLowerCase())){
                      return data
              }
            
            })
          .map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.manual_name}
              </TableCell>
              <TableCell align="right">{row.user_id}</TableCell>
              <TableCell align="right">{row.step}</TableCell>
              <TableCell align="right">{row.time.toDate().toString().substring(0,15)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
         
         
      </div>
      <div style={{width: '100%'}}>
           
      </div>
    </TableContainer>
          </Card>
        </div>
      </div>
    </Page>
   
  )
}
