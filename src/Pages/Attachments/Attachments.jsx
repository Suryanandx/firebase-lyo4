import { Dialog, Paper, TableCell, makeStyles, Card, TableContainer, TableHead, TableRow, Typography,Toolbar, DialogContent, DialogActions, Button, TextField, Select } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import DQLayout from "../../components/DQNewSidebar/DQLayout";
import { db } from "../../firebase";
import { firebaseLooper } from "../../utils/tools";
import AttachView from "./AttachView/AttachView";

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


function Attachments({match}) {
	const [contents, setContents] = useState([])
	const [contents1, setContents1] = useState([])
	const [open, setOpen] = useState(false)
	const [title, setTitle] = useState('')
	const [dno, setDno] = useState('')
	const [rev, setRev] = useState('')
	const [desc, setDesc] = useState('')
	const [type, setType] = useState(0)
	const classes = useStyles()
	useEffect(() => {
		db.collection('DQNew').doc(match.params.id)
		.collection('content').doc('attachments')
		.collection('details')
		.onSnapshot(snapshot => {
			const data = firebaseLooper(snapshot)
			data.sort(function(a,b){
				return (a.index - b.index)
			})
			setContents(data)
		})
		
	}, [])
	function handleOpen(){
		setOpen(true)
	}
	function handleClose(){
		setOpen(false)
	}
	
	function handleSubmit(e){
		e.preventDefault()
		const index = contents.length
		db.collection('DQNew').doc(match.params.id)
		.collection('content').doc('attachments')
		.collection('details').add({desc,index,rev,dno})
	}
	return (
		<>
		<DQLayout match={match}  />
		 <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
		<div style={{color: '#43425D'}}>
			
			<br />
			<Typography align='center' variant='h1' gutterBottom><b>ATTACHMENTS</b></Typography>
			<Toolbar style={{display: 'flex', justifyContent: 'flex-end'}}>
				<Button onClick={handleOpen} style={{background: 'orange', color: 'white'}}>Add Items</Button>
			</Toolbar>

			<TableContainer component={Paper}>
		<Table  aria-label="simple table">
			<TableHead>
			<TableRow>
			<TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}}><b className='text-lg font-bold italic'>_</b></TableCell>
			<TableCell align="left" style={{background: '#4C4C6D', color: 'white', font: 'bold'}}><b className='text-lg font-bold italic'>Description</b></TableCell>
			<TableCell align="left" style={{background: '#4C4C6D', color: 'white', font: 'bold'}}><b className='text-lg font-bold italic'>Drawing Number</b></TableCell>
			<TableCell align="left" style={{background: '#4C4C6D', color: 'white', font: 'bold'}}><b className='text-lg font-bold italic'>Revision Number</b></TableCell>
			<TableCell align="right" style={{background: '#4C4C6D', color: 'white', font: 'bold'}}><b className='text-lg font-bold italic'>Options</b></TableCell>
			</TableRow>
			</TableHead>
					{
						contents.map(module => (
				
							<>
							<AttachView module={module} match={match} key={module.id}/>	
			
							</>
						))
					}
					
		</Table>
		</TableContainer>
		<Dialog open={open} onClose={handleClose} fullWidth>
			<form onSubmit={handleSubmit}>
				<Typography variant='h3' align='center' gutterBottom><b>Add new items</b></Typography>
	<DialogContent>
		<TextField style={{marginBottom: '3%'}} required multiLine rows={7} variant='outlined' label='Desctiption' fullWidth onChange={(e) => setDesc(e.target.value)}/>	
		<TextField required style={{marginBottom: '3%'}} variant='outlined' label='Drawing Number' fullWidth onChange={(e) => setDno(e.target.value)}/>
		<TextField required multiLine rows={7} variant='outlined' label='Revision Number' fullWidth onChange={(e) => setRev(e.target.value)}/>	
		{/* <Select style={{marginBottom: '3%'}} variant='outlined'  fullWidth onChange={(e) => setType(e.target.value)}>
			<option className='capitalize' value={0}>Documentation</option>
			<option value={1}>ACCESSORIES</option>
		</Select> */}
		
	</DialogContent>
	<DialogActions>
		<Button color='secondary' onClick={handleClose} variant='contained'>Cancel</Button>
		<Button type="submit"   style={{background: 'orange', color: 'white'}}>Add New</Button>
	</DialogActions>
			</form>
	

</Dialog>
		</div>
          </Card>
	  
        </div>
      </div>
	
		 <div style={{display: 'flex', justifyContent: 'flex-end'}}>
		<Button component={NavLink} to={`/DQ/${match.params.id}/Safety`} style={{background: 'blue', color: 'white', marginLeft: '25px',  marginRight: '4%'}}>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-90deg-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z"/>
</svg>
					</Button>  
					<Button component={NavLink} to={`/DQ/${match.params.id}/Abbreviations`} style={{background: 'blue', color: 'white', marginLeft: '25px'}}>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-90deg-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M14.854 4.854a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 4H3.5A2.5 2.5 0 0 0 1 6.5v8a.5.5 0 0 0 1 0v-8A1.5 1.5 0 0 1 3.5 5h9.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4z"/>
</svg>
				</Button>
	  </div>
		</>
	)
}

export default Attachments
