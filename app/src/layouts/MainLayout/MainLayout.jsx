import { useState } from 'react';
// import Topbar from '../../components/Topbar';
import Navbar from '../../components/Navbar';
import LeftNav from '../../components/LeftNav';
// import SideNav from '../../components/SideNav';
import './mainLayout.scss';

const MainLayout = ({ children }) => {
	const [open, setOpen] = useState(false);

	return (
		<div className='main-layout'>
			<Navbar setOpen={setOpen} open={open} />
			<div className='flex-wrapper'>
				<LeftNav open={open} />
				<main>{children}</main>
			</div>
		</div>
	);
};

export default MainLayout;
