import { Typography , Card, makeStyles, TableContainer, Paper, TableHead, TableRow, TableCell, TableBody, Button} from "@material-ui/core"
import { useEffect } from "react"
import { useState } from "react"
import { Table } from "react-bootstrap"
import DQRLayout from "../../components/DQRLayout/DQRLayout"
import { db } from "../../firebase"
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import { firebaseLooper } from "../../utils/tools"
import DQRSpecView from "./DQRSpecView"

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


function DQRSpecs({match}) {
	const [purpose, setPurpose] = useState({})
	const [configData, setConfigData] = useState([])
	const [input, setInput] = useState('')
	const classes = useStyles()
	useEffect(() => {
		db.collection('DQNewReport')
		.doc(match.params.id)
		.collection('content')
		.doc('specifications')
		.onSnapshot(snapshot => {
			const data = snapshot.data()
			setPurpose(data)
		})
		db.collection('DQNewReport')
		.doc(match.params.id)
		.collection('content')
		.doc('specifications')
		.collection('specDetails')
		.onSnapshot(snapshot => {
			const data = firebaseLooper(snapshot)
			data.sort(function (a,b) {
				return(a.index-b.index)
			})
			setConfigData(data)
			
		})
	}, [])
	return (
		<div>
			<DQRLayout match={match}/>
			 <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
           <div>
			{purpose && <Typography variant='h1' align='center' gutterBottom><b>{purpose.name}</b></Typography>
			}<hr />
		
			 <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}}>Title</TableCell>
            <TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="right">Input(Glass)</TableCell>

            <TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="right">Actions</TableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {configData.map((row) => (
          	 <DQRSpecView key={row.id} match={match} row={row}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
			
		</div>
          </Card>
        </div>
      </div>
		</div>
	)
}

export default DQRSpecs
