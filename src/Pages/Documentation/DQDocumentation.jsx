import { Dialog, Paper, TableCell, TableContainer, TableHead, TableRow, Typography,Toolbar, DialogContent, DialogActions, Button, TextField, Select } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { db } from "../../firebase";
import { firebaseLooper } from "../../utils/tools";
import DocView from "./DocComp/DocView";


function DQDocumentation({match}) {
	const [contents, setContents] = useState([])
	const [contents1, setContents1] = useState([])
	const [open, setOpen] = useState(false)
	const [title, setTitle] = useState('')
	const [desc, setDesc] = useState('')
	const [dtype, setType] = useState(0)

	useEffect(() => {
		db.collection('DQNew').doc(match.params.id)
		.collection('content').doc('configuration')
		.collection('documentation')
		.where('dtype', '==', 0)
		.onSnapshot(snapshot => {
			const data = firebaseLooper(snapshot)
			data.sort(function(a,b){
				return (a.index - b.index)
			})
			setContents(data)
		})
		db.collection('DQNew').doc(match.params.id)
		.collection('content').doc('config')
		.collection('module')
		.where('dtype', '==', 1)
		.onSnapshot(snapshot => {
			const data = firebaseLooper(snapshot)
			data.sort(function(a,b){
				return (a.index - b.index)
			})
			setContents1(data)
		})
	}, [])
	function handleOpen(){
		setOpen(true)
	}
	function handleClose(){
		setOpen(false)
	}

	function handleSubmit(){
		const index = contents.length
		db.collection('DQNew').doc(match.params.id)
		.collection('content').doc('config')
		.collection('module').add({title,desc,index,dtype,type: 1})
	}
	return (
		<>
		<div style={{color: '#43425D'}}>
			
			<br />
			<Typography align='center' variant='h1' gutterBottom><b>Documentation</b></Typography>
			<Toolbar style={{display: 'flex', justifyContent: 'flex-end'}}>
				<Button onClick={handleOpen} style={{background: 'orange', color: 'white'}}>Add Items</Button>
			</Toolbar>
			
				
		
		<Dialog open={open} onClose={handleClose} fullWidth>
	<Typography variant='h3' align='center' gutterBottom><b>Add new items</b></Typography>
	<DialogContent>
		<TextField style={{marginBottom: '3%'}} variant='outlined' label='Title' fullWidth onChange={(e) => setTitle(e.target.value)}/>
		<Select style={{marginBottom: '3%'}} variant='outlined'  fullWidth onChange={(e) => setType(e.target.value)}>
			<option className='capitalize' value={0}>Documentation</option>
			<option value={1}>ACCESSORIES</option>
		</Select>
		<TextField multiLine rows={7} variant='outlined' label='Description' fullWidth onChange={(e) => setDesc(e.target.value)}/>	
	</DialogContent>
	<DialogActions>
		<Button color='secondary' onClick={handleClose} variant='contained'>Cancel</Button>
		<Button disabled={title === '' || desc===''} onClick={handleSubmit} style={{background: 'orange', color: 'white'}}>Add New</Button>
	</DialogActions>
</Dialog>
		</div>
		<div style={{color: '#43425D'}}>
			
			<br />
			<Typography align='center' variant='h1' gutterBottom><b>Accessories</b></Typography>
			

			<TableContainer component={Paper}>
		<Table  aria-label="simple table">
			<TableHead>
			<TableRow>
				
			<TableCell><b className='text-lg font-bold italic'>Title</b></TableCell>
			<TableCell align="left"><b className='text-lg font-bold italic'>Description</b></TableCell>
			
			<TableCell align="right"><b className='text-lg font-bold italic'>Actions</b></TableCell>
			</TableRow>
			</TableHead>
					{
						contents1.map(module => (
				
							<>
							<DocView module={module} match={match} key={module.id}/>	
			
					</>
						))
					}
					
		</Table>
		</TableContainer>
		<Dialog open={open} onClose={handleClose} fullWidth>
	<Typography variant='h3' align='center' gutterBottom><b>Add new items</b></Typography>
	<DialogContent>
		<TextField style={{marginBottom: '3%'}} variant='outlined' label='Title' fullWidth onChange={(e) => setTitle(e.target.value)}/>
		<Select style={{marginBottom: '3%'}} variant='outlined'  fullWidth onChange={(e) => setType(e.target.value)}>
			<option className='capitalize' value={0}>Documentation</option>
			<option value={1}>ACCESSORIES</option>
		</Select>
		<TextField multiLine rows={7} variant='outlined' label='Description' fullWidth onChange={(e) => setDesc(e.target.value)}/>	
	</DialogContent>
	<DialogActions>
		<Button color='secondary' onClick={handleClose} variant='contained'>Cancel</Button>
		<Button disabled={title === '' || desc===''} onClick={handleSubmit} style={{background: 'orange', color: 'white'}}>Add New</Button>
	</DialogActions>
</Dialog>
		</div>
		</>
	)
}

export default DQDocumentation
