import { Box, Button, CircularProgress, Container, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import MachineList from './MachineList';
import {Link} from 'react-router-dom';
import Machine from './Machine';
import {db} from '../../firebase';
import {firebaseLooper} from '../../utils/tools'
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import Page from '../Page';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) =>( {
    add: {
    background:'#ff7a00',
    borderRadius: '20px',
    margin: theme.spacing(3, 0, 2),
    marginLeft: '5%'
    },
   backButton: {
        backgroundColor: "black",
        width: "100px",
        color: "white",
        borderRadius: "15px",
      
    },
}))
const Machines = () => {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true);
    const [machines, setMachines] = useState([{}]);
    const [error, setError] = useState(null)
    
    useEffect(() => {

        db.collection('machineData').onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setMachines(data)
            setIsLoading(false);
        })
    
    }, [])
    return (
        <Page title="Machines">
            <Box
            py={3}
            style={{
                backgroundColor: 'background.default',
                minHeight: '100%',
            }}
    >
        <Container maxWidth={false} >
            <Typography variant='h1'><b>Machines</b></Typography>
             <Typography variant='h5'>These are the available Machines</Typography>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                 <div style={{ width: 300 }}>
                <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    options={machines.map((option) => option.title)}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search input"
                        margin="normal"
                        variant="outlined"
                        InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                    )}
                />
                </div>

                {error && <Typography variant="h6">{error}</Typography>}
               
                <Button
                startIcon={<AddIcon/>} 
                    variant="contained"
                    color="primary" className={classes.add}>
                    <Link style={{color: "white" ,textDecoration: "none"}} to="/add-machine">
                            Add Machine
                    </Link>
                    </Button> 
            </div>
                   
                     {isLoading && <Typography variant="h3">
                    Loading...<CircularProgress size={50}/> 
                    </Typography>}
                      <Box pt={3}>
                           <Grid
                           
                        container
                        spacing={3}
                    >
                        {
                        machines.map((data) => (
                            <Grid
                            style={{
                            margin: "3%"
                           }}
                            key={data.id}
                            lg={4}
                            md={6}
                            xs={12}
                            
                            >
                              <Machine key={data.id} data={data}/>   
                            </Grid>
                                    
                        ))
                
                }
                    </Grid>
                      </Box>
                    
                            
                    
         
                
                </Container>
        </Box>
        </Page>
       
    )
}

export default Machines
