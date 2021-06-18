import { Chip, FormHelperText } from '@material-ui/core';
import { Button, Select, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useState } from 'react'
import { db } from '../../../firebase';

const AddContent = ({match}) => {

     const [title, setTitle] = useState('')
     const [desc, setDesc] = useState('')
     const [ message, setMessage] = useState('')
     const [type, setType] = useState(0)
    const [key, setMid] = useState(`${match.params.id}`)
    const [specs, setSpecs] = useState('')
   const [ specifications, setSpecifications] = useState([])
     function handleSubmit(){
     
        db.collection('DQNew').doc(match.params.id).collection('content').add({title,desc,key, specifications, type}).then(() => {
		setMessage('Added Successfully !')
	})
     }

     function handleSpecs(){
	specifications.push(specs)
	setSpecs('')
	console.log(specifications)
     }
    return (
        <div>
           
          <div class="container items-center px-4 py-12 lg:px-15">
              
            <form  class="flex flex-col w-full p-10 px-8 pt-6 mx-auto my-6 mb-4 transition duration-500 ease-in-out transform bg-white border rounded-lg lg:w-1/2 ">
             <Typography variant='h3' align='center'><b>Add New report</b></Typography> 
            
              { message &&<Typography variant='h6' align='center'><b style={{color: 'blue'}}>{message}</b></Typography> }
              <div class="relative pt-4">
                <label for="name" class="text-base leading-7 text-gray-500">Name</label>
                <input onChange={(e) => setTitle(e.target.value)} type="text"  placeholder="Enter Name" class="w-full px-4 py-2 mt-2 mr-4 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"/>
              </div>
              
             
              <div class="flex flex-wrap mb-6 -mx-3">
                <div class="w-full px-3">
                  <label class="text-base leading-7 text-gray-500" for="description"> Description </label>
                  <textarea onChange={(e) => setDesc(e.target.value)} class="w-full h-32 px-4 py-2 text-base text-gray-500 transition duration-500 ease-in-out transform bg-white border rounded-lg focus:border-blue-500 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 apearance-none autoexpand" id="description" type="text" name="description" placeholder="Describe your material...." required=""></textarea>
                </div>
              </div>
	     <br />
	     <Alert severity='info'>To add multiple specs , Click "Add specs" after writing it </Alert>
	       <div class="relative pt-4">
                <label for="name" class="text-base leading-7 text-gray-500">Enter design specs here ..</label>
                <input disabled={type!==3} onChange={(e) => setSpecs(e.target.value)} type="text"  placeholder="Specs" class="w-full px-4 py-2 mt-2 mr-4 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"/>
              </div>
		<FormHelperText>Enable by selectiong design sepcs the selector </FormHelperText>
               <br />
	       <Button onClick={handleSpecs} disabled={type!==3 || specs===""} fullWidth variant='contained' color='primary'>Add Specs</Button>
	       <br />
	       <Select value={type} onChange={(e) => setType(e.target.value)} variant='outlined' fullWidth>
			<option value={0}>Manual Text</option>
			<option value={3}>Design Specs</option>
			<option value={4}>Configuration</option>
	      </Select>
              <div class="flex items-center w-full pt-4">
                <Button onClick={handleSubmit} class="w-full py-3 text-base text-white transition duration-500 ease-in-out transform bg-yellow-900 border-yellow-900 rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-yellow-800 "> Add New  </Button>
              </div>
	      { specifications && 
		      specifications.map(data => (
			      <Chip label={data} />
		      ))
	      }
            </form>
          </div>
      
        </div>
    )
}

export default AddContent
