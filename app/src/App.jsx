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
import Auth from './views/Auth';
import Home from './views/Home';
import Watch from './views/Watch';

const App = () => {
	const { theme } = useSelector((state) => state.app);
	const { activeUser } = useSelector((state) => state.user);

	return (
		<div className='app' data-theme={theme}>
			<Router>
				<Routes>
					<Route
						path='/'
						element={activeUser ? <Navigate to='/home' replace /> : <Auth />}
					/>
					<Route
						path='/home'
						element={
							<ProtectedRoute element={<MainLayout children={<Home />} />} />
						}
					/>
					<Route
						path='/movies'
						element={
							<ProtectedRoute
								element={<MainLayout children={<Home type='movies' />} />}
							/>
						}
					/>
					<Route
						path='/series'
						element={
							<ProtectedRoute
								element={<MainLayout children={<Home type='series' />} />}
							/>
						}
					/>
					<Route
						path='/watch'
						element={<ProtectedRoute element={<Watch />} />}
					/>
				</Routes>
			</Router>
		</div>
	);
};

export default App;
