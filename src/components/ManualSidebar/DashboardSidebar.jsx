import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
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
  const [userData, setUserData] = useState([])

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    db.collection('users').where('email', '==', `${currentUser.email}`).onSnapshot(doc => {
      const data = firebaseLooper(doc)
      setUserData(data[0])
    })
  }, [location.hrefname]);

  const content = (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
      m={2}
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
         
        }}
      >
        <Avatar
          component={RouterLink}
          src={userData.url}
          style={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/account"
        />
        <Typography
          color="textPrimary"
          variant="h5"
        >
          {userData.firstName} {userData.lastName}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {userData.role}
        </Typography>
      </Box>
      <Divider />
      <Box m={2} >
        <List>
         
          
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
          Back To Dashboard?
        </Typography>
        <Box
        pt= {2}
          style={{
            display: 'flex',
            justifyContent: 'center',
            
          }}
        >
          <Button
          href='/'
          style={{backgroundColor: "#ff7a00", color: "white", width: "150px"}}
          startIcon={<HomeIcon/>}
            variant="contained"
          >
            Home
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
              width: 256
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
              top: 64,
              height: 'calc(100% - 64px)'
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