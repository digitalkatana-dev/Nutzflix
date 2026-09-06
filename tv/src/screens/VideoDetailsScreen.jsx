import { useState } from 'react';
import { View, Image, Text, Pressable, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';

import { addRemoveFavorite } from '../redux/slices/userSlice';
import { setSelectedVideo } from '../redux/slices/videoSlice';
import MainLayout from '../layouts/MainLayout';
import Trailer from '../components/Trailer';

const VideoDetailsScreen = () => {
  const [focusedKey, setFocusedKey] = useState(null);
  const { activeUser } = useSelector((state) => state.user);
  const { selectedVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const watchList = activeUser?.favorites ?? [];
  const isFavorite = watchList.includes(selectedVideo?._id);

  const handleFocus = (value) => {
    setFocusedKey(value);
  };

  const handleBlur = () => {
    setFocusedKey(null);
  };

  const handlePlay = () => {
    dispatch(setSelectedVideo(selectedVideo));
    navigation.navigate('Watch');
  };

  const handleFavorite = () => {
    dispatch(addRemoveFavorite(selectedVideo?._id));
  };

  return (
    <MainLayout
      focusedKey={focusedKey}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <View style={styles.trailerWrapper}>
        <Trailer video={selectedVideo} />
      </View>

      <View style={styles.videoInfo}>
        <View style={styles.flexWrapper}>
          <View style={styles.posterWrapper}>
            <Image
              source={{ uri: selectedVideo?.poster }}
              style={styles.poster}
              resizeMode='cover'
            />
          </View>

          <View style={styles.commonInfoWrapper}>
            <View style={styles.stack}>
              <Text style={styles.title}>{selectedVideo?.title}</Text>
              <Text style={styles.rating}>{selectedVideo?.rating}</Text>
              <Text style={styles.year}>{selectedVideo?.year}</Text>
            </View>
            <Text style={styles.tagline}>{selectedVideo?.tagline}</Text>
            <Text style={styles.genre}>
              {selectedVideo?.genre?.map((g) => `${g} `)}
            </Text>

            <View style={styles.actions}>
              <Pressable
                style={[
                  styles.playBtn,
                  focusedKey === 'play' && styles.playBtnFocused,
                ]}
                onPress={handlePlay}
                onFocus={() => handleFocus('play')}
                onBlur={handleBlur}
                focusable
                hasTVPreferredFocus
              >
                <Text
                  style={[
                    styles.playText,
                    focusedKey === 'play' && styles.playTextFocused,
                  ]}
                >
                  PLAY
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.favIconWrapper,
                  focusedKey === 'favorite' && styles.favIconWrapperFocused,
                  isFavorite &&
                    focusedKey === 'favorite' &&
                    styles.favIconWrapperFullFocused,
                ]}
                onPress={handleFavorite}
                onFocus={() => handleFocus('favorite')}
                onBlur={handleBlur}
                focusable
              >
                <MaterialIcons
                  name={isFavorite ? 'favorite' : 'favorite-border'}
                  size={22}
                  color={isFavorite ? '#e50914' : '#fff'}
                />
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.detailsWrapper}>
          <View style={styles.synopsis}>
            <Text style={styles.sectionTitle}>Synopsis</Text>
            <Text style={styles.synopsisText}>{selectedVideo?.synopsis}</Text>
          </View>

          <View style={styles.people}>
            <Text style={styles.sectionTitle}>Cast & Crew</Text>
            <View style={styles.peopleFlex}>
              {selectedVideo?.people?.map((p, i) => (
                <View style={styles.crew} key={`${p.Id}-${p.Role}-${i}`}>
                  <Text style={styles.crewRole}>{p.Role}</Text>
                  <Text style={styles.crewName}>{p.Name}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    </MainLayout>
  );
};

export default VideoDetailsScreen;

const styles = StyleSheet.create({
  trailerWrapper: {
    padding: 20,
  },
  videoInfo: {
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
  rating: {
    color: 'darkgrey',
    borderWidth: 1,
    borderColor: 'grey',
    paddingHorizontal: 3,
    paddingVertical: 1,
    alignSelf: 'flex-start',
  },
  year: {
    color: 'darkgrey',
  },
  tagline: {
    color: '#fff',
    fontSize: 16,
    fontStyle: 'italic',
  },
  genre: {
    color: 'darkgrey',
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 15,
  },
  playBtn: {
    width: 100,
    height: 40,
    backgroundColor: '#6b0ac9',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  playBtnFocused: {
    backgroundColor: '#fff',
  },
  playText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  playTextFocused: {
    color: '#6b0ac9',
  },
  favIconWrapper: {
    padding: 8,
  },
  favIconWrapperFocused: {
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 30,
  },
  favIconWrapperFullFocused: {
    borderWidth: 2,
    borderColor: '#e50914',
    borderRadius: 30,
  },
  detailsWrapper: {
    flexDirection: 'column',
    gap: 30,
    padding: 10,
  },
  synopsis: {
    width: '100%',
    flexDirection: 'column',
    gap: 10,
  },
  synopsisText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 22,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  people: {
    width: '100%',
    flexDirection: 'column',
    gap: 10,
  },
  peopleFlex: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 15,
    marginTop: 15,
  },
  crew: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 1.5,
  },
  crewRole: {
    color: 'darkgrey',
    fontSize: 12,
  },
  crewName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
