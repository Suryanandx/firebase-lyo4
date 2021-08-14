import { DialogContent, makeStyles } from "@material-ui/core";
import { Button, Dialog, Typography, TextField, DialogActions, Card } from "@material-ui/core"
import { useEffect } from "react"
import { useState } from "react"
import DQLayout from "../../components/DQNewSidebar/DQLayout";
import { db } from "../../firebase"
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

function DQGeneral({match}) {
	const [purpose, setPurpose] = useState({})
	const [title, setTitle] = useState('')
	const [ desc, setDesc] = useState('')
	const [open, setOpen] = useState(false)
	const [opendelete, setOpenDelete] = useState(false)
	const classes = useStyles()

	function handleOpen(){
		setOpen(true)
	}
	function handleClose(){
		setOpen(false)
	}
	function handleOpenDel(){
		setOpenDelete(true)
	}
	function handleCloseDel(){
		setOpenDelete(false)
	}

	function handleUpdate(e){
		db.collection('DQNew')
		.doc(match.params.id)
		.collection('content')
		.doc('general')
		.update({title, desc})
	}

	function handleSubmit(){
		db.collection('DQNew')
		.doc(match.params.id)
		.collection('content')
		.doc('general')
		.set({title, desc})
	}
	useEffect(() => {
		db.collection('DQNew')
		.doc(match.params.id)
		.collection('content')
		.doc('general')
		.onSnapshot(snapshot => {
			const data = snapshot.data()
			setPurpose(data)
			if(data){
				setTitle(data.title)
			setDesc(data.desc)
			}
			
		})
	}, [])
	return (
		<>
		{purpose ?
			(<>
			<DQLayout match={match}/>
		 <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
           <div style={{height: '100vh'}}>
			<Typography variant='h1' align='center' gutterBottom><b>{purpose.title}</b></Typography>
			<hr />
			<Typography variant='body1' align='left' gutterBottom><p className='italic'>{purpose.desc}</p></Typography>
			<hr />
			<div style={{display: 'flex', marginBottom: 'auto', paddingRight: '3%', justifyContent: 'flex-end'}}>
				<Button component={RouterLink} to={`/DQ/${match.params.id}/Purpose`} style={{background: 'blue', color: 'white', marginLeft: '25px',  marginRight: '25px'}}>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-90deg-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z"/>
</svg>
					</Button>
				<Button style={{color: 'white', background: 'orange'}} onClick={handleOpen}>Edit</Button>
				<Button component={RouterLink} to={`/DQ/${match.params.id}/Equipment-Config`} style={{background: 'blue', color: 'white', marginLeft: '25px'}}>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-90deg-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M14.854 4.854a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 4H3.5A2.5 2.5 0 0 0 1 6.5v8a.5.5 0 0 0 1 0v-8A1.5 1.5 0 0 1 3.5 5h9.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4z"/>
</svg>
				</Button>
			</div>
			<Dialog style={{alignItems: 'center'}} fullWidth open={open} onClose={handleClose}>
				<DialogContent>
					<Typography variant='h4' align='center' gutterBottom><b>Edit Details</b></Typography>
					<form  >
					<TextField style={{marginBottom: '3%'}} value={title} variant='outlined' fullWidth onChange={(e) => setTitle(e.target.value)}/>
				<TextField multiline rows={7} value={desc} variant='outlined' fullWidth onChange={(e) => setDesc(e.target.value)}/>
				</form>
				</DialogContent>
				
				
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={handleUpdate} style={{backgroundColor: 'orange', color: 'whitesmoke'}}>Update</Button>
			</DialogActions>
			</Dialog>
		</div>
          </Card>
        </div>
      </div>
      </>)
		

		: 
		<>
		<DQLayout match={match}/>
		<div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
          
	 <div style={{padding: '10%', paddingTop: '0'}} >
		   <Typography variant='h1' align='center' gutterBottom><b>Add New Information</b></Typography>	
		<TextField style={{marginBottom: '20px'}} label='Title' variant='outlined' fullWidth onChange={(e) => setTitle(e.target.value)}/>
		<TextField style={{marginBottom: '5%'}} label='Description' multiLine rows={7}  variant='outlined' fullWidth onChange={(e) => setDesc(e.target.value)}/>  
		<Button disabled={title === '' || desc === '' || desc>300 || title > 35} fullWidth style={{background: 'orange', color: 'white'}} onClick={handleSubmit}>Add New</Button>
	  </div>
          </Card>
        </div>
      </div>
      </>}
		</>
	)
}

export default DQGeneral
