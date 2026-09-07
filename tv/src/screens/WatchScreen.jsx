import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  BackHandler,
  useTVEventHandler,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { clearAllSelected } from '../redux/slices/videoSlice';
import nutzflixApi from '../api/nutzflixApi';

const HIDE_DELAY_MS = 7000;
const SEEK_SECONDS = 10;

const WatchScreen = () => {
  const { selectedVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [focusedKey, setFocusedKey] = useState(null);
  const [streamInfo, setStreamInfo] = useState(null);
  const [error, setError] = useState(null);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState({ current: 0, duration: 0 });

  const playPauseRef = useRef(null);
  const hideTimer = useRef(null);

  const currentStream =
    streamInfo?.videoId === selectedVideo?._id ? streamInfo : null;

  const player = useVideoPlayer(null, (p) => {
    p.timeUpdateEventInterval = 1; // emit timeUpdate roughly once per second
    p.play();
  });

  const handleFocus = (value) => {
    setFocusedKey(value);
  };

  const handleBlur = () => {
    setFocusedKey(null);
  };

  // --- controls visibility / auto-hide ---
  const resetHideTimer = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(
      () => setControlsVisible(false),
      HIDE_DELAY_MS,
    );
  };

  const showControls = () => {
    setControlsVisible(true);
    resetHideTimer();
  };

  useEffect(() => {
    resetHideTimer();
    return () => clearTimeout(hideTimer.current);
  }, []);

  // when controls become visible, move real focus onto play/pause
  useEffect(() => {
    if (controlsVisible) {
      playPauseRef.current?.focus?.();
    }
  }, [controlsVisible]);

  // wake on any D-pad press (directional or center), not just a focused Pressable's onPress
  const tvEventHandlerCallback = (event) => {
    const dpadKeys = ['up', 'down', 'left', 'right', 'select'];
    if (dpadKeys.includes(event?.eventType)) {
      showControls();
    }
  };

  useTVEventHandler(tvEventHandlerCallback);

  // --- playback state sync ---
  useEffect(() => {
    const sub = player.addListener(
      'playingChange',
      ({ isPlaying: playing }) => {
        setIsPlaying(playing);
      },
    );
    return () => sub.remove();
  }, [player]);

  useEffect(() => {
    const sub = player.addListener('timeUpdate', ({ currentTime }) => {
      setProgress((prev) => ({
        current: currentTime,
        duration: player.duration || prev.duration,
      }));
    });
    return () => sub.remove();
  }, [player]);

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
        const res = await nutzflixApi.get(`/api/videos/${videoId}/stream/tv`, {
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

  // --- control actions ---
  const togglePlay = () => {
    if (player.playing) player.pause();
    else player.play();
    showControls();
  };

  const seek = (deltaSeconds) => {
    player.currentTime = Math.max(
      0,
      Math.min(progress.duration, player.currentTime + deltaSeconds),
    );
    showControls();
  };

  const formatTime = (secs) => {
    if (!secs || Number.isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60)
      .toString()
      .padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <View style={styles.watch}>
      <VideoView
        style={styles.video}
        player={player}
        contentFit='contain'
        nativeControls={false}
      />

      {!controlsVisible && (
        <Pressable
          style={StyleSheet.absoluteFill}
          focusable
          hasTVPreferredFocus
        />
      )}

      {controlsVisible && (
        <View style={styles.controlsOverlay}>
          <Pressable
            style={[styles.back, focusedKey === 'back' && styles.focused]}
            onFocus={() => handleFocus('back')}
            onBlur={handleBlur}
            onPress={handleBack}
            focusable
          >
            <MaterialIcons name='arrow-back-ios' size={18} color='#fff' />
            <Text style={styles.backText}>Home</Text>
          </Pressable>

          <View style={styles.bottomBar}>
            <View style={styles.progressRow}>
              <Text style={styles.timeText}>
                {formatTime(progress.current)}
              </Text>
              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${progress.duration ? (progress.current / progress.duration) * 100 : 0}%`,
                    },
                  ]}
                />
              </View>
              <Text style={styles.timeText}>
                {formatTime(progress.duration)}
              </Text>
            </View>

            <View style={styles.buttonRow}>
              <Pressable
                style={[
                  styles.ctrlBtn,
                  focusedKey === 'rewind' && styles.focused,
                ]}
                onFocus={() => handleFocus('rewind')}
                onBlur={handleBlur}
                onPress={() => seek(-SEEK_SECONDS)}
                focusable
              >
                <MaterialIcons name='replay-10' size={28} color='#fff' />
              </Pressable>

              <Pressable
                ref={playPauseRef}
                style={[
                  styles.ctrlBtn,
                  focusedKey === 'playPause' && styles.focused,
                ]}
                onFocus={() => handleFocus('playPause')}
                onBlur={handleBlur}
                onPress={togglePlay}
                focusable
                hasTVPreferredFocus
              >
                <MaterialIcons
                  name={isPlaying ? 'pause' : 'play-arrow'}
                  size={32}
                  color='#fff'
                />
              </Pressable>

              <Pressable
                style={[
                  styles.ctrlBtn,
                  focusedKey === 'forward' && styles.focused,
                ]}
                onFocus={() => handleFocus('forward')}
                onBlur={handleBlur}
                onPress={() => seek(SEEK_SECONDS)}
                focusable
              >
                <MaterialIcons name='forward-10' size={28} color='#fff' />
              </Pressable>
            </View>
          </View>
        </View>
      )}
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
  backText: {
    color: '#fff',
    fontSize: 16,
    textShadowColor: '#141414',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  controlsOverlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  bottomBar: {
    padding: 30,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  timeText: {
    color: '#fff',
    fontSize: 12,
    width: 44,
  },
  progressTrack: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6b0ac9',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'relative',
    gap: 24,
  },
  ctrlBtn: {
    padding: 10,
    borderRadius: 30,
  },
  focused: {
    backgroundColor: '#6b0ac9',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 30,
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
