import React from 'react';
import { Link } from 'react-router-dom';
import Paper from '../Paper';
import Tag from '../Tag';
import './itemV.scss';

const VideoItemV = ({
  link,
  onClick,
  itmClass,
  elevation,
  image,
  alt,
  caption,
  tagSrc,
}) => {
  return (
    <Link to={link} className='v-link' onClick={onClick}>
      <Paper className={`v-item ${itmClass}`} elevation={elevation}>
        <img src={image} alt={alt} />
        {tagSrc?.includes('Unrated') && <Tag className='tag vert' tag='UR' />}
        {tagSrc?.includes('Super Cut') && <Tag className='tag vert' tag='SC' />}
        {tagSrc?.includes('Ultimate Edition') && (
          <Tag className='tag vert' tag='UE' />
        )}
        {tagSrc?.includes('Extended Cut') && (
          <Tag className='tag vert' tag='EC' />
        )}
      </Paper>
      <h6 className='responsive-h6 caption'>{caption}</h6>
    </Link>
  );
};

export default VideoItemV;
