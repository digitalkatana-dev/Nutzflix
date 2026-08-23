import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IconButton, Stack } from '@mui/material';
import { addRemoveFavorite } from '../../../redux/slices/userSlice';
import { setSelectedVideo } from '../../../redux/slices/videoSlice';
import NotFavoriteIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Paper from '../../../components/Paper';
import Trailer from '../../../components/Trailer';
import './details.scss';

const VideoDetails = () => {
  const { activeUser } = useSelector((state) => state.user);
  const { selectedVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const watchList = activeUser?.favorites ?? [];

  const handleClick = () => {
    dispatch(setSelectedVideo(selectedVideo));
  };

  const handleFavorite = () => {
    dispatch(addRemoveFavorite(selectedVideo._id));
  };

  return (
    <div id='video-details'>
      <Trailer video={selectedVideo} />
      <div className='video-info'>
        <div className='flex-wrapper'>
          <Paper className='poster-wrapper' elevation={5}>
            <img className='poster' src={selectedVideo?.poster} alt='' />
          </Paper>
          <div className='common-info-wrapper'>
            <Stack direction='column' spacing={1}>
              <span className='responsive-h4'>{selectedVideo?.title}</span>
              <span className='responsive-h5 rating'>
                {selectedVideo?.rating}
              </span>
              <span className='responsive-p year'>{selectedVideo?.year}</span>
            </Stack>
            <span className='responsive-h6'>{selectedVideo?.tagline}</span>
            <span className='responsive-p genre'>
              {selectedVideo?.genre?.map((g) => `${g} `)}
            </span>
            <div className='actions'>
              <Link to='/watch' onClick={handleClick}>
                <Paper className='play-btn' elevation={5}>
                  <h5>PLAY</h5>
                </Paper>
              </Link>
              <IconButton onClick={handleFavorite}>
                {watchList?.includes(selectedVideo._id) ? (
                  <FavoriteIcon className='fav-icon full' />
                ) : (
                  <NotFavoriteIcon className='fav-icon' />
                )}
              </IconButton>
            </div>
          </div>
        </div>
        <div className='details-wrapper'>
          <div className='synopsis'>
            <h2 className='responsive-h2'>Synopsis</h2>
            <p className='responsive-h5'>{selectedVideo?.synopsis}</p>
          </div>
          <div className='people'>
            <h2 className='responsive-h2'>Cast & Crew</h2>
            <div className='people-flex'>
              {selectedVideo?.people?.map((p, i) => (
                <div className='crew' key={p.Id + i}>
                  <span>{p.Role}</span>
                  <span>{p.Name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
