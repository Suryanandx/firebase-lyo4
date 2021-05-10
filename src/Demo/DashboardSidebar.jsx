import { useEffect, useState } from 'react';
import { Link as RouterLink, Redirect, useHistory, useLocation } from 'react-router-dom';
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
  Video as VideoIcon,
  LogOut as LogOutIcon,
  Book as Book
} from 'react-feather';
import VideoCallIcon from '@material-ui/icons/VideoCall'
import NavItem from './NavItem';
import { useAuth } from '../components/context/AuthContext';
import { db } from '../firebase';
import { firebaseLooper } from '../utils/tools';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';


const items = [
  
  
  {
    href: '/machine-data',
    icon: ShoppingBagIcon,
    title: 'Machines'
  },
  {
    href: '/video-call',
    icon: VideoIcon,
    title: 'Video Call'
  },
  {
    href: '/file-manager',
    icon: Book,
    title: 'Files'
  },
 

];

const itemSecond = [
   {
    href: '/users',
    icon: UsersIcon,
    title: 'Users'
  },
 {
    href: '/account',
    icon: UserIcon,
    title: 'Account'
  },
  {
    href: '/settings',
    icon: SettingsIcon,
    title: 'Settings'
  },
  {
    href: '/user-manual',
    icon: ListAltOutlinedIcon,
    title: 'User Manual'
  }
]

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  const {currentUser, logout} = useAuth()
  const [userData, setUserData] = useState([])
  const [error, setError] = useState('')
  const history = useHistory()
  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    if(currentUser){
      db.collection('users').where('email', '==', `${currentUser.email}`).onSnapshot(doc => {
      const data = firebaseLooper(doc)
      setUserData(data[0])
    })
    } else {
      <Redirect to='/login'/>
    }
    
  }, [location.pathname]);

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
			<span className="ml-2 text-sm font-bold">ARIZON SYSTEMS</span>

		</a>
      <Divider />
      <Box m={2} >
        <List className="flex flex-col items-center w-full mt-3 border-t border-gray-700">
          <ListItem>
            <a style={{textDecoration: 'none', color:'orange'}} className="flex items-center w-full h-12 px-3 mt-2 text-gray-200 bg-black rounded" href="/">
                    <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
 				</svg>
					
					<span className="ml-2 text-sm font-medium">DASHBOARD</span>
 			</a>
          </ListItem>
          
         
          
          {items.map((item) => (
            <div key={item.title} className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300">
              <NavItem
              href={`${item.href}`}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
            </div>
            
          ))}
          <div className='flex flex-col items-center w-full mt-2 border-t border-gray-700'>
          {itemSecond.map((item) => (
            <div key={item.title} className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300">
              
                <NavItem
              href={`${item.href}`}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
           
            </div>
            
          ))}
        </div>
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
          Want to Logout?
        </Typography>
        <Box
        pt= {2}
          style={{
            display: 'flex',
            justifyContent: 'center',
            
          }}
        >
          <Button
          style={{backgroundColor: "orange", color: "white"}}
          startIcon={<LogOutIcon/>}
            component="a"
            variant="contained"
            onClick={handleLogout}
          >
            Log Out
          </Button>
        </Box>
      </Box>
    </Box>
  //   <div className="flex flex-col items-center w-64 h-full overflow-hidden text-gray-400 bg-black ">
		
   
	// 	<div className="w-full px-2">
      
	// 		<div className="flex flex-col items-center w-full mt-3 border-t border-gray-700">
         
  //               <a style={{textDecoration: 'none', color:'orange'}} className="flex items-center w-full h-12 px-3 mt-2 text-gray-200 bg-gray-700 rounded" href="/">
  //                   <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
	// 					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
	// 				</svg>
					
	// 				<span className="ml-2 text-sm font-medium">Dashboard</span>
	// 			</a>
	// 			<a style={{textDecoration: 'none', color:'white'}} className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" href="/machine-data">
	// 				<svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
	// 					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
	// 				</svg>
	// 				<span className="ml-2 text-sm font-medium">Machines</span>
	// 			</a>
	// 			<a  style={{textDecoration: 'none', color:'white'}} className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" href="/video-call">
	// 				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera-video-fill" viewBox="0 0 16 16">
  //                   <path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5z"/>
  //                   </svg>
	// 				<span className="ml-2 text-sm font-medium">Video Call</span>
	// 			</a>
				
				
	// 		</div>
	// 		<div className="flex flex-col items-center w-full mt-2 border-t border-gray-700">
	// 			<a style={{textDecoration: 'none', color:'white'}} className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" href="/users">
	// 				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
  //         <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
  //         <path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
  //         <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
  //       </svg>
	// 				<span className="ml-2 text-sm font-medium">Users</span>
	// 			</a>
  //       	<a style={{textDecoration: 'none', color:'white'}} className="relative flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" href="/account">
	// 				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-square" viewBox="0 0 16 16">
  //         <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  //         <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"/>
  //       </svg>
	// 				<span className="ml-2 text-sm font-medium">Account</span>
					
	// 			</a>
	// 			<a style={{textDecoration: 'none', color:'white'}} className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" href="/settings">
	// 				<svg className="w-6 h-6 stroke-current"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
	// 					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
	// 				</svg>
	// 				<span className="ml-2 text-sm font-medium">Settings</span>
	// 			</a>
			
	// 		</div>
	// 	</div>
	// 	<button style={{textDecoration: 'none', color:'white', backgroundColor: 'orange'}} className="flex items-center justify-center w-full h-16 mt-auto bg-gray-800 hover:bg-gray-700 hover:text-gray-300" href="#">
	// 		<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-power" viewBox="0 0 16 16">
  //       <path d="M7.5 1v7h1V1h-1z"/>
  //       <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z"/>
  //     </svg>
	// 		<span className="ml-2 text-lg font-medium">Logout</span>
	// 	</button>

	// </div>
    

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
              width:250,
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
              width: 250,
             
             
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