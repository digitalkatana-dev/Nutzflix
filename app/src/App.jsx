import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import { setDrawerOpen } from './redux/slices/appSlice';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';
import Auth from './views/Auth';
import UserHome from './views/User/UserHome';
import Watch from './views/User/Watch';
import AdminHome from './views/Admin/AdminHome';
import List from './views/Admin/List';
import New from './views/Admin/New';
import VideoDetails from './views/User/VideoDetails';

const App = () => {
	const { theme, roles, drawerOpen } = useSelector((state) => state.app);
	const { activeUser } = useSelector((state) => state.user);
	const dispatch = useDispatch();

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

	useEffect(() => {
		const checkWidth = () => {
			if (drawerOpen && window.innerWidth >= 820) {
				dispatch(setDrawerOpen(false));
			}
		};

		checkWidth();
		window.addEventListener('resize', checkWidth);

		return () => window.removeEventListener('resize', checkWidth);
	}, [drawerOpen, dispatch]);

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
								element={<UserLayout children={<UserHome />} />}
							/>
						}
					/>
					<Route
						path='/movies'
						element={
							<ProtectedRoute
								element={<UserLayout children={<UserHome type='movies' />} />}
							/>
						}
					/>
					<Route
						path='/series'
						element={
							<ProtectedRoute
								element={<UserLayout children={<UserHome type='series' />} />}
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
					<Route
						path='/inventory'
						element={
							<ProtectedRoute
								element={<AdminLayout children={<List title='Inventory' />} />}
							/>
						}
					/>
					<Route path='lists'>
						<Route
							index
							element={
								<ProtectedRoute
									element={<UserLayout children={<List title='Lists' />} />}
								/>
							}
						/>
					</Route>
					<Route
						path='/video-details'
						element={
							<ProtectedRoute
								element={<UserLayout children={<VideoDetails />} />}
							/>
						}
					/>
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
