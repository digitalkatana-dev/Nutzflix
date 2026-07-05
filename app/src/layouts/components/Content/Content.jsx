import React from 'react';
import { useSelector } from 'react-redux';
import './content.scss';

const Content = ({ children }) => {
	const { roles, viewMode } = useSelector((state) => state.app);
	const { activeUser } = useSelector((state) => state.user);

	return (
		<main
			id='content'
			className={
				roles.includes(activeUser?.role) && viewMode === 'admin' ? 'admin' : ''
			}
		>
			{children}
		</main>
	);
};

export default Content;
