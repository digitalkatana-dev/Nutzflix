import React from 'react';
import { useSelector } from 'react-redux';
import { buildGenreLists } from '../../../util/helpers';
import Featured from './components/Featured';
import Carousel from '../../../components/Carousel';
import './userhome.scss';

const UserHome = () => {
	const { movies } = useSelector((state) => state.video);
	const lists = buildGenreLists(movies);

	return (
		<div className='home'>
			<Featured />
			<div className='carousel-wrapper'>
				{lists
					.filter((list) => list.movies.length > 0)
					.map((list) => (
						<Carousel key={list.name} list={list} />
					))}
			</div>
		</div>
	);
};

export default UserHome;
