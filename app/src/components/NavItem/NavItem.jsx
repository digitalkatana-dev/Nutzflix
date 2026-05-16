import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListItemButton, ListItemText } from '@mui/material';
import RouterLink from '../RouterLink';
import './navItem.scss';

const NavItem = ({ page, onClick }) => {
	return (
		<ListItemButton
			LinkComponent={RouterLink}
			className='list-item-btn'
			onClick={onClick}
		>
			<ListItemText primary={page} className='list-item-btn-text' />
		</ListItemButton>
	);
};

export default NavItem;
