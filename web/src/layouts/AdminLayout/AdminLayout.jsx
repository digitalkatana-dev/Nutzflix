import React from 'react';
import AdminTop from './components/AdminTop';
import AdminSide from './components/AdminSide';
import AdminContent from './components/AdminContent';
import './admin.scss';

const AdminLayout = ({ children }) => {
	return (
		<div id='admin-layout'>
			<AdminTop />
			<div className='flex-wrapper'>
				<AdminSide />
				<AdminContent>{children}</AdminContent>
			</div>
		</div>
	);
};

export default AdminLayout;
