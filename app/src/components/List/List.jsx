import { useRef, useState } from 'react';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ListItem from '../ListItem/ListItem';
import './list.scss';

const List = ({ list }) => {
	const [isMoved, setIsMoved] = useState(false);
	const [slideNumber, setSlideNumber] = useState(0);
	const listRef = useRef();
	const videos = list?.movies;

	const handleClick = (direction) => {
		setIsMoved(true);
		let distance = listRef.current.getBoundingClientRect().x - 50;
		if (direction === 'left' && slideNumber > 0) {
			setSlideNumber(slideNumber - 1);
			listRef.current.style.transform = `translateX(${230 + distance}px)`;
		}
		if (direction === 'right' && slideNumber < 5) {
			setSlideNumber(slideNumber + 1);
			listRef.current.style.transform = `translateX(${-230 + distance}px)`;
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
				<div className='container' ref={listRef}>
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
