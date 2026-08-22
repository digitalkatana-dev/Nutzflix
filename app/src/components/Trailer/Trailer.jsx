import React from 'react';
import { Link } from 'react-router-dom';
import { InfoOutlined, PlayArrow } from '@mui/icons-material';
import { getEmbedUrl } from '../../util/helpers';
import Paper from '../Paper';
import './trailer.scss';

const Trailer = ({ featured, video, onClick }) => {
  return (
    <div className={`trailer-container${!featured ? ' category' : ''}`}>
      {featured && (
        <Paper className='mobile' elevation={10}>
          <img src={video?.poster} alt='' />
          <div className='trailer-footer'>
            {video?.logo && <img src={video?.logo} alt='Logo' />}
            <h5 className='responsive-h5 info'>{`${video?.videoType} • ${video?.genre[0]} • ${video?.year} • ${video?.rating}`}</h5>
            <h5 className='responsive-h5 desc'>{video?.synopsis}</h5>
            <div className='trailer-btn-container'>
              <Link to='/watch' className='trailer-link play' onClick={onClick}>
                <PlayArrow />
                <span>Play</span>
              </Link>
              <Link
                to='/video-details'
                className='trailer-link more'
                onClick={onClick}
              >
                <InfoOutlined />
                <span>Info</span>
              </Link>
            </div>
          </div>
        </Paper>
      )}
      <Paper
        className={`video-wrapper${!featured ? ' category' : ''}`}
        elevation={10}
      >
        <iframe src={getEmbedUrl(video?.trailer)} frameBorder='0' />
        <div className='trailer-trailer-footer'>
          {video?.logo && <img src={video?.logo} alt='Logo' />}
          {featured && (
            <>
              <h5 className='responsive-h5 info'>{`${video?.videoType} • ${video?.genre[0]} • ${video?.year} • ${video?.rating}`}</h5>
              <h5 className='responsive-h5 desc'>{video?.synopsis}</h5>
              <div className='trailer-btn-container'>
                <Link
                  to='/watch'
                  className='trailer-link play'
                  onClick={onClick}
                >
                  <PlayArrow />
                  <span>Play</span>
                </Link>
                <Link
                  to='/video-details'
                  className='trailer-link more'
                  onClick={onClick}
                >
                  <InfoOutlined />
                  <span>Info</span>
                </Link>
              </div>{' '}
            </>
          )}
        </div>
      </Paper>
    </div>
  );
};

export default Trailer;
