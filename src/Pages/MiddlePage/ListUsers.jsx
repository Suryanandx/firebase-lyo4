import { v4 as uuid } from 'uuid';
import moment from 'moment';
import {
    Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { firebaseLooper } from '../../utils/tools';

const ListUsers = (props) =>{
    const [users, setUsers] = useState([])

    useEffect(() => {
        
        db.collection('users').get().then(snapshot => {
            const user = firebaseLooper(snapshot);
            setUsers(user)            
            
        }).catch(err => {
            console.log(err)
        })
    }, [])

  return (
  <Card style={{padding: 10}} {...props}>
    <br />
    <Typography variant='h4' align='center'><b>Users</b></Typography>
    <CardHeader
      subheader={`${users.length} in total`}
    />
    <Divider />
    <List>
      {users.slice(0,10).map((user, i) => (
        <ListItem
          divider={i < users.length - 1}
          key={user.id}
        >
          <Avatar 
          style={{ background: '#E8E7FF 0% 0% no-repeat padding-box'}}
          src={user.url}
          ></Avatar>
          
          <ListItemText
          style={{marginLeft: '2%'}}
            primary={user.firstName}
           
          />
        {user.email}
        </ListItem>
      ))}
    </List>
    <Divider />
    <Box
    p={2}
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        
      }}
    >
      <Button
      href='/users'
        color="primary"
        endIcon={<ArrowRightIcon />}
        size="small"
        variant="text"
      >
        View all
      </Button>
    </Box>
  </Card>
)};

export default ListUsers