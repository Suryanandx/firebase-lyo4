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
import { Button, Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TablePagination, TextField, Typography } from '@material-ui/core';
import StepDashboardLayout from '../../../components/StepSidebar/StepDashboardLayout'
import TestData from '../../../Pages/Tests/TestData'
import { NavLink } from 'react-router-dom';
import { Alert } from '@material-ui/lab';
import DateRangeIcon from '@material-ui/icons/DateRange';
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
  const [machines, setMachines] = useState([])
  const [title, setTitle] = useState("")
  
  
  
  useEffect(() => {
     db.collection("machineData").onSnapshot(snap => {
      const data = firebaseLooper(snap)
      setMachines(data)   
    })
    db.collection('DQNewReport').onSnapshot(doc => {
      const data = firebaseLooper(doc)
      console.log(data)
      setRecipeeData(data)
    })
    
  }, [])
    
function handleChange(e){
  const rep = e.target.value
  db.collection('DQNewReport')
  .where('mid', '==', rep)
  .onSnapshot(doc => {
    const data = firebaseLooper(doc)
    console.log(data)
    setRecipeeData(data)
  })
}


  return (
    <div>
       <FormControl variant='outlined' fullWidth  >
      <InputLabel>Select</InputLabel>
      <Select  onChange={handleChange} label="Select">
        {machines.map(data => (
          <MenuItem key={data.id} value={data.id}>{data.title}</MenuItem>
        ))
          
        }
        
      </Select>
    </FormControl>
    <Alert severity='info'>Select Machine to sort by Machines</Alert>
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
        <div style={{width: '100%', display: 'flex', justifyContent: 'space-evenly'}}>
           <NavLink className='text-md text-gray-800 hover:text-gray-600'  to={`/DQR/${row.id}/Approval`}>{row.name}</NavLink>
           <Typography variant='body2' align='left' className='text-sm text-gray-800 hover:text-gray-600'><DateRangeIcon style={{width: '15px'}} />{row.timestamp.toDate().toString().substring(0,15)}</Typography>
        </div>
       
 
    ))}
    </div>
     
  )
}
