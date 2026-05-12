import React from 'react';
import { useSelector } from 'react-redux';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Auth from './views/Auth';
import Home from './views/Home';

const App = () => {
	const { activeUser } = useSelector((state) => state.app);

	return (
		<Router>
			<Routes>
				<Route
					path='/'
					element={activeUser ? <Navigate to='/home' replace /> : <Auth />}
				/>
				<Route path='/home' element={<ProtectedRoute element={<Home />} />} />
			</Routes>
		</Router>
	);
};

export default App;
