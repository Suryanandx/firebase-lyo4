import { useEffect, useState } from 'react';
import { Link as RouterLink, NavLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  ListItem,
  Typography
} from '@material-ui/core';
import {
  BarChart as BarChartIcon,
   Activity as ActivityIcon,
  Home as HomeIcon
} from 'react-feather';
import ReceiptIcon from '@material-ui/icons/Receipt';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import ReportIcon from '@material-ui/icons/Report';
import AssessmentIcon from '@material-ui/icons/Assessment';
import SecurityIcon from '@material-ui/icons/Security';
import BuildIcon from '@material-ui/icons/Build';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import NavItem from './NavItem';
import { useAuth } from '../context/AuthContext';
import { db } from '../../firebase';
import { firebaseLooper } from '../../utils/tools';
import PhoneCallbackIcon from '@material-ui/icons/PhoneCallback';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import CompareIcon from '@material-ui/icons/Compare';


const items = [
  {
    title: 'Approval',
  href: '/DQR',
    icon: ChromeReaderModeIcon,
   
},
   {
        title: 'Purpose',
      href: '/DQR',
        icon: ActivityIcon,
       
    },
  {
        title: 'General-Information',
        href: '/DQR',
        icon: AssessmentIcon

    },
    {
        title: 'Equipment-Config',
        href: '/DQR',
        icon: ReceiptIcon
    },
    {
        title: 'Specifications',
      href: '/DQR',
        icon: ActivityIcon,
       
    },
    {
      title: 'Design-Specs',
    href: '/DQR',
      icon: BorderColorIcon,
     
  },

    {
      title: 'Safety',
    href: '/DQR',
      icon: SecurityIcon,
     
  },
{
      title: 'Attachments',
    href: '/DQR',
      icon: BuildIcon,
     
  },
  {
    title: 'Print',
  href: '/DQR',
    icon: BuildIcon,
   
}
];

const DashboardSidebar = ({ onMobileClose,match, openMobile }) => {
  const location = useLocation();
   const [navbar, setNavbar] = useState([])
  const {currentUser} = useAuth()
  const [userData, setUserData] = useState([])
  const [key, setKey] = useState('')
  useEffect(() => {
     db.collection('company').doc('navbar').onSnapshot(snapshot => {
      const data = snapshot.data()
      setNavbar(data)
    })
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    db.collection('users').where('email', '==', `${currentUser.email}`).onSnapshot(doc => {
      const data = firebaseLooper(doc)
      setUserData(data[0])
    })
    db.collection('DQNewReport').doc(match.params.id).onSnapshot(snap => {
      setKey(snap.data().mid)
    })
  }, []);

  const content = (
    <Box
      style={{
        
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <a style={{textDecoration: 'none', color:'white', backgroundColor: 'black'}} className="flex items-center w-full px-3 mt-3" href="/">
			
                 <img
    alt="Logo"
    width="50px"
    src={navbar.url}
   
  />
			<span className="ml-2 text-sm font-bold uppercase ">{navbar.name}</span>

		</a>
      <Divider />
      <Box m={2} >
        <List>        
        <div className="flex items-center w-full h-12 px-3 mt-2 rounded">
        <ListItem
      disableGutters
      style={{
        display: 'flex',
        
       
      }}
     
    >
      
      <Button
      
        component={RouterLink}
        style={{
          background: 'black',
          color: 'orange',
          fontWeight: 'medium',
          justifyContent: 'flex-start',
          letterSpacing: 0,
          py: 1.25,
          textTransform: 'none',
          width: '100%',
          
        }}
        to='/'
      >
       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bar-chart-fill" viewBox="0 0 16 16">
  <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z"/>
</svg>
        <span>
          
            <b className='ml-2'>Dashboard</b> 
         
        </span>
      </Button>
      </ListItem> 
            </div>
              {items.map((item) => (
              <div key={item.title} className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300">
            <NavItem
              href={`${item.href}/${match.params.id}/${item.title}`}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
            </div>
          ))}
           
         
        </List>
      </Box>
      <Box style={{ flexGrow: 1 }} />
      <Box
      m={2}
      p={2}
        style={{
          backgroundColor: 'whitesmoke',
          
        }}
      >
        <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          Back to DQ ?
        </Typography>
        <Box
        pt= {2}
          style={{
            display: 'flex',
            justifyContent: 'center',
            
          }}
        >
          <Button
          component={NavLink}
          to={`/machine-data/${key}/DQ-New-Reports`}
          style={{backgroundImage: 'linear-gradient(to left bottom, #fa630f, #fc8218, #fd9d29, #feb63f, #ffce59)', color: "white", width: "150px"}}
          
            variant="contained"
          >
            Return
          </Button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            style: {
              width: 256,
              backgroundColor: '#43425D'
            }
          }}
        >
          {content}
        </Drawer>
     
      </Hidden>
        
      <Hidden smDown>
        <Drawer
          anchor="left"
          variant="persistent"
          open
          PaperProps={{
            style: {
              width: 256,
             backgroundColor: '#43425D'
             
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
        
      
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default DashboardSidebar;