import React from 'react';
import { Link } from 'react-router-dom';
import { ListItemButton, ListItemText } from '@mui/material';
import RouterLink from '../RouterLink';
import './navItem.scss';

const NavItem = ({ page, onClick, admin, icon, label, link, linkState }) => {
	if (admin) {
		return (
			<>
				{link ? (
					<Link
						to={link}
						state={{ linkState }}
						className='router-link'
						onClick={onClick}
					>
						<li>
							{icon}
							<span>{label}</span>
						</li>
					</Link>
				) : (
					<li onClick={onClick}>
						{icon}
						<span>{label}</span>
					</li>
				)}
			</>
		);
	}

	return (
		<Link to={link} onClick={onClick}>
			<ListItemButton LinkComponent={RouterLink} className='list-item-btn'>
				<ListItemText primary={page} className='list-item-btn-text' />
			</ListItemButton>
		</Link>
	);
};

export default NavItem;
