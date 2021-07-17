import { Button, Card, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow , Typography} from "@material-ui/core"
import { useEffect, useState } from "react"
import { db } from "../../firebase"
import { firebaseLooper } from "../../utils/tools"
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import ContentDashboardLayout from "../../components/ContentSidebar/ContentDashboardLayout";
import moment from "moment";
import { NavLink } from "react-router-dom";
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


function DQRnew({match}) {
	const [reports, setReports] = useState([])
	const classes = useStyles()
	useEffect(() => {
		db.collection('DQNewReport')
		.where('mid', '==', `${match.params.id}`)
		.onSnapshot(snapshot => {
			const data = firebaseLooper(snapshot)
			setReports(data)
		})
	}, [])
	return (<>
	<ContentDashboardLayout match={match}/>
		 <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
		  <br />
		  <Typography variant='h1' align='center' gitterBottom><b>DQ Reports</b></Typography>
		  <hr />
		  <br />

       <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}}>Name</TableCell>
            <TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="right">Description</TableCell>
            <TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="right">Date</TableCell>
            <TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="right">Actions</TableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.map((row) => (
            <TableRow key={row.name}>
              <TableCell style={{background: '#E8F6EF'}} component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.desc}</TableCell>
              <TableCell align="right">{row.timestamp.toDate().toString().substring(0,15)}</TableCell>
             
              <TableCell align="right"><Button className='animate-bounce' component={NavLink} to={`/DQR/${row.id}/Approval`}><ArrowForwardIcon/></Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          </Card>
        </div>
      </div>
		</>
	)
}

export default DQRnew
