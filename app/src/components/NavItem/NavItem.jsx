import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListItemButton, ListItemText } from '@mui/material';
import RouterLink from '../RouterLink';

const NavItem = ({ page, onClick }) => {
	return (
		<ListItemButton LinkComponent={RouterLink} onClick={onClick}>
			<ListItemText primary={page} color='var(--text-primary)' />
		</ListItemButton>
	);
};

export default NavItem;
