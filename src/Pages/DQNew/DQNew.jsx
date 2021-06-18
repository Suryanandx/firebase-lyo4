import { Button, Card, Toolbar, Dialog } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react"
import ContentDashboardLayout from "../../components/ContentSidebar/ContentDashboardLayout";
import {db} from '../../firebase'
import {firebaseLooper} from '../../utils/tools'
import AddMaterial from "./DQComponents/AddMaterial";
import DQNewView from "./DQComponents/DQNewView";

const useStyles = makeStyles((theme) => ({
  layoutRoot: {
    backgroundColor: 'white',
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
     background:'linear-gradient(#f3f3f3, #e7e7e7)' 
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
    paddingLeft: 256
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
    table: {
    minWidth: 500,
  },
}));

function DQNew({match}) {
	const [reports, setReports] = useState([])
	const [open, setOpen] = useState(false)
	const classes = useStyles()

	useEffect(() => {
		db.collection('DQNew').where('mid', '==', `${match.params.id}`).onSnapshot(snapshot => {
			const data = firebaseLooper(snapshot)
			setReports(data)
		})
	}, [])

	const handleOpen = () => {
		setOpen(true)
	}
	const handleClose = () => {
		setOpen(false)
	}
	return (
		<>
		<ContentDashboardLayout match={match}/>
		  <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
		  <Toolbar style={{display: 'flex', justifyContent: 'flex-end'}}>
			<Button onClick={handleOpen} style={{backgroundColor:'orange', color: 'white', width: '12%' }}>Add New</Button>
		  </Toolbar>
           <div>
			{
				reports.map(data => (
					<>
					<DQNewView key={data.id} report={data}/>
					
					</>
				))
			}
		</div>
		<Dialog onClose={handleClose} open={open} fullScreen>
			 <Toolbar style={{display: 'flex', justifyContent: 'flex-start'}}>
			<Button onClick={handleClose} style={{backgroundColor:'orange', color: 'white', width: '10%' }}>close</Button>
		  </Toolbar>
			<AddMaterial match={match}/>
		</Dialog>
          </Card>
        </div>
      </div>
      </>
		
	)
}

export default DQNew
