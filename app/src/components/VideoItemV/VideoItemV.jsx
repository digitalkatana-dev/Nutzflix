import React from 'react';
import { Link } from 'react-router-dom';
import Paper from '../Paper';
import './itemV.scss';

const VideoItemV = ({ link, onClick, elevation, image, alt, caption }) => {
	return (
		<Link to={link} className='v-link' onClick={onClick}>
			<Paper className='v-item' elevation={elevation}>
				<img src={image} alt={alt} />
			</Paper>
			<h6 className='responsive-h6 caption'>{caption}</h6>
		</Link>
	);
};

export default VideoItemV;
