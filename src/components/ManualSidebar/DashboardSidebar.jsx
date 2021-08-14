import { useEffect, useState } from 'react';
import { Link as RouterLink, NavLink, useHistory, useLocation } from 'react-router-dom';
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
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
  PhoneCall as PhoneIcon,
  LogOut as LogOutIcon,
  Activity as ActivityIcon,
  Download as AddIcon,
  Home as HomeIcon
} from 'react-feather';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import VideoCallIcon from '@material-ui/icons/VideoCall'
import NavItem from './NavItem';
import { useAuth } from '../context/AuthContext';
import { db } from '../../firebase';
import { firebaseLooper } from '../../utils/tools';


const items = [
  {
        title: 'Steps',
      href: '/Manuals',
        icon: ActivityIcon,
       
    },
   
     {
        title: '3D-Model',
        href: '/Manuals',
        icon: AddIcon

    }
    
];

const DashboardSidebar = ({ onMobileClose,match, openMobile }) => {
  const location = useLocation()
   const [navbar, setNavbar] = useState([])
  const {currentUser} = useAuth()
  const history = useHistory()
  const [userData, setUserData] = useState([])
  const [manual, setManual] = useState('')
  
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
     db.collection('manualData').doc(match.params.id).onSnapshot(doc => {
      setManual(doc.data().mid)
    })
  }, [location.hrefname]);

  const handleReturn = () => {
    history.push(`/machine-data/Manuals/${manual}/Manuals`)
  }

  const content = (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <a style={{textDecoration: 'none', color:'white', backgroundColor: 'black'}} className="flex items-center w-full px-3 mt-3" href="#">
			
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
        
          <>
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
          </>
          
         
          {items.map((item) => (
            <div key={item.title} className="flex items-center w-full h-12 px-3 mt-2 rounded ">
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
          Back To Manuals?
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
         to={`/machine-data/Manuals/${manual}/Manuals`}
          style={{backgroundImage:' linear-gradient(to left bottom, #a39df3, #8885e8, #6b6fdd, #4859d1, #0144c6)', color: "white", width: "150px"}}
          startIcon={<KeyboardReturnIcon/>}
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
              backgroundColor:'#43425D'
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
              backgroundColor:'#43425D'
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