import { useEffect, useState } from 'react';
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom';
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
        title: 'Add-Step',
        href: '/Manuals',
        icon: AddIcon

    }
    
];

const DashboardSidebar = ({ onMobileClose,match, openMobile }) => {
  const location = useLocation();
  const {currentUser} = useAuth()
  const history = useHistory()
  const [userData, setUserData] = useState([])
  const [manual, setManual] = useState('')
  
  useEffect(() => {
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
    src="https://i.ibb.co/7CKGfX5/Arizon-logo-2x.jpg"
   
  />
			<span  className="ml-2 text-sm font-bold">ARIZON SYSTEMS</span>

		</a>
      <Divider />
      <Box m={2} >
        <List>
        
          <ListItem>
            <a style={{textDecoration: 'none', color:'orange'}} className="flex items-center w-full h-12 px-3 mt-2 text-gray-200 bg-black rounded" href="/">
                    <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
 				</svg>
					
					<span className="ml-2 text-sm font-medium">Dashboard</span>
 			</a>
          </ListItem>
          
         
          {items.map((item) => (
            
              <NavItem
              href={`${item.href}/${match.params.id}/${item.title}`}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
            
            
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
          onClick={handleReturn}
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