import { Typography , Card, makeStyles} from "@material-ui/core"
import { useEffect } from "react"
import { useState } from "react"
import DQRLayout from "../../components/DQRLayout/DQRLayout"
import { db } from "../../firebase"

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


function GeneralPrint({match}) {
	const [purpose, setPurpose] = useState({})
	const classes = useStyles()
	useEffect(() => {
		db.collection('DQNewReport')
		.doc(match.params.id)
		.collection('content')
		.doc('general')
		.onSnapshot(snapshot => {
			const data = snapshot.data()
			setPurpose(data)
		})
	}, [])
	return (
		<div>
			
			 <div >
        <div >
          <Card >
           <div style={{height: '100vh'}}>
			{purpose && <Typography variant='h1' align='center' gutterBottom><b>{purpose.title}</b></Typography>
			}<hr />
			{purpose && <Typography variant='body1' align='left' gutterBottom><p className='italic'>{purpose.desc}</p></Typography>
			}<hr />
			
		
		</div>
          </Card>
        </div>
      </div>
		</div>
	)
}

export default GeneralPrint
