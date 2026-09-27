import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSearchTerm,
  setSelectedSeries,
  setSelectedVideo,
  clearSearchResults,
} from '../../../redux/slices/videoSlice';
import VideoItemV from '../../../components/VideoItemV';
import './inventory.scss';

const Inventory = () => {
  const { movies, series, searchResults } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  const allVideos = [...series, ...movies].sort((a, b) =>
    a.title.localeCompare(b.title),
  );

  const handleClick = (selected) => {
    if (selected.videoType.toLowerCase() === 'series') {
      dispatch(setSelectedSeries(selected));
    } else if (selected.videoType.toLowerCase() === 'movie') {
      dispatch(setSelectedVideo(selected));
    }
    dispatch(setSearchTerm(''));
    dispatch(clearSearchResults());
  };

  return (
    <div id='inventory'>
      <header>
        <h3 className='title'>Inventory</h3>
      </header>
      <div className='content-wrapper'>
        {searchResults.length > 0 ? (
          <>
            {searchResults?.map((item) => (
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
        ) : (
          <>
            {allVideos?.map((item) => (
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
      </div>
    </div>
  );
};

export default Inventory;
