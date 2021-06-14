import React, { Fragment, useEffect, useState } from 'react';
import './Manuals.css'
import { Grid, Card, CardContent, Button, makeStyles, Typography, Container, TextField } from '@material-ui/core';
import { db } from '../../firebase';
import { firebaseLooper } from '../../utils/tools';
import ContentDashboardLayout from '../../components/ContentSidebar/ContentDashboardLayout';
import ManualItem from './ManualItem';
import Page from '../../components/Page';


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
     padding: '20px',
      flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
    },
}));

export default function Manuals({match}) {
    const classes = useStyles()
    const [manuals, setManuals] = useState([])
    const [title, setTitle] = useState('')
    const [mTitle, setMTitle] = useState('')
    useEffect(() => {
      db.collection('machineData')
       .doc(match.params.id)
        .onSnapshot(doc => {
         setMTitle(doc.data().title)
        })
        db.collection('manualData').where('mid', '==', `${match.params.id}`).onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setManuals(data)
        })
    },[])



  return (
    <Page title='Manuals | LyoIms'>
        <ContentDashboardLayout match={match}/>
        <Container maxWidth={false} className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.content}>
            <Typography variant='h4' align='left'><b>{mTitle}</b></Typography>
              <Typography variant='h1' align='center'><b>Manuals Data</b></Typography>
               <Typography variant='body2' align='center' gutterBottom >These are all your Manuals</Typography>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
               
                 <div className="relative"> 
                 
                 <input style={{ border: '2px solid whitesmoke'}} onChange={(e) => setTitle(e.target.value)} type="text" className="h-14 w-96 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none" placeholder="Search Manuals..."/>
                  <div className="absolute top-4 right-3"> <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i> </div>
              </div>
               <Button href={`/machine-data/${match.params.id}/Add-Manuals`}  style={{width: '10%', marginLeft: '4%', marginRight: '3%',color: 'white', backgroundColor: 'orange'}}>Add Manuals</Button>
              </div>
            <br/>
            
            <Grid container spacing={3}>
                <>
                     {
                        manuals.
                          filter((data) => {
                              if(title === ""){
                                  return data
                              } else if (data.title.toLowerCase().includes(title.toLocaleLowerCase())){
                                      return data
                             }
                             else if (data.desc.toLowerCase().includes(title.toLocaleLowerCase())){
                               return data
                             }
                             return data 
                            })
                        .map((data) => (
                          <ManualItem key={data.id} data={data}/>
                        ))
                        
                }
                </>
                </Grid>
          </div>
        </div>
        
      </Container> 
     
    </Page>

  );
}