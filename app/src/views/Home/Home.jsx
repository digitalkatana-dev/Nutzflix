import React from 'react';
import Topbar from '../../components/Topbar';
import SideNav from '../../components/SideNav';
import './home.scss';

const Home = () => {
	return (
		<div className='home'>
			<Topbar />
			<SideNav />
		</div>
	);
};

export default Home;
