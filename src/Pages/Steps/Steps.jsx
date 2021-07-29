import { Button, Card, Container, makeStyles, Switch, Typography } from '@material-ui/core';
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
import StepCarousel from './StepCarousel';
import Carousel from 'react-bootstrap/Carousel'
const useStyles = makeStyles((theme) =>( {
    add: {
     
    backgroundImage: 'linear-gradient(to left bottom, #fa630f, #fc8218, #fd9d29, #feb63f, #ffce59)',
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
     padding: '20px',
      flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
    },
}))


const Steps = ({match}) => {
    const classes = useStyles();
    const history=useHistory()
     const [mTitle, setMTitle] = useState('')
    const [steps, setSteps] = useState([{}])
    const [checked, setChecked] = useState(true)
    const dbRef =   db.collection('stepData').where('manual_id', '==', `${match.params.id}`)

    const handleReturn = () => {
        history.push('/machine-data')
    }
    useEffect(() => {

         db.collection('manualData')
       .doc(match.params.id)
        .onSnapshot(doc => {
         setMTitle(doc.data().title)
        })
        
      dbRef.onSnapshot((snapshot) => {
            const stepData = firebaseLooper(snapshot)
            stepData.sort(function(a,b) {
                return(a.index-b.index)
            })
            setSteps(stepData)
            
        })

    }, [])
    


    return (
        <Page title="Steps">
            <ManualDashboardLayout match={match}/>
           
            <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
            
                
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography variant='h4' align='center' gutterBottom><b>{mTitle}</b></Typography>
                    <div>
                         <b>SWITCH MODE</b>
                    <Switch onChange={(e) => setChecked(!checked)} checked={checked} color='primary'/> 
                    </div>
                   
                </div>
             
              { 
              checked? 
              <Container>
                  {
                   steps&&
                    steps.map((data) => (
                        <StepItem key={data.id} data={data} />
                        
                    ))
                  
                }  
               </Container>
               :

               <Carousel 
              nextIcon ={<span className=" flex items-center w-full px-6 py-2 font-semibold text-white transition duration-500 ease-in-out transform bg-black rounded-lg lg:w-auto  focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 ">Next</span>}
               prevIcon={<span  className="flex items-center w-full px-6 py-2 font-semibold text-white transition duration-500 ease-in-out transform bg-black rounded-lg lg:w-auto  focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2">Prev</span>}
               >
               {
                   steps.map((data) => (
                      
                        <Carousel.Item   style={{height: '80vh', width: '75%', marginLeft: '14%'}}>
                             <>
        <div style={{backgroundColor: 'black', opacity: 0.5}}>
             <Typography variant='h3' align='center' style={{color: 'orange'}}><b>{data.title}</b></Typography>
      <Typography variant='body1' align='center' style={{color: 'orange'}}>{data.desc}</Typography>
        </div>
     
    </>
   { data.format === 'image'?
   <img
   style={{width: '100%', height: '75vh'}}
      src={data.url}
      alt="First slide"
    />
    :
    data.format === 'video'?
    <div>
       <video
    style={{width: '100%', height: '75vh'}}
   
    controls
      src={data.url}
      alt="First slide"
    />
    </div>
   
    :  data.format === 'audio'?
    
        <audio style={{ margin: '30%', marginTop: '5%', marginBottom: '20%'}}  controls src={data.url}/>
   
    : <b>Not Available</b>
    }
   
  </Carousel.Item>
  
 
                   ))
               }

  
</Carousel>
              }

     
                
          </Card>
         
        </div>
      </div>
           
        </Page>
    )
}

export default Steps