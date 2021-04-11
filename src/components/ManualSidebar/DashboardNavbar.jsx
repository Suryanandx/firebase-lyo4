import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import BuildIcon from '@material-ui/icons/Build';
import HomeIcon from '@material-ui/icons/Home'
import Logo from '../Logo';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const [notifications] = useState([]);

  return (
    <AppBar
    style={{backgroundColor: "black"}}
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <RouterLink to="/" style={{textDecoration: "none", color: "white", display: "flex"}}>
         <Logo/>
       <Typography style={{margin: "10px"}} variant="button">ARIZON Systems</Typography>
        </RouterLink>
        <Box style={{ flexGrow: 1 }} />
        <Hidden smDown>
          <IconButton href='/' color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <HomeIcon />
            </Badge>
          </IconButton>
          <IconButton href='/machine-data' color="inherit">
            <BuildIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;