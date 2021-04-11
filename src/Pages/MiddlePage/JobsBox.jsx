import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import PeopleIcon from '@material-ui/icons/People';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import WorkIcon from '@material-ui/icons/Work';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { firebaseLooper } from '../../utils/tools'
import LinearProgress from '@material-ui/core/LinearProgress';
import LinearIndeterminate from './LinearInderminate';

const JobsBox = (props) =>{ 
    
    const [jobs, setJobs] = useState([])
    useEffect(() => {
        db.collection('jobData').where('status', '==', false).onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setJobs(data)
        })
    }, [])
    return (
    
  <Card {...props}>
    <CardContent>
      <Grid
        container
        spacing={3}
        style={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="h6"
          >
            TOTAL JOBS
          </Typography>
          <Typography
            color="textPrimary"
            variant="h3"
          >
            {jobs.length}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            style={{
              backgroundColor: orange[600],
              height: 56,
              width: 56
            }}
          >
            <WorkIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        style={{
          alignItems: 'center',
          display: 'flex',
          pt: 2
        }}
      >
        <InsertChartIcon/>
        <Typography
          variant="body2"
          style={{
            color: orange[900],
            mr: 1
          }}
        >
        Pending Jobs
       
        </Typography>
      
         
      </Box>
      <LinearIndeterminate/>
    </CardContent>
  </Card>
);
}
export default JobsBox;