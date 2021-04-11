import React, {useEffect, useState} from 'react'
import { Button, Card, Container, makeStyles, TableCell, TableFooter, TablePagination, TableRow, Typography, useTheme } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { db } from '../../../firebase';
import { firebaseLooper } from '../../../utils/tools';
import ComponentDataBox from './ComponentDataBox';
import { Skeleton } from '@material-ui/lab';
import ModuleDashboardLayout from '../../../components/ModuleSidebar/ModuleDashboardLayout'
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
   background:'linear-gradient(#f3f3f3, #e7e7e7)' 
  },
  container: {
      display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
  },
  content: {
     background:'linear-gradient(#f3f3f3, #e7e7e7)' ,
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


const ModuleComponents = ({match}) => {
    
    
        const [content, setContent] = useState([{}])
    const history = useHistory()
   const classes = useStyles()

    useEffect (() => {
        db.collection('componentData')
        .where('module_id' , '==' , `${match.params.id}`)
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
        <div style={{display: 'flex'}}>
        <ModuleDashboardLayout match={match}/>
         <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
            <Container >
             <Typography variant='h2' align='center' gutterBottom><b>Modules Components</b> </Typography>
        <div className={classes.container}>
          <Card className={classes.content}>
          
              {(rowsPerPage > 0
            ? content.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : content
          ).map((data) => (
            <ComponentDataBox key={data.id} data={data} match={match} />
          ))}
           
          
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
            <TableFooter style={{display: 'flex', justifyContent: 'flex-end'}}>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={content.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
          </Card>
        </div>
      </Container>
          </Card>
        </div>
      </div>
         
      </div>
     
    )
}

export default ModuleComponents