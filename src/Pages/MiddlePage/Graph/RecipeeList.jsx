import { Button, Container, FormControl, Grid, InputLabel, Menu, MenuItem, NativeSelect, Select } from '@material-ui/core'
import { Title } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase'
import { firebaseLooper } from '../../../utils/tools'
import TestData from '../../Tests/TestData'
import FetchRecipee from './FetchRecipee'
import GraphData from './GraphData'
import GraphDataRecipee from './GraphDataRecipee'

const RecipeeList = () => {
  
    const [recipeeData, setRecipeeData] = useState([])
    const [title, setTitle] = useState('')

    useEffect(() => {
        db.collection('recipes').onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setRecipeeData(data)
        })
        
    }, [recipeeData])

     const handleChange = (event) => {
    setTitle(event.target.value);
  };

    return (
        <Container>
      
         <Grid item xs={12}>
              <InputLabel color="secondary" variant="outlined"></InputLabel>
              <FormControl>
                 <Select
        fullWidth
        variant="outlined"
          native
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
          
        >
           
          {
              recipeeData.map(data => (
                  <option key={data.title} value={data.id}>{data.title}</option>
                
              ))
          }
        </Select>
              </FormControl>
       
            </Grid>
        
      <h1>{title}</h1>
       <FetchRecipee title={title}/>
        </Container>
    )
}

export default RecipeeList
