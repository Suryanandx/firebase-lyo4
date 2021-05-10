import { Button, CircularProgress, Container, Fade, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import UserList from './UserList';
import {Link, useHistory} from 'react-router-dom';
import { db } from '../../firebase';
import {firebaseLooper} from '../../utils/tools'
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useAuth } from '../context/AuthContext';
import LogIn from '../LogIn/LogIn';
import UserItem from './UserItem';
const useStyles = makeStyles((theme) =>( {
    add: {
     
    backgroundImage: 'linear-gradient(to left bottom, #fa630f, #fc8218, #fd9d29, #feb63f, #ffce59)',
    
    margin: theme.spacing(3, 0, 2),
    marginRight: '10%',
   

    },
    backButton: {
        backgroundColor: "#A997DF",
        color: "white",
        borderRadius: "20px",
       
    }
}))
const Users = () => {
    const count = 0
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([{}]);
    const {currentUser} = useAuth()
    const [admin, setAdmin] = useState(false)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const history = useHistory()
    useEffect(() => {

        db.collection('users').orderBy('role', 'asc').onSnapshot(snapshot => {
            const userData = firebaseLooper(snapshot)
            setUsers(userData)
            setIsLoading(false)
        })

    }, [])

    const handleReturn = () => {
      history.push('/')
  }
    return (
        <Paper style={{backgroundColor: '#FFFFFF'}}>
        <Container  style={{background: ' 0% 0% no-repeat padding-box', boxShadow: '0px 2px 6px #0000000A'}}>
            
              <div  style={{display: 'flex', justifyContent: 'space-between'}}>
                  <div>
                      <Typography variant='h1'><b>Users</b></Typography>
              <Typography variant='h5'>List of available users</Typography>
                  </div>
         
        {error && <Typography variant="h6">{error}</Typography>}
                
          
              </div>
              <div  style={{display: 'flex', justifyContent: 'flex-end'}}>
                 <div className="relative"> 
                 <input style={{ border: '2px solid whitesmoke',}} onChange={(e) => setSearchTerm(e.target.value)} type="text" className="h-14 w-96 pr-5 pl-5 rounded z-0 focus:shadow focus:outline-none" placeholder="Search Users..."/>
                  <div className="absolute top-4 right-3"> <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i> 
                  </div>
                   </div>
               <Button href={`/users/add-user`}  style={{width: '15%', marginLeft: '4%', marginRight: '3%',color: 'white', backgroundColor: 'orange'}}>Add User</Button>
             
              
          
               
            </div>
              <br className='bg-gray-100'/>
               <br className='bg-gray-100'/>
              
                  <section class="text-gray-700 ">
                   
                    <div className=" ">
                        <div class="flex flex-wrap text-left">
                           
                                   { users.
           filter((data) => {
                                if(searchTerm === ""){
                                    return data
                                } else if (data.email.toLowerCase().includes(searchTerm.toLowerCase())){
                                        return data
                               }else if (data.firstName.toLowerCase().includes(searchTerm.toLowerCase())){
                                        return data
                               }
                               else if (data.lastName.toLowerCase().includes(searchTerm.toLowerCase())){
                                        return data
                               }else if (data.phone.toLowerCase().includes(searchTerm.toLowerCase())){
                                        return data
                                }
                                      
                            }).map((users) => (
                                     <>
                                           <UserItem key={users.id} users={users} />   
                                            <br />
                                      <br />
                                      </>
                 
                        ))
                            
                        } 
                        </div>
                    </div>
                </section>
                                             
                
               
               {isLoading && 
                    <CircularProgress  />
                   }
          
        </Container>
        
        </Paper>
    )
}

export default Users
