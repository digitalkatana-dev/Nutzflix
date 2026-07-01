import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSelectedVideo } from '../../redux/slices/videoSlice';
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
				<img src={item?.backdrop} alt='' />
				{isHovered && (
					<>
						<video src={item?.trailer} autoPlay={true} loop />
						<div className='item-info'>
							<div className='icons'>
								<PlayArrowIcon className='icon' />
								<AddIcon className='icon' />
								<ThumbUpAltOutlinedIcon className='icon' />
								<ThumbDownAltOutlinedIcon className='icon' />
							</div>
							<div className='item-info-top'>
								{/* <span>{item?.runTime}</span> */}
								<span className='rating'>{item?.rating}</span>
								<span>{item?.year}</span>
							</div>
							<div className='desc'>{item?.synopsis}</div>
							<div className='genre'>{item?.genre?.map((g) => `${g} `)}</div>
						</div>
					</>
				)}
			</div>
		</Link>
	);
};

export default ListItem;
