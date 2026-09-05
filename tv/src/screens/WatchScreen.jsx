import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View, Text, Pressable, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { setFocusedKey } from '../redux/slices/appSlice';
import { clearAllSelected } from '../redux/slices/videoSlice';
import nutzflixApi from '../api/nutzflixApi';

const HIDE_DELAY_MS = 5000;
const SEEK_SECONDS = 10;

const WatchScreen = () => {
  const { focusedKey } = useSelector((state) => state.app);
  const { selectedVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [streamInfo, setStreamInfo] = useState(null);
  const [error, setError] = useState(null);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState({ current: 0, duration: 0 });

  const videoViewRef = useRef(null);
  const wakeRef = useRef(null);
  const playPauseRef = useRef(null);
  const hideTimer = useRef(null);

  const currentStream =
    streamInfo?.videoId === selectedVideo?._id ? streamInfo : null;

  const player = useVideoPlayer(null, (p) => {
    p.play();
  });

  const handleFocus = (value) => {
    dispatch(setFocusedKey(value));
  };

  const handleBlur = () => {
    dispatch(setFocusedKey(null));
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

  // the "wake" surface: the only focusable thing while controls are hidden.
  // Pressing OK/center on it reveals the bar and hands focus to play/pause.
  const handleWake = () => {
    if (!controlsVisible) showControls();
  };

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
      setProgress({ current: currentTime, duration: player.duration || 0 });
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

  const toggleFullscreen = () => {
    if (isFullscreen) videoViewRef.current?.exitFullscreen?.();
    else videoViewRef.current?.enterFullscreen?.();
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
        ref={videoViewRef}
        style={styles.video}
        player={player}
        contentFit='contain'
        nativeControls={false}
        allowsFullscreen
        onFullscreenEnter={() => setIsFullscreen(true)}
        onFullscreenExit={() => setIsFullscreen(false)}
      />

      {/* invisible full-screen wake surface — only focusable thing while controls are hidden */}
      {!controlsVisible && (
        <Pressable
          ref={wakeRef}
          style={StyleSheet.absoluteFill}
          onPress={handleWake}
          focusable
        />
      )}

      {controlsVisible && (
        <View style={styles.controlsOverlay}>
          <Pressable style={styles.back} onPress={handleBack} focusable>
            <View style={styles.iconBacking}>
              <MaterialIcons name='arrow-back-ios' size={18} color='#fff' />
            </View>
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
                style={styles.ctrlBtn}
                onPress={() => seek(-SEEK_SECONDS)}
                focusable
              >
                <MaterialIcons name='replay-10' size={28} color='#fff' />
              </Pressable>

              <Pressable
                ref={playPauseRef}
                style={styles.ctrlBtn}
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
                style={styles.ctrlBtn}
                onPress={() => seek(SEEK_SECONDS)}
                focusable
              >
                <MaterialIcons name='forward-10' size={28} color='#fff' />
              </Pressable>

              <Pressable
                style={styles.ctrlBtn}
                onPress={toggleFullscreen}
                focusable
              >
                <MaterialIcons
                  name={isFullscreen ? 'fullscreen-exit' : 'fullscreen'}
                  size={28}
                  color='#fff'
                />
              </Pressable>
            </View>
          </View>
        </View>
      )}

      {/* <Pressable
        style={[styles.back, focusedKey === 'back' && styles.focused]}
        onFocus={() => handleFocus('back')}
        onBlur={handleBlur}
        onPress={handleBack}
        rippleColor='rgba(255, 255, 255, 0.3)'
        focusable
      >
        <View style={styles.iconBacking}>
          <MaterialIcons name='arrow-back-ios' size={18} color='#fff' />
        </View>
        <Text style={styles.backText}>Home</Text>
      </Pressable> */}

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
    alignItems: 'center',
    gap: 24,
  },
  ctrlBtn: {
    padding: 10,
    borderRadius: 30,
  },
  focused: {
    backgroundColor: '#6b0ac9',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
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
