import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import {
  getVideos,
  setFeatured,
  setSelectedVideo,
} from '../redux/slices/videoSlice';
import { shuffleArray } from '../util/helpers';
import MainLayout from '../layouts/MainLayout';
import Trailer from '../components/Trailer';
import Carousel from '../components/Carousel';

const TEN_MIN_MS = 10 * 60 * 1000;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const CHECK_INTERVAL_MS = 2 * 60 * 60 * 1000;

const HomeScreen = () => {
  const [focusedKey, setFocusedKey] = useState(null);
  const { activeUser } = useSelector((state) => state.user);
  const {
    featured,
    movies,
    series,
    lists,
    favorites,
    recentlyAdded,
    lastFetched,
  } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  // only reshuffle when the underlying data actually changes, not on every focus move
  const seriesShuffled = useMemo(() => shuffleArray(series ?? []), [series]);
  const visibleLists = useMemo(
    () => (lists ?? []).filter((list) => list.movies.length > 0),
    [lists],
  );

  const handleFocus = (value) => setFocusedKey(value);
  const handleBlur = () => setFocusedKey(null);

  const handleClick = () => {
    dispatch(setSelectedVideo(featured));
  };

  useEffect(() => {
    if (!activeUser) return;
    if (movies?.length <= 0 || series?.length <= 0) {
      dispatch(getVideos());
    }
  }, [activeUser, movies?.length, series?.length, dispatch]);

  useEffect(() => {
    if (!activeUser) return;
    const checkStaleness = () => {
      const isStale = !lastFetched || Date.now() - lastFetched > ONE_DAY_MS;
      if (isStale) dispatch(getVideos());
    };
    const interval = setInterval(checkStaleness, CHECK_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [activeUser, lastFetched, dispatch]);

  useEffect(() => {
    if (!activeUser) return;
    const refreshFeatured = () => {
      dispatch(setFeatured(shuffleArray(movies)[0]));
    };
    const interval = setInterval(refreshFeatured, TEN_MIN_MS);
    return () => clearInterval(interval);
  }, [activeUser, dispatch, movies]);

  return (
    <MainLayout
      focusedKey={focusedKey}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <View style={styles.container}>
        <Trailer
          featured
          video={featured}
          focusedKey={focusedKey}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onClick={handleClick}
        />
        <View style={styles.carouselWrapper}>
          {favorites?.length > 0 && (
            <Carousel
              carouselId='favorites'
              favs
              list={favorites}
              focusedKey={focusedKey}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          )}
          {recentlyAdded?.length > 0 && (
            <Carousel
              carouselId='recentlyAdded'
              recent
              list={recentlyAdded}
              focusedKey={focusedKey}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          )}
          <Carousel
            carouselId='series'
            series
            list={seriesShuffled}
            count={seriesShuffled?.length ?? 0}
            focusedKey={focusedKey}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {visibleLists.map((list) => (
            <Carousel
              key={list.name}
              carouselId={list.name}
              list={list}
              count={10}
              focusedKey={focusedKey}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          ))}
        </View>
      </View>
    </MainLayout>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 40 },
  carouselWrapper: {
    width: '100%',
    flexDirection: 'column',
    gap: 20,
    justifyContent: 'center',
    paddingVertical: 70,
  },
});
