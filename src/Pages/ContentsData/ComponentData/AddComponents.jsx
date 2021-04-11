import { Button, Card, Container, makeStyles, TextField, Typography } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import React, { useState } from 'react';
import {useHistory} from 'react-router-dom'
import ModuleDashboardLayout from '../../../components/ModuleSidebar/ModuleDashboardLayout';
import { db } from '../../../firebase';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#141256',
  },
  form: {
    alignItems: "center",
    justifyContent: "center",
    width: '90%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
      background: "#ff7a00",
      color: "white",
      borderRadius: '20px',
      margin: theme.spacing(3, 0, 2),
  },
    wrapper: {
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 256
  },
   background:'linear-gradient(#f3f3f3, #e7e7e7)' 
  },
  container: {
      display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
  },
  content: {
     background:'linear-gradient(#f3f3f3, #e7e7e7)' ,
      flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
    },
}));


const AddComponent = ({match}) => {
  const classes= useStyles();
  const [title, setContentName] = useState('')
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false);
  const [module_id, setMid] = useState(match.params.id)
  const history = useHistory();

    
    const handleSubmit = (e) => {
    e.preventDefault();
    const content = {title,value, module_id};
    setLoading(true);
      db.collection('componentData').add(content).then((data) =>{
        console.log(data)
        history.push(`/Module/${match.params.id}/Components`)
      })

  }
 
    return (
      <>
      <ModuleDashboardLayout match={match}/>
        <div>   
          <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
           <div className={classes.paper}>
            <Alert severity="info">You are currently adding a new Module</Alert>
            <br/>
            <Typography component="h1" variant="h4">
          Add Components
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField value={module_id}
           fullWidth
           variant="outlined"
           margin="normal"
           label="Machine id"
           disabled
           onChange ={(e) => setMid(e.target.value)}
           />
          <TextField
          value={title}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="content_name"
            label="Title"
            name="content_name"
            autoFocus
            onChange={(e) => setContentName(e.target.value)}
            
          />
           <TextField
          value={value}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="content_name"
            label="Expected Value"
            name="content_name"
            autoFocus
            onChange={(e) => setValue(e.target.value)}
            
          />
              
          
         {!loading && <Button
            type="submit"
            fullWidth
            variant="contained"
            
            className={classes.submit}
          >
            Add Component
            </Button>}
         {
           loading && <Button
            type="submit"
            fullWidth
            variant="contained"
            
            disabled
            className={classes.submit}
          >Adding Component...</Button>
         }   
          </form>
          </div>
          </Card>
        </div>
      </div>
      
           
         
          
        </div>
        </>
    )
}

export default AddComponent
