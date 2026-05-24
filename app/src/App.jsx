import React from 'react';
import { useSelector } from 'react-redux';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout/AdminLayout';
import Auth from './views/Auth';
import UserHome from './views/User/UserHome';
import Watch from './views/User/Watch';
import AdminHome from './views/Admin/AdminHome';
import Drawer from './components/Drawer';

const App = () => {
	const { theme, roles } = useSelector((state) => state.app);
	const { activeUser } = useSelector((state) => state.user);
	let element;

	if (activeUser) {
		if (roles?.includes(activeUser?.role)) {
			element = <Navigate to='/home-admin' />;
		} else if (!roles.includes(activeUser?.role)) {
			element = <Navigate to='/home-user' />;
		}
	} else {
		element = <Auth />;
	}

	return (
		<div className='app' data-theme={theme}>
			<Router>
				<Routes>
					{/* <Route
						path='/'
						element={activeUser ? <Navigate to='/home-user' /> : <Auth />}
					/> */}
					<Route path='/' element={element} />
					<Route
						path='/home-user'
						element={
							<ProtectedRoute
								element={<MainLayout children={<UserHome />} />}
							/>
						}
					/>
					<Route
						path='/movies'
						element={
							<ProtectedRoute
								element={<MainLayout children={<UserHome type='movies' />} />}
							/>
						}
					/>
					<Route
						path='/series'
						element={
							<ProtectedRoute
								element={<MainLayout children={<UserHome type='series' />} />}
							/>
						}
					/>
					<Route
						path='/watch'
						element={<ProtectedRoute element={<Watch />} />}
					/>
					<Route
						path='/home-admin'
						element={
							<ProtectedRoute
								element={<AdminLayout children={<AdminHome />} />}
							/>
						}
					/>
					<Route
						path='/test'
						element={<ProtectedRoute element={<Drawer />} />}
					/>
				</Routes>
			</Router>
		</div>
	);
};

export default App;
