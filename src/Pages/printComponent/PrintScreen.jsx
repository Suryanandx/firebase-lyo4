
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
import ApprovalPrint from '../Approval/ApprovalPrint';
import DQRpurpose from '../DQNewReports/DQRpurpose';
import PurposePrint from '../DQNewReports/PurposePrint';
import GeneralPrint from '../DQNewReports/GeneralPrint';



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



export default function PrintScreen({match}) {
  const classes = useStyles();
  const [title, setTitle] = useState('')
   const [mTitle, setMTitle] = useState('')
  const [open, setOpen] = useState(false)
  const [batch, setBatch] = useState([])
  useEffect(() => {
    
  }, [])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Page title='Print Reports | LyoIms'>

     
      <div >
        <div >
          <Card >
            <div style={{height: '150vh'}} >
                <ApprovalPrint match={match}/>
            </div>
            <br />
           
             <PurposePrint match={match}/>
           
           <GeneralPrint match={match}/>
          </Card>
        </div>
      </div>
    </Page>
   
  )
}
