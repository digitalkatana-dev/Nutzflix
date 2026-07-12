import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSelectedVideo } from '../../redux/slices/videoSlice';
import { getEmbedUrl } from '../../util/helpers';
import AddIcon from '@mui/icons-material/Add';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import './listItem.scss';

const ListItem = ({ item }) => {
	const [isHovered, setIsHovered] = useState(false);
	const [rect, setRect] = useState(null);
	const anchorRef = useRef(null);
	const closeTimer = useRef(null);
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(setSelectedVideo(item));
	};

	const clearCloseTimer = () => {
		if (closeTimer.current) {
			clearTimeout(closeTimer.current);
			closeTimer.current = null;
		}
	};

	const handleMouseEnter = () => {
		clearCloseTimer();
		const bounds = anchorRef.current?.getBoundingClientRect();
		if (bounds) setRect(bounds);
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		clearCloseTimer();
		closeTimer.current = setTimeout(() => {
			setIsHovered(false);
		}, 150); // grace window to bridge the gap between card and portal
	};

	const previewStyle = rect
		? {
				position: 'fixed',
				top: rect.top + rect.height / 2 - 150,
				left: rect.left + rect.width / 2 - 162.5,
			}
		: {};

	return (
		<>
			<Link to='/watch' onClick={handleClick}>
				<div
					ref={anchorRef}
					className='list-item'
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					<img src={item?.backdrop} alt={item?.title} />
				</div>
				{isHovered &&
					rect &&
					createPortal(
						<div
							className='list-item list-item--preview'
							style={previewStyle}
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}
						>
							<Link to='/watch' onClick={handleClick}>
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
									<div className='genre'>
										{item?.genre?.map((g) => `${g} `)}
									</div>
								</div>
							</Link>
						</div>,
						document.body,
					)}
			</Link>
		</>
	);
};

export default ListItem;
