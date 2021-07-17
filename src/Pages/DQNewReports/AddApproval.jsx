import { useState } from "react"
import * as admin from 'firebase-admin'
import  { db } from "../../firebase"
import {useStorage} from '../../utils/useStorage'
import { FormHelperText, TextField, Button, Switch } from "@material-ui/core"
import { Typography } from "@material-ui/core"
function AddApproval({match}) {
	const [name, setName] = useState('')
	const [file, setFile] = useState(null)
	const {prograss, url} = useStorage(file)
	 const types = ["image/png", "image/jpeg", "image/jpg"];
	 const [error, setError] = useState('')
	 const [change, setChange] = useState(false)
	 
	 const handleChange = (e) => {
        let selectedFile = e.target.files[0];
        
        if (selectedFile) {
            if (types.includes(selectedFile.type)) {
                setError(null)
                setFile(selectedFile);
            } else {
                setFile(null);
                setError("Please select an image file (png or jpg)");
            }
        }
       
        
    }

	function handleSubmitC(){
		db.collection('DQNewReport').
		doc(match.params.id)
		.collection('content')
		.doc('approval')
		.collection('customer')
		.add({name,url,  timestamp: new Date()})
		.then(() => {
		setName('')
		setFile(null)	
		}
		
		)
	}
	function handleSubmitV(){
		db.collection('DQNewReport').
		doc(match.params.id)
		.collection('content')
		.doc('approval')
		.collection('vendor')
		.add({name,url, timestamp: new Date()})
	}
	
	return (
		<div>
			<Typography variant='h3'align='center' gutterBottom >Add Details</Typography>
			<div>
				<TextField variant='outlined' fullWidth label='Name' style={{marginBottom: '25px'}} value={name} onChange={(e) => setName(e.target.value)} />
				
				<input type='file' onChange={handleChange} />
				<FormHelperText>Put you Signature here (Image Formats only)</FormHelperText>

			</div>
			<div>
				<Switch onClick={(e) => setChange(!change)}></Switch>
				<FormHelperText>Set For customer/Reviewer</FormHelperText>
				{
					change?
					<div style={{display: 'flex', justifyContent: 'center'}}>
						<Button onClick={handleSubmitC} style={{background: 'orange', color: 'white'}}>Add for Customer</Button>
					</div>
					:
					<div style={{display: 'flex', justifyContent: 'center'}}>
						<Button disabled={process < 100 || name === '' } onClick={handleSubmitV} style={{background: 'orange', color: 'white'}} >Add for Reviewer</Button>
					</div>
				}
			</div>
			{
				url && 
				<div style={{align:'center', display: 'flex', justifyContent: 'center'}}>
					<img src={url} width='350px' height='250px'/>
				</div>
				
			}
		</div>
	)
}

export default AddApproval
