import React from 'react';
import './drawer.scss';

const Drawer = ({ open, children, variant }) => {
	const tempDrawerStyles = {
		marginLeft: !open ? '-280px' : 0,
	};

	const permDrawerStyles = {
		height: 'calc(100vh - 50px)',
	};

	return (
		<nav
			className={`drawer ${variant}`}
			style={
				variant === 'temporary'
					? tempDrawerStyles
					: variant === 'permanent'
						? permDrawerStyles
						: null
			}
		>
			{children}
		</nav>
	);
};

export default Drawer;
