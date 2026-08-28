import React from 'react';
import { Link } from 'react-router-dom';
import Paper from '../Paper';
import './itemH.scss';

const VideoItemH = ({ linkTo, onClick, elevation, image, alt, caption }) => {
	return (
		<Link to={linkTo} className='h-link' onClick={onClick}>
			<Paper className='h-item' elevation={elevation}>
				<img src={image} alt={alt} />
			</Paper>
			<h5 className='caption'>{caption}</h5>
		</Link>
	);
};

export default VideoItemH;
