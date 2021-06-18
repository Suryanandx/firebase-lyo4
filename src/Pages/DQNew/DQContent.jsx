import { Button, Card, Dialog, makeStyles, Toolbar } from "@material-ui/core"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import ContentDashboardLayout from "../../components/ContentSidebar/ContentDashboardLayout"
import DQLayout from "../../components/DQNewSidebar/DQLayout"
import { db } from "../../firebase"
import { firebaseLooper } from "../../utils/tools"
import DashboardNavbar from "../QualityReport/DashboardNavbar"
import AddContent from "./DQComponents/AddContent"
import DQContentView from "./DQComponents/DQContentView"


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
    minWidth: 650,
  },
}));

function DQContent({match}) {
	const [content, setcontent] = useState([])
	const [eqConfig, setEqConfig] = useState([])
	const [open, setOpen] = useState(false)
	const history = useHistory()
	const classes = useStyles()
	useEffect(() => {
		db.collection('DQNew').doc(match.params.id).collection('content').onSnapshot((snapshot) => {
			const data = firebaseLooper(snapshot)
			 data.sort(function(a,b) {
                return(a.type-b.type)
            })
			setcontent(data)
		})
		
	}, [])
	function handleOpen () {
		setOpen(true)
	}
	function handleClose(){
		setOpen(false)
	}
	return (
		<div>
		<DQLayout match={match}/>{/*Layout DQLayout --> Match (Content ID)  */}
			
			 <div >
        <div >
          <Card >
		  <Button onClick={(e) => history.go(-1)} style={{background: 'blue', color: 'white', margin: '4%'}}>Return</Button>
          <Toolbar style={{display:'flex', justifyContent:'flex-end', padding: '3%'}}>
				<Button onClick={handleOpen} style={{background: 'orange', width: '12%', color: 'white', marginRight: '10px'}}>Add new</Button>
				<Button onClick={handleOpen} style={{background: 'orange', width: '12%', color: 'white'}}>EQ Config</Button>
			</Toolbar>
			{content.map(data => (
				<DQContentView content={data}/>
			))}
			<Dialog fullScreen open={open} onClose={handleClose}>
				<Button onClick={handleClose}>Close</Button>
				<AddContent match={match}/>
			</Dialog>
          </Card>
        </div>
      </div>
			
		</div>
	)
}

export default DQContent
