import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { getVideos, setFeatured } from '../redux/slices/videoSlice';
import { shuffleArray, buildGenreLists } from '../util/helpers';
import MainLayout from '../layouts/MainLayout';
import Trailer from '../components/Trailer';
import Carousel from '../components/Carousel';

const TEN_MIN_MS = 10 * 60 * 1000; // 10 minutes
const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const CHECK_INTERVAL_MS = 2 * 60 * 60 * 1000; // check every 2 hours, refetch when stale

const HomeScreen = () => {
  const { activeUser } = useSelector((state) => state.user);
  const {
    featured,
    allVideos,
    movies,
    series,
    searchResults,
    favorites,
    recentlyAdded,
    lastFetched,
  } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const lists = buildGenreLists(movies);

  useEffect(() => {
    if (!activeUser) return;
    if (!allVideos?.length || !movies?.length || !series?.length) {
      dispatch(getVideos());
    }
  }, [activeUser, allVideos?.length, movies?.length, series?.length, dispatch]);

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
    <MainLayout>
      <View style={styles.container}>
        <Trailer featured video={featured} />
        <View style={styles.carouselWrapper}>
          {favorites?.length > 0 && <Carousel favs list={favorites} />}
          {recentlyAdded?.length > 0 && (
            <Carousel recent list={shuffleArray(recentlyAdded)} />
          )}
          <Carousel
            series
            list={shuffleArray(series ?? [])}
            count={series.length ?? 0}
          />
          {lists
            .filter((list) => list.movies.length > 0)
            .map((list) => (
              <Carousel key={list.name} list={list} count={10} />
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
    paddingVertical: 20,
  },
});
