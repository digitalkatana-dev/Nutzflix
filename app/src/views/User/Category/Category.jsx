import React from 'react';
import { useSelector } from 'react-redux';
import VideoItemV from '../../../components/VideoItemV';
import './category.scss';

const Category = ({ type }) => {
	const { movies, series } = useSelector((state) => state.video);

	const category = type === 'series' ? series : type === 'movies' && movies;

	return (
		<div id='category'>
			<header>
				<h2 className='responsive-h2'>
					{type.charAt(0).toUpperCase() + type.slice(1)}
				</h2>
			</header>
			<main className='content-wrapper'>
				{category?.map((item) => (
					<VideoItemV key={item._id} image={item.poster} caption={item.title} />
				))}
			</main>
		</div>
	);
};

export default Category;
