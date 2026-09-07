import { useState } from 'react';
import { View, Image, Text, Pressable, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';

import { addRemoveFavorite } from '../redux/slices/userSlice';
import { setSelectedSeason } from '../redux/slices/videoSlice';
import Trailer from '../components/Trailer';
import MainLayout from '../layouts/MainLayout';

const SeriesDetailsScreen = () => {
  const { activeUser } = useSelector((state) => state.user);
  const { selectedSeries } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [focusedKey, setFocusedKey] = useState(null);

  const watchList = activeUser?.favorites ?? [];
  const isFavorite = watchList.includes(selectedSeries?._id);

  const handleFocus = (key) => setFocusedKey(key);
  const handleBlur = () => setFocusedKey(null);

  const handleSeasonPress = (season) => {
    dispatch(setSelectedSeason(season));
    navigation.navigate('SeasonDetails');
  };

  const handleFavorite = () => {
    dispatch(addRemoveFavorite(selectedSeries?._id));
  };

  return (
    <MainLayout
      focusedKey={focusedKey}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <View style={styles.trailerWrapper}>
        <Trailer video={selectedSeries} />
      </View>

      <View style={styles.seriesInfo}>
        <View style={styles.flexWrapper}>
          <View style={styles.posterWrapper}>
            <Image
              source={{ uri: selectedSeries?.folder }}
              style={styles.poster}
              resizeMode='cover'
            />
          </View>

          <View style={styles.commonInfoWrapper}>
            <View style={styles.stack}>
              <Text style={styles.title}>{selectedSeries?.title}</Text>
              <Text style={styles.rating}>{selectedSeries?.rating}</Text>
              <Text style={styles.year}>{selectedSeries?.year}</Text>
            </View>
            {!!selectedSeries?.tagline && (
              <Text style={styles.tagline}>{selectedSeries.tagline}</Text>
            )}
            <Text style={styles.genre}>
              {selectedSeries?.genre?.map((g) => `${g} `)}
            </Text>

            <Pressable
              style={[
                styles.favIconWrapper,
                isFavorite && styles.favIconWrapperFull,
              ]}
              onFocus={() => handleFocus('fav')}
              onBlur={handleBlur}
              onPress={handleFavorite}
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

        <View style={styles.detailsWrapper}>
          <View style={styles.synopsis}>
            <Text style={styles.sectionTitle}>Synopsis</Text>
            <Text style={styles.synopsisText}>{selectedSeries?.synopsis}</Text>
          </View>

          <View style={styles.seasons}>
            <Text style={styles.sectionTitle}>Seasons</Text>
            <View style={styles.seasonsWrapper}>
              {selectedSeries?.seasons?.map((season, i) => {
                const key = season._id;
                return (
                  <Pressable
                    key={key}
                    style={styles.seasonLink}
                    onFocus={() => handleFocus(key)}
                    onBlur={handleBlur}
                    onPress={() => handleSeasonPress(season)}
                    focusable
                    hasTVPreferredFocus={i === 0}
                  >
                    <View
                      style={[
                        styles.seasonPosterWrapper,
                        focusedKey === key && styles.focused,
                      ]}
                    >
                      <Image
                        source={{ uri: season.folder }}
                        style={styles.seasonPoster}
                        resizeMode='cover'
                      />
                    </View>
                    <Text style={styles.seasonLabel}>{season.season}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.people}>
            <Text style={styles.sectionTitle}>Cast & Crew</Text>
            <View style={styles.peopleFlex}>
              {selectedSeries?.people?.map((p, i) => (
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

export default SeriesDetailsScreen;

const styles = StyleSheet.create({
  trailerWrapper: {
    padding: 20,
  },
  seriesInfo: {
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
  favIconWrapper: {
    alignSelf: 'flex-start',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 30,
    padding: 8,
    marginTop: 15,
  },
  favIconWrapperFull: {
    borderColor: '#e50914',
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
  seasons: {
    width: '100%',
    flexDirection: 'column',
    gap: 10,
  },
  seasonsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    paddingVertical: 20,
  },
  seasonLink: {
    flexDirection: 'column',
    gap: 10,
    alignItems: 'center',
    width: 150,
  },
  seasonPosterWrapper: {
    width: 150,
    height: 225,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#1A1020',
  },
  focused: {
    borderWidth: 3,
    borderColor: '#6b0ac9',
  },
  seasonPoster: {
    width: '100%',
    height: '100%',
  },
  seasonLabel: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
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
