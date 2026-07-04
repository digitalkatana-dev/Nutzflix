import React from 'react';
import { useSelector } from 'react-redux';
import { buildGenreLists } from '../../../util/helpers';
import Featured from './components/Featured';
import List from '../../../components/List';
import './userhome.scss';

const UserHome = () => {
	const { movies } = useSelector((state) => state.video);
	const lists = buildGenreLists(movies);

	return (
		<div className='home'>
			<Featured />
			{lists
				.filter((list) => list.movies.length > 0)
				.map((list) => (
					<List key={list.name} list={list} />
				))}
		</div>
	);
};

export default UserHome;
