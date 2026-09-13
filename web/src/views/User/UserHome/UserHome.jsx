import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  setSelectedSeries,
  setSelectedVideo,
  setSearchTerm,
  clearSearchResults,
} from '../../../redux/slices/videoSlice';
import { shuffleArray } from '../../../util/helpers';
import Paper from '../../../components/Paper';
import Trailer from '../../../components/Trailer';
import Carousel from '../../../components/Carousel';
import './userhome.scss';

const UserHome = () => {
  const { drawerOpen } = useSelector((state) => state.app);
  const { featured, series, lists, searchResults, favorites, recentlyAdded } =
    useSelector((state) => state.video);
  const dispatch = useDispatch();

  // only reshuffle when the underlying data actually changes, not on every focus move
  const seriesShuffled = useMemo(() => shuffleArray(series ?? []), [series]);
  const visibleLists = useMemo(
    () => (lists ?? []).filter((list) => list.movies.length > 0),
    [lists],
  );

  const handleSelectedVideo = (video) => {
    if (video.videoType.toLowerCase() === 'series') {
      dispatch(setSelectedSeries(video));
    } else if (video.videoType.toLowerCase() === 'movie') {
      dispatch(setSelectedVideo(video));
    }
    dispatch(setSearchTerm(''));
    dispatch(clearSearchResults());
  };

  const handleFeaturedClick = () => {
    dispatch(setSelectedVideo(featured));
  };

  return (
    <div className='home'>
      {!drawerOpen && searchResults.length > 0 ? (
        <div className='search-wrapper'>
          {searchResults.map((r) => (
            <Link
              to={
                r.videoType.toLowerCase() === 'series'
                  ? '/series-details'
                  : r.videoType.toLowerCase() === 'movie' && '/video-details'
              }
              key={r._id}
              onClick={() => handleSelectedVideo(r)}
            >
              <div className='result-item-wrapper'>
                <Paper className='poster-wrapper' elevation={5}>
                  <img
                    src={
                      r.videoType.toLowerCase() === 'series'
                        ? r.folder
                        : r.poster
                    }
                    alt={r.title}
                  />
                </Paper>
                <h6>{r.title}</h6>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <>
          <Trailer featured video={featured} onClick={handleFeaturedClick} />
          <div className='carousel-wrapper'>
            {favorites?.length > 0 && (
              <Carousel carouselId='favorites' favs list={favorites} arrows />
            )}
            {recentlyAdded?.length > 0 && (
              <Carousel
                carouselId='recentlyAdded'
                recent
                list={recentlyAdded}
                arrows
              />
            )}
            <Carousel
              carouselId='series'
              series
              list={seriesShuffled}
              count={seriesShuffled?.length ?? 0}
              arrows
            />
            {visibleLists.map((list) => (
              <Carousel
                key={list.name}
                carouselId={list.name}
                list={list}
                arrows
                count={10}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserHome;
