import React from 'react';
import Topbar from '../components/Topbar';
import SideNav from '../components/SideNav';

const MainLayout = ({ children }) => {
	return (
		<div style={{ width: '100vw', height: '100vh' }}>
			<Topbar />
			<SideNav />
			<main style={{ display: 'flex', flexDirection: 'column' }}>
				{children}
			</main>
		</div>
	);
};

export default MainLayout;
