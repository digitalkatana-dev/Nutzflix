import { useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedVideo } from '../redux/slices/videoSlice';
import MainLayout from '../layouts/MainLayout';
import VideoItemH from '../components/VideoItemH';

const SeasonDetailsScreen = () => {
  const { selectedSeason } = useSelector((state) => state.video);
  const [focusedKey, setFocusedKey] = useState(null);
  const dispatch = useDispatch();

  const handleFocus = (value) => {
    setFocusedKey(value);
  };

  const handleBlur = () => {
    setFocusedKey(null);
  };

  const handleEpisodePress = (ep) => {
    dispatch(setSelectedVideo(ep));
  };

  return (
    <MainLayout
      focusedKey={focusedKey}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <View style={styles.backdropWrapper}>
        <Image
          source={{ uri: selectedSeason?.backdrop }}
          style={styles.backdrop}
          resizeMode='cover'
        />
      </View>

      <View style={styles.seasonInfo}>
        <View style={styles.flexWrapper}>
          <View style={styles.posterWrapper}>
            <Image
              source={{ uri: selectedSeason?.folder }}
              style={styles.poster}
              resizeMode='cover'
            />
          </View>

          <View style={styles.commonInfoWrapper}>
            <View style={styles.stack}>
              <Text style={styles.title}>{selectedSeason?.season}</Text>
              <Text style={styles.year}>{selectedSeason?.year}</Text>
            </View>
          </View>
        </View>

        <View style={styles.detailsWrapper}>
          <View style={styles.episodes}>
            <Text style={styles.sectionTitle}>Episodes</Text>
            <View style={styles.episodesWrapper}>
              {selectedSeason?.episodes?.map((ep, i) => {
                const key = ep._id;
                return (
                  <VideoItemH
                    key={key}
                    routeName='Watch'
                    image={ep.thumb}
                    caption={`Episode ${ep.epNum} ${ep.title}`}
                    focused={focusedKey === ep._id}
                    onFocusItem={() => handleFocus(ep._id)}
                    onPress={() => handleEpisodePress(ep)}
                  />
                );
              })}
            </View>
          </View>
        </View>
      </View>
    </MainLayout>
  );
};

export default SeasonDetailsScreen;

const styles = StyleSheet.create({
  backdropWrapper: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#1A1020',
  },
  backdrop: {
    width: '100%',
    height: '100%',
  },
  seasonInfo: {
    flexDirection: 'column',
    gap: 20,
    padding: 20,
  },
  flexWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  posterWrapper: {
    width: 300,
    aspectRatio: 2 / 3,
    overflow: 'hidden',
    borderRadius: 7,
    backgroundColor: '#1A1020',
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  commonInfoWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 20,
    padding: 10,
  },
  stack: {
    flexDirection: 'column',
    gap: 8,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  year: {
    color: 'darkgrey',
    fontSize: 28,
    fontWeight: 'bold',
  },
  detailsWrapper: {
    flexDirection: 'column',
    gap: 30,
    padding: 10,
  },
  episodes: {
    width: '100%',
    flexDirection: 'column',
    gap: 30,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  episodesWrapper: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
  episodeCard: {
    width: 225,
    flexDirection: 'column',
    gap: 8,
  },
  episodeThumbWrapper: {
    width: 225,
    aspectRatio: 16 / 9,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#1A1020',
  },
  focused: {
    borderWidth: 3,
    borderColor: '#6b0ac9',
  },
  episodeThumb: {
    width: '100%',
    height: '100%',
  },
  episodeCaption: {
    color: '#fff',
    fontSize: 14,
  },
});
