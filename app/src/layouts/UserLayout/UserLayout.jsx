import React from 'react';
import UserTop from './components/UserTop';
import UserSide from './components/UserSide';
import UserContent from './components/UserContent';
import './user.scss';

const UserLayout = ({ children }) => {
	return (
		<div id='user-layout'>
			<UserTop />
			<div className='flex-wrapper'>
				<UserSide />
				<UserContent>{children}</UserContent>
			</div>
		</div>
	);
};

export default UserLayout;
