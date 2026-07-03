import React from 'react';
import { useSelector } from 'react-redux';
import './vl.scss';

const VideoList = () => {
	const { movies } = useSelector((state) => state.video);

	return (
		<div>
			{movies.map((m) => (
				<h4 style={{ color: 'var(--text-primary)' }}>{m.title}</h4>
			))}
		</div>
	);
};

export default VideoList;
