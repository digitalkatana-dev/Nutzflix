import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
	const { activeUser } = useSelector((state) => state.app);

	if (!activeUser) return <Navigate to='/' replace />;

	return element;
};

export default ProtectedRoute;
