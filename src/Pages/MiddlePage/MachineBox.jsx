import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoneyIcon from '@material-ui/icons/Money';
import { red } from '@material-ui/core/colors';
import { useEffect, useState } from 'react';
import { firebaseLooper } from '../../utils/tools';
import { db } from '../../firebase';
import { NavLink } from 'react-router-dom';

const MachineBox = (props) =>{ 
    const [machines, setMachines] = useState([])
    useEffect(() => {
        db.collection('machineData').onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setMachines(data)
        })
    }, [])
    return(
  <Card
      style={{height: '130px', boxShadow: '0px 2px 6px #0000000A'}}
    {...props}
  >
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
            variant="h4"
          >
            <b>
               MACHINES
            </b>
             
          </Typography>
          
        </Grid>
        <Grid item>
         
           <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#A5A4BF" class="bi bi-kanban-fill" viewBox="0 0 16 16">
  <path d="M2.5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2h-11zm5 2h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm-5 1a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3zm9-1h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"/>
</svg>
          
        </Grid>
      </Grid>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Typography
            color="textPrimary"
            variant="h2"
          >
            <b style={{font: 'var(--unnamed-font-style-normal) normal medium 53px/6px var(--unnamed-font-family-roboto)', font: 'normal normal medium 53px/6px Roboto', color: ' #4D4F5C'}}>
              {machines.length}
            </b>
            
          </Typography>
      <Box
        style={{
          pt: 2,
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
       
        
       <Button component={NavLink}  style={{color: "#0C03EB"}} to="/machine-data"> <b>Open</b></Button>
        
      </Box>
      </div>
      
    </CardContent>
  </Card>
);
}
export default MachineBox;