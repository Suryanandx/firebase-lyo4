import { DialogContent, makeStyles,  Paper,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow  } from "@material-ui/core";
import { Button, Dialog, Typography, TextField, DialogActions, Card } from "@material-ui/core"
import { useEffect } from "react"
import { useState } from "react"
import DQLayout from "../../components/DQNewSidebar/DQLayout";
import { db } from "../../firebase"
import { firebaseLooper } from "../../utils/tools";
import DQmodules from "../DQNew/DQmodules";
import DQConfigView from "./DQCOnfigDetails/DQConfigView";
import DQModule from "./DQModule/DQModule";
import {
  NavLink as RouterLink,
  matchPath,
  useLocation
} from 'react-router-dom';
import DQDocumentation from "../Documentation/DQDocumentation";
import DQBrands from "../brands/DQBrands";
import Services from "../servicesreq/Services";


const useStyles = makeStyles((theme) => ({
  layoutRoot: {
   backgroundColor: 'whitesmoke',
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
    paddingLeft: 250
  },
  
  },
  container: {
      display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
  },
  content: {
   padding: '20px',
      flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
    },
}));

function DQConfig({match, modules}) {
	const [purpose, setPurpose] = useState({})
	const [title, setTitle] = useState('')
	const [name, setName] = useState('')
	
	const [ desc, setDesc] = useState('')
	const [open, setOpen] = useState(false)
	const [openEdit, setOpenEdit] = useState(false)
	const [openAdd, setOpenAdd] = useState(false)
	const [opendelete, setOpenDelete] = useState(false)
	const [titleModule, setTitleModule] = useState('')
	const [ descModule, setDescModule] = useState('')
	const [index, setIndex] = useState(0)
	const classes = useStyles()

	function handleOpen(){
		setOpen(true)
	}
	function handleClose(){
		setOpen(false)
	}
	function handleOpenEdit(){
		setOpenEdit(true)
	}
	function handleCloseEdit(){
		setOpenEdit(false)
	}
	function handleOpenAdd(){
		setOpenAdd(true)
	}
	function handleCloseAdd(){
		setOpenAdd(false)
	}
	function handleOpenDel(){
		setOpenDelete(true)
	}
	function handleCloseDel(){
		setOpenDelete(false)
	}

	function handleUpdate(id){
		db.collection('DQNew')
		.doc(match.params.id)
		.collection('content')
		.doc('configuration')
		
		.update({name, desc})
	}
	function handleEditUpdate(id){
		const title = titleModule
		const desc = descModule

		db.collection('DQNew')
		.doc(match.params.id)
		.collection('content')
		.doc('configuration')
		.collection('modules')
		.doc(id)
		.update({title, desc})
	}

	function handleSubmit(e){
		e.preventDefault()
		db.collection('DQNew')
		.doc(match.params.id)
		.collection('content')
		.doc('configuration')
		.collection('modules')
		.add({title, desc, index})
	}
	useEffect(() => {
		db.collection('DQNew')
		.doc(match.params.id)
		.collection('content')
		.doc('configuration')
		.onSnapshot(snapshot => {
			const data = snapshot.data()
			setPurpose(data)
			if(data){
				setName(data.name)
			setDesc(data.desc)
			}
			
		})
		db.collection('DQNew')
		.doc(match.params.id)
		.collection('content')
		.doc('configuration')
		.collection('modules')
		.onSnapshot(snapshot => {
			const data = firebaseLooper(snapshot)
			data.sort(function(a,b){
				return(a.index-b.index)
			})
			
			setIndex(data.length)
			
		})
	}, [])

	function handleSubmitNew(e){
		e.preventDefault()
		db.collection('DQNew')
		.doc(match.params.id)
		.collection('content')
		.doc('configuration')
		.set({name,desc})
	}
	return (
		<>
		
			(<>
			<DQLayout match={match}/>
		 <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
          { 
	  purpose ? <div style={{height: '100vh'}}>
			<Typography variant='h1' align='center' gutterBottom><b>{purpose.name}</b></Typography>
			<hr />
			<Typography variant='body1' align='left' gutterBottom><p className='italic'>{purpose.desc}</p></Typography>
			<hr />
			<div style={{display: 'flex', marginBottom: '3%', paddingRight: '3%', justifyContent: 'flex-end'}}>
				<Button href={`/DQ/${match.params.id}/General-Information`} style={{background: 'blue', color: 'white', marginLeft: '25px',  marginRight: '4%'}}>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-90deg-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z"/>
</svg>
					</Button>
				<Button style={{color: 'white', background: 'black', marginRight: '4%'}} onClick={handleOpenAdd}>Add Module</Button>
				<Button style={{color: 'white', background: 'orange', marginRight: '4%'}} onClick={handleOpen}>Edit</Button>
				<Button component={RouterLink} to={`/DQ/${match.params.id}/Specifications`} style={{background: 'blue', color: 'white'}}>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-90deg-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M14.854 4.854a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 4H3.5A2.5 2.5 0 0 0 1 6.5v8a.5.5 0 0 0 1 0v-8A1.5 1.5 0 0 1 3.5 5h9.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4z"/>
</svg>
				</Button>
				
				<br />
			</div>
			<Dialog style={{alignItems: 'center'}} fullWidth open={open} onClose={handleClose}>
				<DialogContent>
					<Typography variant='h4' align='center' gutterBottom><b>Edit Details</b></Typography>
					<form  >
					<TextField value={name} style={{marginBottom: '3%'}}  variant='outlined' fullWidth onChange={(e) => setName(e.target.value)}/>
				<TextField multiline rows={7} value={desc} variant='outlined' fullWidth onChange={(e) => setTitle(e.target.value)}/>
				</form>
				</DialogContent>
				
			
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={handleUpdate} style={{backgroundColor: 'orange', color: 'whitesmoke'}}>Update</Button>
			</DialogActions>
			</Dialog>
			{
					<>
					<Typography align='center' variant='h1' gutterBottom><b>Modules</b></Typography>
					<TableContainer component={Paper}>
		<Table className={classes.table} aria-label="simple table">
			<TableHead>
			<TableRow>
			<TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}}><b className='text-lg font-bold italic'>Title</b></TableCell>
			<TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="left"><b className='text-lg font-bold italic'>Description</b></TableCell>
			<TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="right"><b className='text-lg font-bold italic'>Actions</b></TableCell>
			</TableRow>
			</TableHead>
					{
						modules.map(module => (
				
							<>
							<DQConfigView module={module} match={match} key={module.id}/>	
			
					</>
						))
					}
					
		</Table>
		</TableContainer>
					</>
			
		}
		  
		</div>
		: 
		<div>
			<form onSubmit={handleSubmitNew}>
			<Typography variant='h1' align='center'>Add New Configuration details</Typography>
		<TextField style={{marginBottom: '20px'}} label='Title'  variant='outlined' fullWidth onChange={(e) => setName(e.target.value)}/>
		<TextField multiline rows={7} label='Description'  variant='outlined' fullWidth onChange={(e) => setDesc(e.target.value)}/>  
		<Button fullWidth style={{background: 'orange', color: 'white', marginTop: '5%'}} >Add New</Button>
	  </form>
		</div>
		}
          </Card>
        </div>
      </div>
     
    
  
      </>
		<Dialog open={openAdd} fullWidth onClose={handleCloseAdd}>
		<form onSubmit={handleSubmit}>
			    <Typography variant='h4' align='center'  ><b>Add New Modules</b></Typography>
	  <DialogContent>
		<TextField style={{marginBottom: '5%'}} label='Title'  variant='outlined' fullWidth onChange={(e) => setTitle(e.target.value)}/>
		<TextField rows={7} multiLine label='Description' variant='outlined' fullWidth onChange={(e) => setDesc(e.target.value)}/>  
		
	  </DialogContent>
	  <DialogActions>
		  <Button onClick={handleCloseAdd} variant='contained' color='secondary'>Cancel</Button>
		  <Button type="submit" style={{background:'orange', color:'white'}} >Add New</Button>
	  </DialogActions>
          
		</form>
      
      </Dialog>
    
		</>
	)
	
}

export default DQModule
