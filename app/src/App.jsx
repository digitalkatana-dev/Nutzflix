import React from 'react';
import { useSelector } from 'react-redux';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import { subInputs, videoInputs, listInputs } from './util/data';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import Auth from './views/Auth';
import UserHome from './views/User/UserHome';
import Watch from './views/User/Watch';
import AdminHome from './views/Admin/AdminHome';
import List from './views/Admin/List';
import New from './views/Admin/New';

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
					<Route path='subs'>
						<Route
							index
							element={
								<ProtectedRoute
									element={
										<AdminLayout children={<List title='Subscribers' />} />
									}
								/>
							}
						/>
						<Route
							path='new'
							element={
								<ProtectedRoute
									element={
										<AdminLayout
											children={<New type='sub' title='Add New Subscriber' />}
										/>
									}
								/>
							}
						/>
					</Route>
					<Route path='videos'>
						<Route
							index
							element={
								<ProtectedRoute
									element={<AdminLayout children={<List title='Videos' />} />}
								/>
							}
						/>
						<Route
							path='new'
							element={
								<ProtectedRoute
									element={
										<AdminLayout
											children={<New title='Add New Video' type='video' />}
										/>
									}
								/>
							}
						/>
					</Route>
					<Route path='lists'>
						<Route
							index
							element={
								<ProtectedRoute
									element={<AdminLayout children={<List title='Lists' />} />}
								/>
							}
						/>
						<Route
							path='new'
							element={
								<ProtectedRoute
									element={
										<AdminLayout
											children={
												<New inputs={listInputs} title='Add New List' />
											}
										/>
									}
								/>
							}
						/>
					</Route>
					{/* <Route
						path='/test'
						element={<ProtectedRoute element={<Drawer />} />}
					/> */}
				</Routes>
			</Router>
		</div>
	);
};

export default App;
