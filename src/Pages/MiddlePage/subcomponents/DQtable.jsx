import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { db } from '../../../firebase';
import { firebaseLooper } from '../../../utils/tools';
import { Button, Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, InputLabel, Select, TablePagination, TextField, Typography } from '@material-ui/core';
import StepDashboardLayout from '../../../components/StepSidebar/StepDashboardLayout'
import TestData from '../../../Pages/Tests/TestData'
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



export default function DQtable() {
  const classes = useStyles();
  const [recipeeData, setRecipeeData] = useState([])
  const [open, setOpen] = useState(false)

  const [title, setTitle] = useState("")
  
  
  
  useEffect(() => {
     
    db.collection('DQReport').onSnapshot(doc => {
      const data = firebaseLooper(doc)
      console.log(data)
      setRecipeeData(data)
    })
    
  }, [])
    



  return (
    <div>
      <div >
        <div >
          <Card className={classes.content}>
            <h1>{title}</h1>
               <TableContainer component={Paper}>
      <Table aria-label="simple table">
         <div style={{display: 'flex', justifyContent: 'flex-end'}}>
               
                 <div className="relative"> 
                
                  {/* <input style={{ border: '2px solid whitesmoke'}} onChange={(e) => setTitle(e.target.value)} type="text" className="h-14 w-96 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none" placeholder="Search..."/> */}
                
              </div>
              </div>
        <TableBody>
          {recipeeData && 
          recipeeData
           . filter((row) => {
                              
                                if(title === null || title === ""){
                                  return row
                              } else if (row.title.toLowerCase().includes(title.toLocaleLowerCase())){
                                      return row
                             }
                             else if (row.desc.toLowerCase().includes(title.toLocaleLowerCase())){
                               return row
                             }
                           
                             return row 
                            })
        .map((row) => (
          <TableRow key={row.id}>
               <TableCell>  <a style={{color: 'orange'}} href={`/DQ/${row.id}`}>{row.title}</a></TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>
      
      
    </TableContainer>
          </Card>
        </div>
      </div>
    </div>
   
  )
}
