import React from 'react';
import { useSelector } from 'react-redux';
import { buildGenreLists } from '../../../util/helpers';
import Paper from '../../../components/Paper';
import Featured from './components/Featured';
import Carousel from '../../../components/Carousel';
import './userhome.scss';

const UserHome = () => {
	const { drawerOpen } = useSelector((state) => state.app);
	const { movies, searchResults } = useSelector((state) => state.video);
	const lists = buildGenreLists(movies);

	return (
		<div className='home'>
			{!drawerOpen && searchResults.length > 0 ? (
				<div className='search-wrapper'>
					{searchResults.map((r) => (
						<Paper key={r._id} className='poster-wrapper' elevation={5}>
							<img src={r.poster} alt='' />
						</Paper>
					))}
				</div>
			) : (
				<>
					<Featured />
					<div className='carousel-wrapper'>
						{lists
							.filter((list) => list.movies.length > 0)
							.map((list) => (
								<Carousel key={list.name} list={list} />
							))}
					</div>
				</>
			)}
		</div>
	);
};

export default UserHome;
