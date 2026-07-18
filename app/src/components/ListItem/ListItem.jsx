import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSelectedVideo } from '../../redux/slices/videoSlice';
import { getEmbedUrl } from '../../util/helpers';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import NotFavoriteIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './listItem.scss';

const HOVER_DELAY = 800; // ms before the preview opens
const CLOSE_DELAY = 150; // ms grace window to bridge the gap between card and portal

const ListItem = ({ item }) => {
	const { activeUser } = useSelector((state) => state.user);
	const [isHovered, setIsHovered] = useState(false);
	const [rect, setRect] = useState(null);
	const anchorRef = useRef(null);
	const openTimer = useRef(null);
	const closeTimer = useRef(null);
	const dispatch = useDispatch();

	const watchList = activeUser?.favorites;

	const handleClick = () => {
		dispatch(setSelectedVideo(item));
	};

	const clearOpenTimer = () => {
		if (openTimer.current) {
			clearTimeout(openTimer.current);
			openTimer.current = null;
		}
	};

	const clearCloseTimer = () => {
		if (closeTimer.current) {
			clearTimeout(closeTimer.current);
			closeTimer.current = null;
		}
	};

	const handleMouseEnter = () => {
		clearCloseTimer();

		// already open (e.g. re-entering from the portal) — no need to re-delay
		if (isHovered) return;

		clearOpenTimer();
		openTimer.current = setTimeout(() => {
			const bounds = anchorRef.current?.getBoundingClientRect();
			if (bounds) setRect(bounds);
			setIsHovered(true);
		}, HOVER_DELAY);
	};

	const handleMouseLeave = () => {
		clearOpenTimer(); // cancel the open if the mouse leaves before it fires
		clearCloseTimer();
		closeTimer.current = setTimeout(() => {
			setIsHovered(false);
		}, CLOSE_DELAY);
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
			</Link>
			{isHovered &&
				rect &&
				createPortal(
					<div
						className='list-item preview'
						style={previewStyle}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
					>
						<div className='video-wrapper'>
							<iframe src={getEmbedUrl(item?.trailer)} frameBorder='0' />
						</div>
						<div className='item-info'>
							<div className='icons'>
								<Link to='/watch' onClick={handleClick}>
									<PlayArrowIcon className='icon' />
								</Link>
								{watchList?.includes(item._id) ? (
									<FavoriteIcon className='icon full' />
								) : (
									<NotFavoriteIcon className='icon' />
								)}
							</div>
							<div className='item-info-top'>
								<span>{item?.title}</span>
								<span className='rating'>{item?.rating}</span>
								<span>{item?.year}</span>
							</div>
							<div className='desc'>{item?.synopsis}</div>
							<div className='genre'>{item?.genre?.map((g) => `${g} `)}</div>
						</div>
					</div>,
					document.body,
				)}
		</>
	);
};

export default ListItem;
