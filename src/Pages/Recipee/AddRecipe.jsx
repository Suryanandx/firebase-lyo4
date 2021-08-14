import { Button, Card, CardActions, CardContent, FormHelperText, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import ContentDashboardLayout from '../../components/ContentSidebar/ContentDashboardLayout';
import { useAuth } from '../../components/context/AuthContext';
import { db } from '../../firebase';


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
      flex: '1 1 auto',
      width: '75%',
  overflow: 'auto'
    },
}));


const AddRecipe = ({match}) => {
  const {currentUser} = useAuth()
    const classes = useStyles()
    const [title, setTitle] = useState('')
    const [mid, setMid] = useState(`${match.params.id}`)
    const history = useHistory()

    const handleSubmit = () => {
      const createdBy = `${currentUser.email}`
        const data = {title, mid, createdBy}
        db.collection('recipes').add(data)
        history.push(`/machine-data/Reports/${match.params.id}/Recipes`)
    }
    return (
        <>
        <ContentDashboardLayout match={match}/>
         <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
              
             <CardContent >
                 <Typography variant='button' component='h1' align='center'><b>Add Recipe</b></Typography>
                   <form style={{width: '100%', alignItems: "center"}} onSubmit={handleSubmit}>
                    <TextField 
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label='Title'
                    value={title}
                    error={title === "" || title.length > 40}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <FormHelperText>Title legth should be maximum {title.length}/40</FormHelperText>
                    <TextField 
                    variant="outlined"
                    margin="normal"
                    label='mid'
                    value={mid}
                    disabled
                    fullWidth
                        onChange={(e) => setMid(e.target.value)}
                    />
                <CardActions>
                    <Button disabled={title === "" || title.length > 40} fullWidth variant='outlined' color="primary" onClick={handleSubmit}>Add New Recipe</Button>
                 </CardActions>
              
                </form> 
             </CardContent>
              
          </Card>
        </div>
      </div>
      </>
    )
}

export default AddRecipe
