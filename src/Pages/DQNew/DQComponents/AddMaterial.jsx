import { FormHelperText, TextField } from '@material-ui/core';
import { Button, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import { db } from '../../../firebase';

const AddMaterial = ({match}) => {

     const [name, setName] = useState('')
     const [desc, setDesc] = useState('')
     const [ message, setMessage] = useState('')
    const [mid, setMid] = useState(`${match.params.id}`)

  
    

     function handleSubmit(){
     
        db.collection('DQNew').add({name,desc,mid}).then(data => {
          const key= data.id
          db.collection('DQNew').doc(data.id).update({key}).then(() => {
            window.location.reload()
          })
        })
     }
    return (
        <div>
           
          <div class="container items-center px-4 py-12 lg:px-15">
              
            <form  class="flex flex-col w-full p-10 px-8 pt-6 mx-auto my-6 mb-4 transition duration-500 ease-in-out transform bg-white border rounded-lg lg:w-1/2 ">
             <Typography variant='h3' align='center'><b>Add New report</b></Typography> 
            
              { message &&<Typography variant='h6' align='center'><b style={{color: 'blue'}}>{message}</b></Typography> }
              <div class="relative pt-4">
                <label for="name" class="text-base leading-7 text-gray-500">Name</label>
                <input style={{marginBottom: '25px'}} error={name.length > 40} onChange={(e) => setName(e.target.value)} type="text"  placeholder="Enter Name" class="w-full px-4 py-2 mt-2 mr-4 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"/>
                <FormHelperText>Description must be {name.length}/40 characters maximum</FormHelperText>

              </div>
              
                 
                  <TextField error={desc > 300 } label="Description" fullWidth rows={5} variant="outlined" multiline onChange={(e) => setDesc(e.target.value)} />
              
              
              <FormHelperText>Description must be {desc.length}/300 characters maximum</FormHelperText>
              
              <div class="flex items-center w-full pt-4">
                <Button disabled={name === '' || desc === '' || desc>300 || name > 40} fullWidth style={{background: 'orange', color: 'white'}} onClick={handleSubmit} > Add New  </Button>
              </div>
            </form>
          </div>
      
        </div>
    )
}

export default AddMaterial
