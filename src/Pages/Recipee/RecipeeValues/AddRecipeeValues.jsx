import { Button, Card, CardActions, CardContent, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import StepDashboardLayout from '../../../components/StepSidebar/StepDashboardLayout';
import { db } from '../../../firebase';
import { firebaseLooper } from '../../../utils/tools';



const useStyles = makeStyles((theme) => ({
  layoutRoot: {
    backgroundColor: 'white',
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#141256',
  },
 wrapper: {
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 256
  }
  },
  container: {
      display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  height: '100%'
  },
  content: {
    margin: '15%',
    marginTop: '68px',
      flex: '1 1 auto',
      width: '75%',
  overflow: 'auto'
    },
}));


const AddRecipeeValues = ({match}) => {
    const classes = useStyles()
    const [rid, setRid] = useState(`${match.params.id}`)
    const [step, setStep] = useState('')
    const [recipe, setRecipe] = useState([])
    const [time1, setTime] = useState('')
     const [time2, setKeepTime] = useState('')
      const [temp1, setTemp] = useState('')
       const [pressure, setPressure] = useState('')
    const history = useHistory()

    useEffect(() => {
          db.collection('recipeeData').where('rid', '==', `${match.params.id}`).onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setRecipe(data)
        })
    })
    const handleSubmit = (e) => {
      e.preventDefault()
        const index = recipe.length 
        const data = {rid, step, temp1, time1, time2, pressure, index}
       db.collection('recipeeData').add(data)
       history.push(`/Recipe/${match.params.id}/Recipe-values`)
        
    }
    return (
        <>
        <StepDashboardLayout match={match}/>
         <div >
        <div >
          <Card className={classes.content}>
              
             <CardContent >
                 <Typography variant='button' component='h1' align='center'><b>Add Recipe</b></Typography>
                   <form style={{width: '100%', alignItems: "center"}} onSubmit={handleSubmit}>
                     <TextField 
                    variant="outlined"
                    margin="normal"
                    label='Recipe ID'
                    value={rid}
                    disabled
                    fullWidth
                        onChange={(e) => setRid(e.target.value)}
                    />
                    <TextField 
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label='Step'
                    value={step}
                
                        onChange={(e) => setStep(e.target.value)}
                    />
                    <TextField 
                    variant="outlined"
                    margin="normal"
                    required
                    type='number'
                    fullWidth
                    label='Temprature (deg C)'
                    value={temp1}
                  
                        onChange={(e) => setTemp(e.target.value)}
                    />
                    <TextField 
                    variant="outlined"
                    margin="normal"
                    required
                    type='number'
                    fullWidth
                    label='Pressure (mT)'
                    value={pressure}
                   
                        onChange={(e) => setPressure(e.target.value)}
                    />
                    <TextField 
                    variant="outlined"
                    margin="normal"
                    required
                    type='number'
                    fullWidth
                    label='Time (mins)'
                   
                        onChange={(e) => setTime(e.target.value)}
                    />
                    <TextField 
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    type='number'
                    label='KeepTime (mins)'
                    value={time2}
                    
                        onChange={(e) => setKeepTime(e.target.value)}
                    />
                   
                <CardActions>
                    <Button type="submit" fullWidth variant='outlined' color="primary" >Add New Recipe</Button>
                 </CardActions>
              
                </form> 
             </CardContent>
              
          </Card>
        </div>
      </div>
      </>
    )
}

export default AddRecipeeValues
