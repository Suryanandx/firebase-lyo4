import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  InputLabel,
  Select,
  Typography
} from '@material-ui/core';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import WorkIcon from '@material-ui/icons/Work';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { firebaseLooper } from '../../utils/tools';
import LaunchIcon from '@material-ui/icons/Launch';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { NavLink } from 'react-router-dom';
const ManualBox = (props) =>{ 
    const [machines, setMachines] = useState([])
    const [manuals, setManuals] = useState([])
    const [dataId, setDataId] = useState('')
     const [disabled, setDisabled] = useState(true)
    useEffect(() => {
       db.collection('machineData').onSnapshot(doc => {
        const data = firebaseLooper(doc)
        setMachines(data)
       })
        db.collection('manualData').onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setManuals(data)
        })
    }, [])

    const handleChange = (e) => {
     setDataId(e.target.value)
     setDisabled(false)
    }
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
                MANUALS
            </b>
          
          </Typography>
         
        </Grid>
        <Grid item style={{display: 'flex'}}>
         <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#A5A4BF" class="bi bi-book-half" viewBox="0 0 16 16">
  <path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
</svg>
         
        </Grid>
      </Grid>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
           <Typography
            color="textPrimary"
            variant="h2"
          >
            <b  style={{font: 'var(--unnamed-font-style-normal) normal medium 53px/6px var(--unnamed-font-family-roboto)', font: 'normal normal medium 53px/6px Roboto', color: ' #4D4F5C'}}>
              {manuals.length}
            </b>
            
          </Typography>
        <Box
        style={{
          alignItems: 'center',
          display: 'flex',
          paddingTop: 2
        }}
      >
     
        
         <select style={{border: '2px solid whitesmoke',width: '150px'}} onChange={handleChange} fullWidth >
            <option value="" disabled selected hidden>Select Machine</option>
          {
            machines.map(data => (
             
              <option value={data.id}>{data.title}</option>
              // <Button style={{color: 'orangered'}} href={`/machine-data/Manuals/${data.id}/Manuals`}><LaunchIcon/></Button>
            
            ))
          }
          </select>
        <Button style={{color: '#0C03EB'}} disabled={disabled} component={NavLink} to={`/machine-data/Manuals/${dataId}/Manuals`}><b>Open</b></Button>
      </Box>
      </div>
      
    </CardContent>
  </Card>
);
}
export default ManualBox;