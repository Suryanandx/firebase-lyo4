import React, { Fragment, useEffect, useState } from 'react';

import { Grid, Card, CardContent, Button, makeStyles, Typography, Container } from '@material-ui/core';
import { db } from '../../firebase';
import { firebaseLooper } from '../../utils/tools';
import ContentDashboardLayout from '../../components/ContentSidebar/ContentDashboardLayout';
import ManualItem from './ManualItem';


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

export default function Manuals({match}) {
    const classes = useStyles()
    const [manuals, setManuals] = useState([])
    useEffect(() => {
        db.collection('manualData').where('mid', '==', `${match.params.id}`).onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setManuals(data)
        })
    },[])

 

  return (
    <>
        <ContentDashboardLayout match={match}/>
        <Container maxWidth={false} className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.content}>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>
              <Typography variant='h1'><b>Manuals Data</b></Typography>
               <Typography variant='caption' >These are all your Manuals</Typography>
              </div>
              <Button href={`/machine-data/${match.params.id}/Add-Manuals`} color='primary' style={{width: '15%'}}>Add Manuals</Button>
              </div>
            
            
            
            <Grid container spacing={3}>
                <>
                     {
                        manuals.map((data) => (
                          <ManualItem key={data.id} data={data}/>
                        ))
                        
                }
                </>
                </Grid>
          </div>
        </div>
        
      </Container> 
     
    </>
  );
}