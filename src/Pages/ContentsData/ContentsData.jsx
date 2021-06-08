
import React, {useEffect, useState} from 'react'
import ContentDataBox from './ContentDataBox'
import { Button, Card, Container, Grid, makeStyles, Paper, TableCell, TableFooter, TablePagination, TableRow, TextField, Typography, useTheme } from '@material-ui/core';
import { db } from '../../firebase';
import { firebaseLooper } from '../../utils/tools';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import PropTypes from 'prop-types';
import ContentDashboardLayout from '../../components/ContentSidebar/ContentDashboardLayout';
import { useHistory } from 'react-router-dom';
import { Autocomplete } from '@material-ui/lab';
import Page from '../../components/Page';

const useStyles = makeStyles((theme) => ({
  layoutRoot: {
    
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
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};



function TablePaginationActions(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}


const ContentsData = ({match}) => {
    
    const [title, setTitle] = useState('')
     const [mTitle, setMTitle] = useState('')
        const [content, setContent] = useState([{}])
    const history = useHistory()
   const classes = useStyles()

    useEffect (() => {
       db.collection('machineData')
       .doc(match.params.id)
        .onSnapshot(doc => {
         setMTitle(doc.data().title)
        })

        db.collection('moduleData')
        .where('mid' , '==' , `${match.params.id}`)
        .onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setContent(data)
        })
    }, [])
        
     const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, content.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


    return (
      <Page title='Modules | LyoIms'>
          <Paper className='bg-gray-100'>
        <ContentDashboardLayout match={match} />
         <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card  className={classes.content}>
            < >
            
        <div >
          <Card >
            <Typography align='left' variant='h4'><b>{mTitle}</b></Typography>
          <div>
              <Typography align='center' variant='h1'><b>Modules</b></Typography>
               <Typography align='center' variant='body2' >These are all the required Modules</Typography>
              </div>
              <br/>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
             <div className="relative"> 
                 <input style={{ border: '2px solid whitesmoke'}} onChange={(e) => setTitle(e.target.value)} type="text" className="h-14 w-96 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none" placeholder="Search Modules..."/>
                  <div className="absolute top-4 right-3"> <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i> </div>
              </div>
              <Button style={{width: '15%',marginLeft: '4%', marginRight: '3%', backgroundColor: 'orange', color: 'white'}} href={`/machine-data/${match.params.id}/Add-module`}>ADD New </Button>
              </div>
              
              <br />
              <Grid  className='bg-gray-100' container spacing={3}>
                {(
             content
          ).
          filter((data) => {
              if(title === ""){
              return data
          } else if (data.title.toLowerCase().includes(title.toLocaleLowerCase())){
                  return data
                  }
          })
          .map((data) => (
            <ContentDataBox key={data.id} data={data} match={match} />
          ))}
              </Grid>
              
          </Card>
        </div>
      </>
          </Card>
        </div>
      </div>
         
      </Paper>
      </Page>
     
     
    )
}

export default ContentsData
