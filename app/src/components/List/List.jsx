import { useRef, useState } from 'react';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ListItem from '../ListItem/ListItem';
import './list.scss';

const SLIDE_WIDTH = 230;
const MAX_SLIDE = 5;

const List = ({ list }) => {
	const [isMoved, setIsMoved] = useState(false);
	const [slideNumber, setSlideNumber] = useState(0);
	const videos = list?.movies;

	const handleClick = (direction) => {
		setIsMoved(true);
		if (direction === 'left' && slideNumber > 0) {
			setSlideNumber(slideNumber - 1);
		}
		if (direction === 'right' && slideNumber < MAX_SLIDE) {
			setSlideNumber(slideNumber + 1);
		}
	};

	return (
		<div className='list'>
			<span className='list-title'>{list?.name}</span>
			<div className='wrapper'>
				<ArrowBackIosOutlinedIcon
					className='slider-arrow left'
					onClick={() => handleClick('left')}
					style={{ display: !isMoved && 'none' }}
				/>
				<div
					className='container'
					style={{
						transform: `translateX(${-SLIDE_WIDTH * slideNumber}px)`,
						transition: 'transform 0.5s ease',
					}}
				>
					{videos.slice(0, 10).map((item, i) => (
						<ListItem key={item + i} index={i} item={item} />
					))}
				</div>
				<ArrowForwardIosOutlinedIcon
					className='slider-arrow right'
					onClick={() => handleClick('right')}
				/>
			</div>
		</div>
	);
};

export default List;
