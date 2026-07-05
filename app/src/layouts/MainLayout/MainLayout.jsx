import React from 'react';
import Topbar from '../components/Topbar';
import SideNav from '../components/SideNav';
import Content from '../components/Content';
import './main.scss';

const MainLayout = ({ children }) => {
	return (
		<div className='main-layout'>
			<Topbar />
			<div className='flex-wrapper'>
				<SideNav />
				<Content>{children}</Content>
			</div>
		</div>
	);
};

export default MainLayout;
