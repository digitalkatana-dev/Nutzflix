import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedVideo } from '../redux/slices/videoSlice';
import MainLayout from '../layouts/MainLayout';
import VideoItemV from '../components/VideoItemV';

const MoviesScreen = () => {
  const [focusedKey, setFocusedKey] = useState(null);
  const { movies } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  const handleFocus = (value) => {
    setFocusedKey(value);
  };

  const handleBlur = () => {
    setFocusedKey(null);
  };

  const handleMoviePress = (movie) => {
    dispatch(setSelectedVideo(movie));
  };

  return (
    <MainLayout
      focusedKey={focusedKey}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Movies</Text>
      </View>
      <ScrollView contentContainerStyle={styles.main}>
        {movies?.map((movie, idx) => {
          const key = `movie-${idx}`;
          return (
            <VideoItemV
              key={key}
              routeName='VideoDetails'
              image={movie.poster}
              capton={movie.title}
              focused={focusedKey === movie._id}
              onFocusItem={() => handleFocus(movie._id)}
              onBlurItem={handleBlur}
              onPress={() => handleMoviePress(movie)}
            />
          );
        })}
      </ScrollView>
    </MainLayout>
  );
};

export default MoviesScreen;

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'left',
    padding: 20,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  main: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 20,
    padding: 20,
  },
  test1: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
  test2: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
  test3: {
    width: 100,
    height: 100,
    backgroundColor: 'green',
  },
});
