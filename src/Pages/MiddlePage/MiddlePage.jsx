import { Helmet } from 'react-helmet';
import {
  Box,
  Button,
  Container,
  fade,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import { useHistory } from 'react-router';
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

const MiddlePage = () =>{
  const rid = '3W4hP5zaRRkyQfsbCAop'
   const [rData, setRData] = useState([])
    const history = useHistory()
  useEffect(() => {
          db.collection('recipeeData').where('rid', '==', rid).get().then(doc => {
              const data = firebaseLooper(doc)
            setRData(data)
            console.log(data)
            
          })
      },[rData.length])

    return (
      <>
    <Helmet>
      <title>Dashboard | LyoIMS</title>
    </Helmet>
    <Box
    py={3}
      style={{
        backgroundColor: 'background.default',
        minHeight: '100%',
      }}
    >
      <Container maxWidth={false}>
        
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <div>
                      <Typography variant='h1'><b>Good Morning!</b></Typography>
              <Typography variant='h5'>Here's an overview of the available data!</Typography>
                  </div>
                  </div>
                  <br/>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <MachineBox/>
            {/*  */}
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <UsersBox/>
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
           <JobsBox/>
          </Grid>
          <Grid
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
          >
            <div>
              {/* <GraphData data={rData} /> */}
              {/* <RecipeeList/> */}
                <Skeleton variant="circle" width={40} height={40} />
              <Skeleton variant="rect" style={{width: '100%'}} height={360} />
            </div>
           
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >  
          
          <JobGraph/>
           
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
         {/* <ListMachines style={{height: "100%"}}/> > */}
           <ListUsers style={{height: "100%"}}/>
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <WorkFlow/>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
    )
}

export default MiddlePage
