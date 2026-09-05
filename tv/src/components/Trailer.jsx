import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { WebView } from 'react-native-webview';
import { Surface } from 'react-native-paper';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { useNavigation } from '@react-navigation/native';
import { setFocusedKey } from '../redux/slices/appSlice';
import { getEmbedHtml } from '../util/helpers';

const Trailer = ({ featured, video, onClick }) => {
  const { focusedKey } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleFocus = (value) => {
    dispatch(setFocusedKey(value));
  };

  const handleBlur = () => {
    dispatch(setFocusedKey(null));
  };

  const handlePlay = () => {
    onClick?.();
    navigation.navigate('Watch');
  };

  const handleInfo = () => {
    onClick?.();
    navigation.navigate('VideoDetails');
  };

  const InfoBlock = () => (
    <>
      <Text style={styles.info}>
        {`${video?.videoType} • ${video?.genre?.[0]} • ${video?.year} • ${video?.rating}`}
      </Text>
      <Text style={styles.desc} numberOfLines={3}>
        {video?.synopsis}
      </Text>
      <View style={styles.btnContainer}>
        <Pressable
          style={[
            styles.trailerBtn,
            styles.playBtn,
            focusedKey === 'trailer-play' && styles.focused,
          ]}
          onFocus={() => handleFocus('trailer-play')}
          onBlur={handleBlur}
          onPress={handlePlay}
          focusable
        >
          <MaterialIcons
            name='play-arrow'
            size={20}
            color={focusedKey === 'trailer-play' ? '#fff' : '#000'}
          />
          <Text
            style={[
              styles.playText,
              focusedKey === 'trailer-play' && styles.focusedTxt,
            ]}
          >
            Play
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.trailerBtn,
            styles.moreBtn,
            focusedKey === 'trailer-info' && styles.focused,
          ]}
          onFocus={() => handleFocus('trailer-info')}
          onBlur={handleBlur}
          onPress={handleInfo}
        >
          <MaterialIcons name='info-outline' size={20} color='#fff' />
          <Text style={styles.moreText}>Info</Text>
        </Pressable>
      </View>
    </>
  );

  return (
    <View style={[styles.container, !featured && styles.category]}>
      <Surface style={[styles.videoWrapper, !featured && styles.category]}>
        {getEmbedHtml(video?.trailer) ? (
          <WebView
            source={{
              html: getEmbedHtml(video?.trailer),
              baseUrl: 'https://www.nutzflix.net',
            }}
            style={styles.video}
            allowsFullscreenVideo
            mediaPlaybackRequiresUserAction={false}
          />
        ) : (
          <View style={[styles.video, { backgroundColor: '#000' }]} />
        )}
        <View style={styles.footer}>
          {video?.logo && (
            <Image
              source={{ uri: video.logo }}
              style={styles.logo}
              resizeMode='contain'
            />
          )}
          {featured && <InfoBlock />}
        </View>
      </Surface>
    </View>
  );
};

export default Trailer;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  category: {
    height: 220,
  },
  videoWrapper: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#1A1020',
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    backgroundColor: '#1A1020',
    borderRadius: 8,
  },
  footer: {
    width: '55%',
    position: 'absolute',
    bottom: 0,
    padding: 16,
  },
  logo: { width: 160, height: 50, marginBottom: 8 },
  info: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 4,
    textShadowColor: 'black',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 40,
  },
  desc: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 12,
    textShadowColor: 'black',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 40,
  },
  btnContainer: { flexDirection: 'row', gap: 12 },
  trailerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    gap: 6,
  },
  playBtn: { backgroundColor: '#fff' },
  moreBtn: { backgroundColor: 'rgba(255,255,255,0.2)' },
  playText: { color: '#000', fontWeight: 'bold' },
  moreText: { color: '#fff', fontWeight: 'bold' },
  focused: {
    backgroundColor: '#7b0fe0',
  },
  focusedTxt: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
