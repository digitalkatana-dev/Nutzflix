import React from 'react';
import { useSelector } from 'react-redux';
import './paper.scss';

const Paper = ({ id, className, style, elevation = 1, children }) => {
	const { theme } = useSelector((state) => state.app);

	return (
		<div
			id={id}
			className={`paper paper--elevation-${elevation} ${className} ${theme === 'dark' ? theme : ''}`}
			style={style}
		>
			{children}
		</div>
	);
};

export default Paper;
