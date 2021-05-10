
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
    
      flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
    },
}));



export default function BatchInfo({match}) {
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
    db.collection('batchReport').where('machine_id', '==', `${match.params.id}`).onSnapshot(doc => {
      const data = firebaseLooper(doc)
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
    <Paper>

      <ContentDashboardLayout match={match}/>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
             <Typography variant='h4' align='left'><b>{mTitle}</b></Typography>
            <Typography variant='h3' align='center'><b>Batch Report</b></Typography>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
               <div className="relative"> 
                 <input style={{ border: '2px solid whitesmoke'}} onChange={(e) => setTitle(e.target.value)} type="text" className="h-14 w-96 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none" placeholder="Search Batch..."/>
                  <div className="absolute top-4 right-3"> <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i> </div>
              </div>
              </div>
              <br/>
               <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{backgroundColor: '#d8e3e7'}}><b>Manual</b></TableCell>
            <TableCell style={{backgroundColor: '#d8e3e7'}} align="left"><b>User</b></TableCell>
            <TableCell style={{backgroundColor: '#d8e3e7'}} align="left"><b>Date & Time</b></TableCell>
            <TableCell style={{backgroundColor: '#d8e3e7'}} align="left"><b>Image</b></TableCell>
          
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
              }
             
            })
          .map((row) => (
            <TableRow key={row.id}>
              <TableCell style={{backgroundColor: 'whitesmoke'}} component="th" scope="row">
                {row.manual_name}
              </TableCell>
              <TableCell align="left">{row.user_id}</TableCell>
              <TableCell align="left">{row.time}</TableCell>
              <TableCell align="right"><img src={row.url} width={450} height={250}/></TableCell>
              
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
    </Paper>
   
  )
}
