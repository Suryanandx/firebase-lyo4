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
  Activity as ActivityIcon,
  Download as AddIcon,
} from 'react-feather';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import NavItem from './NavItem';
import { useAuth } from '../context/AuthContext';
import { db } from '../../firebase';
import { firebaseLooper } from '../../utils/tools';


const items = [
  {
        title: 'Components',
      href: '/Module',
        icon: ActivityIcon,
       
    },
     {
        title: 'Add-Component',
        href: '/Module',
        icon: AddIcon

    }
    
];

const DashboardSidebar = ({ onMobileClose,match, openMobile }) => {
  const location = useLocation();
  const {currentUser} = useAuth()
  const [userData, setUserData] = useState([])
  const [manual, setManual] = useState('')
  const history = useHistory()
 const [navbar, setNavbar] = useState([])
  function handleReturn(){
    history.push(`/machine-data/${manual}/Module`)
  }

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
     db.collection('moduleData').doc(match.params.id).onSnapshot(doc => {
      setManual(doc.data().mid)
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
          <ListItem>
            <a style={{textDecoration: 'none', color:'orange'}} className="flex items-center w-full h-12 px-3 mt-2 text-yrllow-800 bg-black rounded" href="/">
                    <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
 				</svg>
					
					<span className="ml-2 text-sm font-medium">Dashboard</span>
 			</a>
          </ListItem>
          
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
          Return to Modules?
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
          style={{backgroundImage: "linear-gradient(to left bottom, #a39df3, #8885e8, #6b6fdd, #4859d1, #0144c6)", color: "white", width: "150px"}}
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