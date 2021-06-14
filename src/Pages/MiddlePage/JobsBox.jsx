import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Select,
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
import LaunchIcon from '@material-ui/icons/Launch';

const JobsBox = (props) =>{ 
    const [machines, setMachines] = useState([])
    const [jobs, setJobs] = useState([])
    const [dataId, setdataId] = useState('')
    const [disabled, setDisabled] = useState(true)
    useEffect(() => {
      db.collection('machineData').onSnapshot(doc => {
        const data = firebaseLooper(doc)
        setMachines(data)
      })
        db.collection('jobData').onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setJobs(data)
        })
    }, [])

    const handleChange = (e) => {
      setdataId(e.target.value)
      setDisabled(false)
    }
    return (
    
  <Card  style={{height: '130px'}} {...props}>
    <CardContent>
      
        <Grid
        container
        spacing={3}
        style={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <div style={{display: 'flex', jusstifyContent: 'space-evenly'}}>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="h4"
          >
            <b>
                JOBS
            </b>
           
          </Typography>

         
      </div>
      

        </Grid>
        <Grid item style={{display: 'flex'}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="grey" class="bi bi-hdd-network-fill" viewBox="0 0 16 16">
  <path d="M2 2a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h5.5v3A1.5 1.5 0 0 0 6 11.5H.5a.5.5 0 0 0 0 1H6A1.5 1.5 0 0 0 7.5 14h1a1.5 1.5 0 0 0 1.5-1.5h5.5a.5.5 0 0 0 0-1H10A1.5 1.5 0 0 0 8.5 10V7H14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm.5 3a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm2 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1z"/>
</svg>
        </Grid>
      </Grid>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>

          <Typography
            color="textPrimary"
            variant="h2"
          >
            <b>
              {jobs.length}
            </b>
            
          </Typography>
          <Box
        style={{
          alignItems: 'center',
          display: 'flex',
          paddingTop: 2
        }}
      >
        
         <select style={{border: '2px solid whitesmoke'}} onChange={handleChange} fullWidth >
           <option value="" disabled selected hidden>Select Machine</option>
          {
            machines.map(data => (
              
              <option value={data.id}>{data.title}</option>
              // <Button style={{color: 'orangered'}} href={`/machine-data/Job/${data.id}/Job`}><LaunchIcon/></Button>
              
            ))
          }
         
          </select>
      <Button style={{color: 'blue'}} disabled={disabled} href={`/machine-data/Job/${dataId}/Job`}><b>Open</b></Button>
         
      </Box>

      </div>
      
      
    </CardContent>
  </Card>
);
}
export default JobsBox;