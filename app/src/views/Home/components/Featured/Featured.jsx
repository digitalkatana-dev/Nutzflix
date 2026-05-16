import { useEffect } from 'react';
import { genreOptions } from '../../../../util/data';
import './featured.scss';
import Select from '../../../../components/Select';
import { InfoOutlined, PlayArrow } from '@mui/icons-material';

const Featured = ({ type, featured }) => {
	const category = type?.charAt(0).toUpperCase() + type?.slice(1);

	return (
		<div className='featured'>
			{type && (
				<div className='category'>
					<span>{category}</span>
					<Select options={genreOptions} />
				</div>
			)}
			{featured && (
				<>
					<video src={featured?.trailer} autoPlay controls loop />
					<div className='info'>
						<img src={featured?.img} alt='' />
						<span className='desc'>{featured?.desc}</span>
						<div className='buttons'>
							<button className='play'>
								<PlayArrow />
								<span>Play</span>
							</button>
							<button className='more'>
								<InfoOutlined />
								<span>Info</span>
							</button>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Featured;
