import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearAllSelected } from '../../../redux/slices/videoSlice';
import ArrowBackIosOutlined from '@mui/icons-material/ArrowBackIosOutlined';
import Hls from 'hls.js';
import nutzflixApi from '../../../api/nutflixApi';
import './watch.scss';

const Watch = () => {
	const { selectedVideo } = useSelector((state) => state.video);
	const dispatch = useDispatch();
	const videoRef = useRef(null);
	const hlsRef = useRef(null);
	const [streamInfo, setStreamInfo] = useState(null);
	const [error, setError] = useState(null);

	const handleClick = () => {
		setTimeout(() => {
			dispatch(clearAllSelected());
		}, 1000);
	};

	// Only treat streamInfo as valid if it belongs to the currently selected video —
	// avoids needing a synchronous setState(null) reset at the top of the fetch effect
	const currentStream =
		streamInfo?.videoId === selectedVideo?._id ? streamInfo : null;

	// Fetch the playable stream URL for this specific video
	useEffect(() => {
		const videoId = selectedVideo?._id;
		if (!videoId) return;

		const controller = new AbortController();

		const fetchStreamInfo = async () => {
			try {
				const res = await nutzflixApi.get(
					`https://server.nutzflix.net/api/videos/${videoId}/stream`,
					{ signal: controller.signal },
				);
				setStreamInfo({ ...res.data, videoId }); // axios already parses JSON into res.data
				setError(null);
			} catch (err) {
				if (err.name !== 'CanceledError' && err.code !== 'ERR_CANCELED') {
					console.error('Stream info error:', err);
					setError('Unable to load this video.');
				}
			}
		};

		fetchStreamInfo();

		return () => controller.abort();
	}, [selectedVideo?._id]);

	// Attach the stream to the <video> element once we know the URL and playback method
	useEffect(() => {
		const video = videoRef.current;
		if (!video || !currentStream?.streamURL) return;

		if (hlsRef.current) {
			hlsRef.current.destroy();
			hlsRef.current = null;
		}

		if (currentStream.isTranscoded) {
			if (Hls.isSupported()) {
				const hls = new Hls();
				hlsRef.current = hls;

				hls.on(Hls.Events.ERROR, (_event, data) => {
					if (data.fatal) {
						console.error('HLS fatal error:', data.type, data.details);
						setError('Playback error — please try again.');
					}
				});

				hls.loadSource(currentStream.streamURL);
				hls.attachMedia(video);
			} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
				video.src = currentStream.streamURL;
			} else {
				setError('HLS is not supported in this browser.');
			}
		} else {
			// Direct play — no hls.js needed
			video.src = currentStream.streamURL;
		}

		return () => {
			if (hlsRef.current) {
				hlsRef.current.destroy();
				hlsRef.current = null;
			}
		};
	}, [currentStream]);

	return (
		<div className='watch'>
			<Link to='/home-user' onClick={handleClick}>
				<div className='back'>
					<ArrowBackIosOutlined />
					Home
				</div>
			</Link>
			{error && <div className='watch-error'>{error}</div>}
			<video
				ref={videoRef}
				className='video'
				autoPlay
				progress='true'
				controls
			/>
		</div>
	);
};

export default Watch;
