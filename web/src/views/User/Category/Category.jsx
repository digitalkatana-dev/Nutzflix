import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSelectedVideo,
  setSelectedSeries,
} from '../../../redux/slices/videoSlice';
import VideoItemV from '../../../components/VideoItemV';
import './category.scss';

const Category = ({ type }) => {
  const { movies, series, favorites, searchResults } = useSelector(
    (state) => state.video,
  );
  const dispatch = useDispatch();
  const category =
    type === 'series'
      ? series
      : type === 'movies'
        ? movies
        : type === 'fav' && favorites;

  const handleClick = (selected) => {
    if (selected.videoType.toLowerCase() === 'series') {
      dispatch(setSelectedSeries(selected));
    } else if (selected.videoType.toLowerCase() === 'movie') {
      dispatch(setSelectedVideo(selected));
    }
  };

  return (
    <div id='category'>
      <header>
        <h2 className='responsive-h2'>
          {type === 'fav'
            ? 'My List'
            : type.charAt(0).toUpperCase() + type.slice(1)}
        </h2>
      </header>
      <main className='content-wrapper'>
        {searchResults.length > 0 ? (
          <>
            {searchResults?.map((item) => (
              <VideoItemV
                key={item._id}
                link={
                  item.videoType.toLowerCase() === 'series'
                    ? '/series/details'
                    : item.videoType.toLowerCase() === 'movie' &&
                      '/video-details'
                }
                image={item.poster}
                caption={item.title}
                elevation={5}
                onClick={() => handleClick(item)}
              />
            ))}
          </>
        ) : (
          <>
            {category?.map((item) => (
              <VideoItemV
                key={item._id}
                link={
                  item.videoType.toLowerCase() === 'series'
                    ? '/series-details'
                    : item.videoType.toLowerCase() === 'movie' &&
                      '/video-details'
                }
                image={
                  item.videoType.toLowerCase() === 'series'
                    ? item.folder
                    : item.poster
                }
                caption={item.title}
                elevation={5}
                onClick={() => handleClick(item)}
              />
            ))}
          </>
        )}
      </main>
    </div>
  );
};

export default Category;
