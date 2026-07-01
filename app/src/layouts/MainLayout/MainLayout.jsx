import React from 'react';
import Topbar from '../../components/Topbar';
import SideNav from '../../components/SideNav';
import './mainLayout.scss';

const MainLayout = ({ children }) => {
	return (
		<div className='main-layout'>
			<Topbar />
			<div className='flex-wrapper'>
				<SideNav />
				<main>{children}</main>
			</div>
		</div>
	);
};

export default MainLayout;
