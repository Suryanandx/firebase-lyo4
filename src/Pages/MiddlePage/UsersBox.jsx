import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { db } from '../../firebase';
import { firebaseLooper } from '../../utils/tools';

const UsersBox = (props) =>{ 
    
    const [users, setUsers] = useState([])
    useEffect(() => {
        db.collection('users').onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setUsers(data)
        })
    }, [])
    return (
    
  <Card style={{height: '130px', boxShadow: '0px 2px 6px #0000000A'}} {...props}>
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
              USERS
            </b>
            
          </Typography>
         
        </Grid>
        <Grid item>
          
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#A5A4BF" class="bi bi-people-fill" viewBox="0 0 16 16">
  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
  <path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
  <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
</svg>
        
        </Grid>
      </Grid>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
         <Typography
            color="textPrimary"
            variant="h2"
          >
            <b  style={{font: 'var(--unnamed-font-style-normal) normal medium 53px/6px var(--unnamed-font-family-roboto)', font: 'normal normal medium 53px/6px Roboto', color: ' #4D4F5C'}}>
               {users.length}
            </b>
           
          </Typography>
         <Box
        style={{
          alignItems: 'center',
          display: 'flex',
          paddingTop: 2
        }}
      >
        <Typography
          color="textSecondary"
          variant="caption"
        >
        <Button component={NavLink}  style={{color: "#0C03EB"}}  to="/users"><b>Open</b> </Button>

        </Typography>
      </Box>
      </div>
     
    </CardContent>
  </Card>
);
}
export default UsersBox;