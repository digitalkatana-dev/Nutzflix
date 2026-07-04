import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSelectedVideo } from '../../redux/slices/videoSlice';
import { getEmbedUrl } from '../../util/helpers';
import AddIcon from '@mui/icons-material/Add';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import './listItem.scss';

const ListItem = ({ index, item }) => {
	const [isHovered, setIsHovered] = useState(false);
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(setSelectedVideo(item));
	};

	return (
		<Link to='/watch' onClick={handleClick}>
			<div
				className='list-item'
				style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				{isHovered ? (
					<>
						<div className='video-wrapper'>
							<iframe src={getEmbedUrl(item?.trailer)} frameBorder='0' />
						</div>
						<div className='item-info'>
							<div className='icons'>
								<PlayArrowIcon className='icon' />
								<AddIcon className='icon' />
								<ThumbUpAltOutlinedIcon className='icon' />
								<ThumbDownAltOutlinedIcon className='icon' />
							</div>
							<div className='item-info-top'>
								<span>{item?.title}</span>
								<span className='rating'>{item?.rating}</span>
								<span>{item?.year}</span>
							</div>
							<div className='desc'>{item?.synopsis}</div>
							<div className='genre'>{item?.genre?.map((g) => `${g} `)}</div>
						</div>
					</>
				) : (
					<img src={item?.backdrop} alt='' />
				)}
			</div>
		</Link>
	);
};

export default ListItem;
