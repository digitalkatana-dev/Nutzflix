import React from 'react';
import SideNav from '../../components/SideNav';
import Topbar from '../../components/Topbar';
import './adminLayout.scss';

const AdminLayout = ({ children }) => {
	return (
		<div className='admin-layout'>
			<Topbar />
			<SideNav />
			<main className='admin-layout-main-content'>{children}</main>
		</div>
	);
};

export default AdminLayout;
