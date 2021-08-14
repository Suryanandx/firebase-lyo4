import { DialogContent, makeStyles,  Paper,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow  } from "@material-ui/core";
import { Button, Dialog, Typography, TextField, DialogActions, Card } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { useEffect } from "react"
import { useState } from "react"
import DQLayout from "../../components/DQNewSidebar/DQLayout";
import { db } from "../../firebase"
import { firebaseLooper } from "../../utils/tools";
import DQmodules from "../DQNew/DQmodules";
import DQConfigView from "./DQCOnfigDetails/DQConfigView";
import DQSpecsView from "./DQCOnfigDetails/DQSpecsView";
import DQModule from "./DQModule/DQModule";
import {
  NavLink as RouterLink,
  matchPath,
  useLocation
} from 'react-router-dom';


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

function DQSpecs({match}) {
	const [purpose, setPurpose] = useState({})
	const [name, setName] = useState('')
	const [review, setReview] = useState('')
	const [specs,setSpecs] = useState([])
	const [ desc, setDesc] = useState('')
	const [open, setOpen] = useState(false)
	const [openEdit, setOpenEdit] = useState(false)
	const [openAdd, setOpenAdd] = useState(false)
	const [index, setIndex] = useState(0)
		const [opendelete, setOpenDelete] = useState(false)
	const [titleModule, setTitleModule] = useState('')
	const [ descModule, setDescModule] = useState('')
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
		.doc('specifications')
		
		.update({name, desc})
	}
	

	function handleSubmit(e){
		e.preventDefault()
		db.collection('DQNew')
		.doc(match.params.id)
		.collection('content')
		.doc('specifications')
		.collection('specDetails')
		.add({ desc,index})
	}

	function handleSubmitNew(e){
		e.preventDefault()
		db.collection('DQNew')
		.doc(match.params.id)
		.collection('content')
		.doc('specifications')
		.set({name, desc})
	}
	useEffect(() => {
		db.collection('DQNew')
		.doc(match.params.id)
		.collection('content')
		.doc('specifications')
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
		.doc('specifications')
		.collection('specDetails')
		.onSnapshot(snapshot => {
			const data = firebaseLooper(snapshot)
			data.sort(function(a,b){
				return(a.index-b.index)
			})
			setSpecs(data)
			setIndex(data.length)
			
		})
	}, [])
	return (
		<div>
		
			<>
			<DQLayout match={match}/>
		 <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
           <div style={{height: '100vh'}}>
			{
			purpose ?	<>
				<Typography variant='h1' align='center' gutterBottom><b>{purpose.name}</b></Typography>
			<hr />
				
			<div style={{display: 'flex',  paddingRight: '3%',marginBottom: '30px', justifyContent: 'flex-end'}}>
				<Button component={RouterLink} to={`/DQ/${match.params.id}/Equipment-Config`} style={{background: 'blue', color: 'white', marginLeft: '25px',  marginRight: '4%'}}>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-90deg-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z"/>
</svg>
					</Button>
				<Button style={{color: 'white', background: 'black', marginRight: '4%'}} onClick={handleOpenAdd}>Add Specs</Button>
				
				<Button component={RouterLink} to={`/DQ/${match.params.id}/Design-Specs`} style={{background: 'blue', color: 'white', marginLeft: '25px'}}>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-90deg-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M14.854 4.854a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 4H3.5A2.5 2.5 0 0 0 1 6.5v8a.5.5 0 0 0 1 0v-8A1.5 1.5 0 0 1 3.5 5h9.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4z"/>
</svg>
				</Button>
			</div>
			<Dialog style={{alignItems: 'center'}} fullWidth open={open} onClose={handleClose}>
				<DialogContent>
					<Typography variant='h4' align='center' gutterBottom><b>Edit Details</b></Typography>
					<form  >
					<TextField style={{marginBottom: '3%'}} value={name} variant='outlined' fullWidth onChange={(e) => setName(e.target.value)}/>
				<TextField multiline rows={7} value={desc} variant='outlined' fullWidth onChange={(e) => setDesc(e.target.value)}/>
				</form>
				</DialogContent>
				
				
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={handleUpdate} style={{backgroundColor: 'orange', color: 'whitesmoke'}}>Update</Button>
			</DialogActions>
			</Dialog>
			{
					<>
					<TableContainer component={Paper}>
		<Table className={classes.table} aria-label="simple table">
			<TableHead>
			<TableRow>
			<TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align='left' ><b className='text-lg font-bold italic'>Description</b></TableCell>
			
			<TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="right"><b className='text-lg font-bold italic'>Actions</b></TableCell>
			</TableRow>
			</TableHead>
					{
						specs.map(specs => (
				
							<>
							<DQSpecsView specs={specs} match={match} key={specs.id}/>	
			
					</>
						))
					}
					
		</Table>
		</TableContainer>
					</>
					}
					</>
					 :

					<form onSubmit={handleSubmitNew}>
						<div style={{padding: '10%', paddingTop: '0'}} >
						<Typography variant='h1' align='center' gutterBottom><b>Add New Specification Details</b></Typography>	
						<TextField style={{marginBottom: '20px'}} label='Title' variant='outlined' fullWidth onChange={(e) => setName(e.target.value)}/>
						<TextField style={{marginBottom: '5%'}} label='Description' multiLine rows={7}  variant='outlined' fullWidth onChange={(e) => setDesc(e.target.value)}/>  
						<Button type="submit" disabled={ desc>300 || name > 35} fullWidth style={{background: 'orange', color: 'white'}} >Add New</Button>
					</div>
					</form>
			
		
		}
		</div>
		
          </Card>
        </div>
      </div>
      </> 
	
		<Dialog open={openAdd} fullWidth onClose={handleCloseAdd}>
			<form onSubmit={handleSubmit}>
				  <Typography variant='h4' align='center' gutterBottom><b>Add New Specifications</b></Typography>
	 <Alert severity='info'>Reviews are generally added from glass</Alert>
	  <DialogContent>
		   <>
		<TextField required label='Description' style={{marginBottom: '20px'}} multiLine rows={5}  variant='outlined' fullWidth onChange={(e) => setDesc(e.target.value)}/>
		 
		
	  </> 
	  </DialogContent>
	  <DialogActions>
		  <Button type="submit" style={{background: 'orange', color:'white'}} >Add New</Button>
	  </DialogActions>

			</form>
        
	
          
      </Dialog>
     
		
	
	</div>
)}

export default DQSpecs
