import { Helmet } from 'react-helmet';
import {
  Box,
  Button,
  Container,
  Fab,
  fade,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Typography
} from '@material-ui/core';
import { Redirect, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../components/context/AuthContext';
import ListMachines from './ListMachines';
import LineDemo from '../../components/LineDemo';
import ListUsers from './ListUsers';
import CustomerListView from '../../components/LogsData/Logs';
import LogsList from './LogsList';
import RecipeeList from './Graph/RecipeeList';
import JobGraph from './JobGraph';
import WorkFlow from './WorkFlow';
import MachineBox from './MachineBox';
import UsersBox from './UsersBox';
import JobsBox from './JobsBox';
import ManualBox from './ManualBox';
import { db } from '../.././firebase'
import { firebaseLooper } from '../.././utils/tools'
import TestData from '../Tests/TestData';
import GraphData from './Graph/GraphData';
import Skeleton from '@material-ui/lab/Skeleton';
import TestHome from '../Tests/TestHome';
import GraphDataRecipee from './Graph/GraphDataRecipee';
import TestGraph from '../../TestGraph/TestGraph';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import DQtable from './subcomponents/DQtable';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

 
const updateChart = (title) => {
      let gData = []
          
       console.log(gData)
        return(
          <TestData data={gData}/>
        )
      }

const MiddlePage = () =>{
 const dqOptions = []
 const options = []
 var x;
   const [rData, setRData] = useState([])
  const {currentUser} = useAuth()
   const [title, setTitle] = useState('')
   const [machines, setMachines] = useState([])
   const [users, setUsers] = useState([])
    const history = useHistory()

     
  useEffect(() => {
    db.collection('users').where('email', '==', `${currentUser.email}`).onSnapshot(doc => {
      const data = firebaseLooper(doc)
      
      setUsers(data)
    })
    db.collection('machineData').onSnapshot(doc => {
      const data = firebaseLooper(doc)
      console.log(data)
      for (var i = 0; i<data.length; i++){
        x = {value: data[i].id, label: data[i].title, trigger: '5'}
        options.push(x)
      }
      console.log(options)
    })
         db.collection('recipeeData').onSnapshot(doc => {
          const data = firebaseLooper(doc)
            setRData(data)
            
          })
      },[])

      const theme = {
  background: '#f5f8fb',
  fontFamily: 'Montserrat',
  headerBgColor: '#EF6C00',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#EF6C00',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

 function handleEnd({ steps, values }) {
    // console.log(steps);
    // console.log(values);
  history.push(`/machine-data/${values[1]}/DQ-New-Reports`)
  }

  const getOptions = (previousValue) => {
    db.collection('DQReport').where('mid', '==', `${previousValue}`).onSnapshot(doc => {
      const data = firebaseLooper(doc)
      console.log(data)
      for(var i = 0; i<data.length; i++){
        const x = {value: data[i].id, label: data[i].title, trigger: '5'}
        dqOptions.push(x)
      }

    })
    return dqOptions
  }
   
    return (
      <Paper className='bg-gray-200'>
    <Helmet>
      <title>Dashboard | LyoIMS</title>
    </Helmet>
    <Box
    className='bg-gray-50'
    py={3}
      style={{
        backgroundColor: 'background.default',
        minHeight: '100%',
      }}
    >
      <Container className='bg-gray-50' maxWidth={false}>
        <Typography variant='h2' align='left' gutterBottom><b style={{font: 'var(--unnamed-font-style-normal) normal 600 34px/46px Montserrat', color: '#43425D'}}>Welcome to the Dashboard</b></Typography>
        <Typography style={{font: 'var(--unnamed-font-style-normal) normal medium 23px/25px var(--unnamed-font-family-roboto)', color: '#43425D', marginBottom: '3%'}}  variant='caption' align='left'>Here's an overview of the available data</Typography>
       <br />
        <Grid
          container
          spacing={3}
          className='bg-grey-100'
        >
          <Grid
          style={{height: '100%'}}
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
            className='bg-grey-100'
          >
            <MachineBox />
            {/*  */}
          </Grid>
          <Grid
          style={{height: '100%'}}
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
            className='bg-grey-100'
          >
            <UsersBox/>
          </Grid>
          <Grid
          style={{height: '100%'}}
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
            className='bg-grey-100'
          >
           <JobsBox/>
          </Grid>
          <Grid
         className='bg-grey-100'
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <ManualBox/>
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
            className='bg-grey-100'
          >
        
       <TestGraph/>
            
           {/* <GraphDataRecipee data={gData}/> */}
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
            className='bg-grey-100'
          >  
         
           <JobGraph/>
            
          </Grid>
           <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
            className='bg-grey-100'
          >
            {/* <WorkFlow/> */}
            <LogsList/>
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
            className='bg-grey-100'
          >

         <ListUsers style={{height: "100%"}}/>
          </Grid>
         
        </Grid>
      </Container>
      <ThemeProvider theme={theme}>
        <ChatBot
   handleEnd={handleEnd}
     floating={true}
  headerTitle="Arizon Chatbot"
  speechSynthesis={{ enable: true, lang: 'en' }}
  steps={[
    {
      id: '1',
      message: `Hi, What Activity would you like to execute?`,
      trigger: '2',
    },
   {
        id: '2',
         options: [
              { value: 'machine-data', label: 'Machines', trigger: '3' },
              { value: 'Reports', label: 'Download Reports', trigger: '4' },
            ],
        trigger: '3'
      },
   {
        id: '3',
        options: options,
      
      },
      {
        id: '4',
       component: <DQtable/>,
       asMessage: false
      
      },
      {
        id: '5',
       message: 'Redirecting to Reports Page ',
        trigger: '6'
      },
      {
        id: '6',
       message: 'Thanks',
        end: true
      },
     
  ]}
/>
      </ThemeProvider>
     
    </Box>
  </Paper>
    )
}

export default MiddlePage
