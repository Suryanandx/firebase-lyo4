import { Button, Card, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import StepItem from './StepItem';
import {Link, useHistory} from 'react-router-dom';
import {db, storageRef } from '../../firebase'
import { firebaseLooper } from '../../utils/tools';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Page from '../../components/Page';
import ManualDashboardLayout from '../../components/ManualSidebar/ManualDashboardLayout'
import OutlinedTimeline from './Timeline';

const useStyles = makeStyles((theme) =>( {
    add: {
     
    background:'#ff7a00',
    borderRadius: '20px',
    margin: theme.spacing(3, 0, 2),
 
    },
    backButton: {
        backgroundColor: "black",
        color: "white",
        borderRadius: "20px",
        marginRight: "30px",
        marginLeft: "20px",
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
}))


const Steps = ({match}) => {
    const classes = useStyles();
    const history=useHistory()
    const [steps, setSteps] = useState([{}])

    const handleReturn = () => {
        history.push('/machine-data')
    }
    useEffect(() => {
        
        db.collection('stepData').where('manual_id', '==', `${match.params.id}`).onSnapshot((snapshot) => {
            const stepData = firebaseLooper(snapshot)
            setSteps(stepData)
            
        })

    }, [steps])
    
  

    return (
        <Page title="Steps">
            <ManualDashboardLayout match={match}/>
           
            <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
        <Button startIcon={<ArrowBackIcon/>} onClick={handleReturn} variant="contained" className={classes.backButton} >Machines</Button>
        <Button
        startIcon={<AddIcon/>} 
        variant="contained"
        color="primary" className={classes.add}>
        <Link style={{color: "white" ,textDecoration: "none"}} to={`/Manuals/${match.params.id}/Add-Step`}>
                Add Step
        </Link>
        </Button>
            
                {steps&&
                    steps.map((data) => (
                        <StepItem key={data.id} data={data} />
                        
                    ))
                   
                }
        
              
       
          </Card>
        </div>
      </div>
           
        </Page>
    )
}

export default Steps