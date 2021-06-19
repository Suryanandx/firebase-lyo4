import { useEffect, useState } from "react"
import { db } from "../../../firebase"
import { firebaseLooper } from "../../../utils/tools"

import { DialogContent, makeStyles,  Paper,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow  } from "@material-ui/core";
import { Button, Dialog, Typography, TextField, DialogActions, Card } from "@material-ui/core"
import DQComponentsView from "./DQComponentsView";

function DQComponents({match, module_id}) {
	const [components, setComponents] = useState([])
	const [title, setTitle] = useState('')
	const [value, setValue] = useState('')
	const [open, setOpen] = useState(false)
	const [message, setMessage] = useState('')
	const[index, setIndex] = useState(0)

	useEffect(() => {
		db.collection('DQNew')
		.doc(match.params.id)
		.collection('content')
		.doc('configuration')
		.collection('components')
		.where('module_id', '==', `${module_id}`)
		.onSnapshot(snapshot => {
			const data = firebaseLooper(snapshot)
			data.sort(function(a,b){
				return(a.index-b.index)
			})
			setComponents(data)
			setIndex(data.length)
		})
	}, [])

	function handleSubmit(){
		db.collection('DQNew')
		.doc(match.params.id)
		.collection('content')
		.doc('configuration')
		.collection('components')
		.add({title,value,module_id,index})
		.then(() => setMessage('added success'))
	}
	function handleOpen (){
		setOpen(true)
	}
	function handleClose(){
		setOpen(false)
	}
	return (
		<div>
			<Typography variant='h1' align='center'><b>Components</b> </Typography>
			<div style={{marginTop: '20px', paddingRight: '3%', display: 'flex',justifyContent: 'flex-end'}}>
				<Button onClick={handleOpen} style={{background: 'black', color: 'whitesmoke'}}>Add New </Button>
			</div>
			{message && <b>{message}</b>}
			<br />
			{
				/*Map components here table */
				<>
					{components &&
						<TableContainer component={Paper}>
			<Table  aria-label="simple table">
				<TableHead>
				<TableRow>
				<TableCell><b className='text-lg font-bold italic'>Title</b></TableCell>
				<TableCell align="left"><b className='text-lg font-bold italic'>Value</b></TableCell>
				<TableCell align="right"><b className='text-lg font-bold italic'>Actions</b></TableCell>
				</TableRow>
				</TableHead>
					
						{
						
						components.map(components=> (
				
						
							<DQComponentsView module_id={module_id} components={components} match={match} key={components.id}/>	
			
					
						))
					}
					
		</Table>
		</TableContainer> }
					</>
			}

			<Dialog fullWidth onClose={handleClose} open={open}>
				<Typography variant='h4' align='center' gutterBottom><b>Add New Components</b></Typography>
				<DialogContent>
					<TextField  variant='outlined' style={{marginBottom: '20px'}} fullWidth required onChange={(e) => setTitle(e.target.value)} label='Title'/>
					<TextField  variant='outlined' fullWidth required onChange={(e) => setValue(e.target.value)} label='Expected Value'/>
				</DialogContent>
				<DialogActions>
					<Button variant='contained' color='secondary' onClick={handleClose} >Cancel</Button>
					<Button onClick={handleSubmit} style={{background: 'orange', color: 'white'}}>Add Component</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default DQComponents
