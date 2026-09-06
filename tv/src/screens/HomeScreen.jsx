import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import {
  getVideos,
  setFeatured,
  setSelectedVideo,
} from '../redux/slices/videoSlice';
import { shuffleArray, buildGenreLists } from '../util/helpers';
import MainLayout from '../layouts/MainLayout';
import Trailer from '../components/Trailer';
import Carousel from '../components/Carousel';

const TEN_MIN_MS = 10 * 60 * 1000; // 10 minutes
const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const CHECK_INTERVAL_MS = 2 * 60 * 60 * 1000; // check every 2 hours, refetch when stale

const HomeScreen = () => {
  const [focusedKey, setFocusedKey] = useState(null);
  const { activeUser } = useSelector((state) => state.user);
  const { featured, movies, series, favorites, recentlyAdded, lastFetched } =
    useSelector((state) => state.video);
  const dispatch = useDispatch();
  const lists = buildGenreLists(movies);

  const handleFocus = (value) => {
    setFocusedKey(value);
  };

  const handleBlur = () => {
    setFocusedKey(null);
  };

  const handleClick = () => {
    dispatch(setSelectedVideo(featured));
  };

  useEffect(() => {
    if (!activeUser) return;
    if (!movies?.length || !series?.length) {
      dispatch(getVideos());
    }
  }, [activeUser, movies?.length, series?.length, dispatch]);

  useEffect(() => {
    if (!activeUser) return;

    const checkStaleness = () => {
      const isStale = !lastFetched || Date.now() - lastFetched > ONE_DAY_MS;
      if (isStale) {
        dispatch(getVideos());
      }
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
              favs
              list={favorites}
              focusedKey={focusedKey}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          )}
          {recentlyAdded?.length > 0 && (
            <Carousel
              recent
              list={shuffleArray(recentlyAdded)}
              focusedKey={focusedKey}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          )}
          <Carousel
            series
            list={shuffleArray(series ?? [])}
            count={series.length ?? 0}
            focusedKey={focusedKey}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {lists
            .filter((list) => list.movies.length > 0)
            .map((list) => (
              <Carousel
                key={list.name}
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
  container: {
    flex: 1,
    padding: 40,
  },
  carouselWrapper: {
    width: '100%',
    flexDirection: 'column',
    gap: 20,
    justifyContent: 'center',
    paddingVertical: 70,
  },
});
