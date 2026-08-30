import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View, Text, Pressable, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';

import { clearAllSelected } from '../redux/slices/videoSlice';
import nutzflixApi from '../api/nutzflixApi';

const WatchScreen = () => {
  const { selectedVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [streamInfo, setStreamInfo] = useState(null);
  const [error, setError] = useState(null);

  const currentStream =
    streamInfo?.videoId === selectedVideo?._id ? streamInfo : null;

  const player = useVideoPlayer(null, (p) => {
    p.play();
  });

  const handleBack = () => {
    setTimeout(() => {
      dispatch(clearAllSelected());
    }, 1000);
    navigation.navigate('Home');
  };

  // TV remote's back/menu button — no web equivalent, required so users
  // aren't stuck or accidentally exit the whole app from this screen
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      handleBack();
      return true;
    });
    return () => sub.remove();
  }, []);

  // fetch the playable stream URL for this specific video
  useEffect(() => {
    const videoId = selectedVideo?._id;
    if (!videoId) return;

    const controller = new AbortController();

    const fetchStreamInfo = async () => {
      try {
        const res = await nutzflixApi.get(`/api/videos/${videoId}/stream`, {
          signal: controller.signal,
        });
        setStreamInfo({ ...res.data, videoId });
        setError(null);
      } catch (err) {
        if (err.name !== 'CanceledError' && err.code !== 'ERR_CANCELED') {
          console.error('Stream info error:', err);
          setError('Unable to load this video.');
        }
      }
    };

    fetchStreamInfo();
    return () => controller.abort();
  }, [selectedVideo?._id]);

  // hand the URL to the player — ExoPlayer/AVPlayer handle HLS natively,
  // no hls.js or transcoded-vs-direct branching required
  useEffect(() => {
    if (!currentStream?.streamURL) return;

    player.replaceAsync(currentStream.streamURL).catch((err) => {
      console.error('Playback error:', err);
      setError('Playback error — please try again.');
    });
  }, [currentStream, player]);

  return (
    <View style={styles.watch}>
      <VideoView
        style={styles.video}
        player={player}
        contentFit='contain'
        allowsFullscreen
        nativeControls
      />

      <Pressable style={styles.back} onPress={handleBack} focusable>
        <View style={styles.iconBacking}>
          <MaterialIcons name='arrow-back-ios' size={18} color='#fff' />
        </View>
        <Text style={styles.backText}>Home</Text>
      </Pressable>

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default WatchScreen;

const styles = StyleSheet.create({
  watch: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  back: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  iconBacking: {
    backgroundColor: 'rgba(20, 20, 20, 0.6)',
    borderRadius: 20,
    padding: 4,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    textShadowColor: '#141414',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  error: {
    position: 'absolute',
    top: '45%',
    alignSelf: 'center',
    color: 'crimson',
    fontSize: 16,
    zIndex: 10,
  },
});
