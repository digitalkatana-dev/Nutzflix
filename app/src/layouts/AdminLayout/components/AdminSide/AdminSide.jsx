import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { setDrawerOpen } from '../../../../redux/slices/appSlice';
import { logout } from '../../../../redux/slices/userSlice';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import PlayIcon from '@mui/icons-material/PlayCircleOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import NavItem from '../../../../components/NavItem';
import './adminSide.scss';

const AdminSide = () => {
  const { drawerOpen } = useSelector((state) => state.app);

  const dispatch = useDispatch();

  const handleDrawer = () => {
    dispatch(setDrawerOpen(false));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav id='admin-side' className={drawerOpen ? 'open' : ''}>
      <div className='menu-container'>
        <Box sx={{ pt: '15px', pl: '15px' }}>
          <p className='label'>Main</p>
          <NavItem
            admin
            link='/home-admin'
            className='router-link'
            icon={<DashboardIcon className='icon' />}
            label='Dashboard'
            onClick={handleDrawer}
          />
          <p className='label'>QUICK MENU</p>
          <NavItem
            admin
            link='/home-user'
            className='router-link'
            icon={<PersonOutlineIcon className='icon' />}
            label='User Home'
            onClick={handleDrawer}
          />
          <NavItem
            admin
            link='/subs'
            className='router-link'
            icon={<PersonOutlineIcon className='icon' />}
            label='Subscribers'
            onClick={handleDrawer}
          />
          <NavItem
            admin
            link='/inventory'
            className='router-link'
            icon={<PlayIcon className='icon' />}
            label='Inventory'
            onClick={handleDrawer}
          />
          <p className='label'>USER</p>
          <NavItem
            admin
            icon={<AccountCircleOutlinedIcon className='icon' />}
            label='Profile'
            onClick={handleDrawer}
          />
          <NavItem
            admin
            icon={<ExitToAppIcon className='icon' />}
            label='Logout'
            onClick={handleLogout}
          />
        </Box>
      </div>
      <div className='backdrop-overflow' onClick={handleDrawer} />
    </nav>
  );
};

export default AdminSide;
