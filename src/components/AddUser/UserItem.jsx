import React, { useState } from 'react';
import { Avatar, Button, Card, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, InputLabel, makeStyles, Select, TextField, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import {db} from '../../firebase'
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
const useStyles = makeStyles((theme) => ({
  root: {
    borderBottomColor: "black",
    backgroundColor: theme.palette.background.dark,
   
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  },
  dataBox:{
      marginBottom: "50px",
      alignItems: "center"
  },
  divButton: {
      color: "#32e0c4",
      
     
      borderRadius: "10px",
      width: "100px",

  },
  del:{
    color: "red",
   
    borderRadius:"10px"
  },
   large: {
     marginRight: '5%',
    width: 70,
    height: 70,
  },
}));

export default function UserItem({ users}) {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [openView, setOpenView] = useState(false)
    const [firstName, setFirstName] = useState(users.firstName)
    const [lastName, setLastName] = useState(users.lastName)
    const [password, setPassword] = useState(users.password)
    const [email, setEmail] = useState(users.email);
    const [phone, setPhone] = useState(users.phone)
    const [role, setRole] = useState(users.role)
    const [loading, setLoading] = useState(false);
    const [error,setError] = useState("")
    const history = useHistory()
   
    const handleView = () => {
      setOpenView(true)
    }
    const handleViewClose = () => {
      setOpenView(false)
    }
    const handleClickOpen = () => {
    setOpen(true);
  };

   const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
      setOpenEdit(true)
    }
  const handleEditClose = () => {
      setOpenEdit(false)
    }

  const handleDelete = (id) => {
    db.collection('users').doc(id).delete().then(() => {
      
    })
}

const updateUser=(id) => {
  
       const updatedUser = {firstName,lastName,phone,role,email,password}
       db.collection('users').doc(id).update(updatedUser)
    
  }
  

    return (
          <>
            <>
            {/* <Grid  xs={12}>
              <Avatar className={classes.large} src={users.url}></Avatar>
                 <Typography align="center" variant="h6">{users.firstName} {users.lastName}</Typography>
                 <Typography align="center" variant="body2">{users.email} ||  {users.phone}</Typography>
                 
                 <Grid
                className={classes.statsItem}
                item
                 >
                <Typography
                color="textSecondary"
                display="inline"
                variant="body2"
                >
               {users.role}
                </Typography>
                
          </Grid>   
            </Grid> */}
           
         

            <Card style={{width: '45%', marginRight: '4%', marginBottom: '2%', justifyContent:'space-between'}}>
            <div  style={{display: 'flex', justifyContent: 'flex-end', marginRight: '2%', padding: '20px'}}>
                                      <Button style={{opacity: 0.5}} startIcon={<EditIcon/>}  onClick={handleEdit}  ></Button>
                                      <Button style={{opacity: 0.5}} startIcon={<DeleteForeverIcon/>} onClick={handleClickOpen}  ></Button>
                                     
                                      </div>
                <div style={{display: 'flex', margin: '15px', marginTop: '0px'}}>
             
                    <Avatar src={users.url} className={classes.large}/>
                    <div  >
                      < >
                        <Typography align="left" variant="h6" style={{opacity: 1, font: 'var(--unnamed-font-style-normal) normal bold var(--unnamed-font-size-18)/13px var(--unnamed-font-family-roboto)', color: '#4D4F5C'}}><b>{users.firstName} {users.lastName}</b></Typography>
                      
                      </>
                           <Typography align="left" variant="body2" style={{opacity: 0.5, font: 'normal normal normal 15px/25px Roboto'}}>{users.role}</Typography>
                      
                   
                  
                        <Typography style={{opacity: 0.5,  color: '#43425D'}} align="left" >Email : {users.email}</Typography>
                 
                       
              
                      <Typography  style={{opacity: 0.5, color: '#43425D'}} align="left" >Phone: {users.phone}</Typography>
                     
                       
                    </div>
                  
                </div>
                            
                                      
                                     </Card>
              <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Are You Sure You Want To Delete?"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deleting will be a permanent action and data pervailing will be permanently deleted and can not be retrieved back.                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Disagree
                    </Button>
                    <Button   onClick={(e)=>{
                        handleDelete(users.id);
                         handleClose()}} color="primary" autoFocus>
                        Agree
                    </Button>
                    </DialogActions>
                </Dialog>

                {/* Edit dialog */}
                <Dialog
                    open={openEdit}
                    onClose={handleEditClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{`Edit Details of ${users.firstName}`}</DialogTitle>
                    <DialogContent>
                    
                    <form className={classes.form}  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                        value={firstName}
                          autoComplete="fname"
                          name="firstName"
                          variant="outlined"
                          required
                          fullWidth
                          id="firstName"
                          label="First Name"
                          autoFocus
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                        value={lastName}
                          variant="outlined"
                          required
                          fullWidth
                          id="lastName"
                          label="Last Name"
                          name="lastName"
                          autoComplete="lname"
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                        value={phone}
                          variant="outlined"
                          error={phone.length <10 || phone.length > 10}
                          required
                          fullWidth
                          name="password"
                          label="Phone Number"
                          type="Number"
                          id="phone"
                          autoComplete="current-password"
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </Grid>
                     
                      <Grid item xs={12}>
                        <InputLabel htmlFor="role-native-simple">Role</InputLabel>
                  <Select
                    native
                    fullWidth
                    value={role}
                    onChange={(e)=> setRole(e.target.value)}
                    inputProps={{
                      name: 'roles',
                      id: 'role-native-simple',
                    }}
                  >
                  <option aria-label="None" value="" />
                <option value="Admin">Admin</option>
                <option value="Trainee">Trainee</option>
                  <option value="Operator">Operator</option>
                <option value="Supervisor">Supervisor</option>
                <option value="Validator">Validator</option>
                <option value="Maintenance">Maintenance</option>
            
                  </Select>
                      </Grid>
                      
                    </Grid>
                 
                    <DialogActions>
                      <Button color="secondary" onClick={handleEditClose}>Close</Button>
                    <Button
                          
                          variant="outlined"
                          color="primary"
                        disabled={phone.length <10 || phone.length > 10}
                          onClick={(e)=> {updateUser(users.id);
                            handleEditClose()
                            }
                          }
                        >
                          Update
                          </Button>
                       
                    </DialogActions>
                     
                  </form>
                    </DialogContent>
                </Dialog>
                    {/* Edit Dialog close */}

                    {/* View Dialog */}
            <Dialog
                    open={openView}
                    onClose={handleViewClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{`Details for ${users.firstName}`}</DialogTitle>
                    <DialogContent>
                    
                    <form className={classes.form}  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                        value={firstName}
                          autoComplete="fname"
                          name="firstName"
                          variant="outlined"
                          required
                          fullWidth
                          id="firstName"
                          label="First Name"
                          autoFocus
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                        value={lastName}
                          variant="outlined"
                          required
                          fullWidth
                          id="lastName"
                          label="Last Name"
                          name="lastName"
                          autoComplete="lname"
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                        value={email}
                          variant="outlined"
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                        value={phone}
                          variant="outlined"
                          required
                          fullWidth
                          name="password"
                          label="Phone Number"
                          type="Number"
                          id="phone"
                          autoComplete="current-password"
                          disabled
                        />
                      </Grid>
                      
                      <Grid item xs={12}>
                        <InputLabel htmlFor="role-native-simple">Role</InputLabel>
                  <Select
                    native
                    fullWidth
                    value={role}
                    disabled
                    inputProps={{
                      name: 'roles',
                      id: 'role-native-simple',
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option value="Admin">Admin</option>
                    <option value="Trainee">Trainee</option>
                      <option value="Operator">Operator</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="Validator">Validator</option>
                    <option value="Maintenance">Maintenance</option>
                </Select>
                      </Grid>
                      
                    </Grid>
                    <DialogActions>
                      <Button color="secondary" onClick={handleViewClose}>Cancel</Button>
                   
                    </DialogActions>
                     
                  </form>
                    </DialogContent>
                </Dialog>

            </>
            
          
        </>
      
    )
}

