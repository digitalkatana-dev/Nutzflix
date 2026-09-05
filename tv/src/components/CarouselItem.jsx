import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  setSelectedVideo,
  setSelectedSeries,
} from '../redux/slices/videoSlice';
import { setFocusedKey } from '../redux/slices/appSlice';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_WIDTH = Math.min(
  437.3,
  Math.max(178, 127.16 + 0.1271 * SCREEN_WIDTH),
);
const ITEM_HEIGHT = ITEM_WIDTH * (99.93 / 178);

const CarouselItem = ({ item, type, onFocusItem }) => {
  const { focusedKey } = useSelector((state) => state.app);
  const { activeUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const isFocused = focusedKey === item._id ? true : false;
  const isFavorite = activeUser?.favorites?.includes(item._id);

  const handleFocus = () => {
    dispatch(setFocusedKey(item._id));
    onFocusItem?.();
  };

  const handleBlur = () => {
    dispatch(setFocusedKey(null));
  };

  const handlePress = () => {
    if (type === 'series') {
      dispatch(setSelectedSeries(item));
      navigation.navigate('SeriesDetails');
    } else {
      dispatch(setSelectedVideo(item));
      navigation.navigate('Watch');
    }
  };

  return (
    <Pressable
      style={[styles.container, isFocused && styles.focused]}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onPress={handlePress}
    >
      <Image
        source={{ uri: item?.backdrop }}
        style={styles.image}
        resizeMode='cover'
      />
      {isFocused && (
        <View style={styles.overlay}>
          <View style={styles.icons}>
            {isFavorite && (
              <MaterialIcons
                name={isFavorite ? 'favorite' : 'favorite-border'}
                size={18}
                color={isFavorite ? '#e50914' : '#fff'}
              />
            )}
          </View>
          <Text style={styles.title} numberOfLines={1}>
            {item?.title}
          </Text>
          <Text
            style={styles.meta}
            numberOfLines={1}
          >{`${item?.rating ?? ''}  ${item?.year ?? ''}`}</Text>
        </View>
      )}
    </Pressable>
  );
};

export default CarouselItem;

const styles = StyleSheet.create({
  container: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#1A1020',
    marginHorizontal: 5,
  },
  focused: {
    transform: [{ scale: 1.15 }],
    borderWidth: 2,
    borderColor: '#fff',
    zIndex: 10,
  },
  image: { width: '100%', height: '100%' },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.75)',
    padding: 6,
  },
  icons: { flexDirection: 'row', gap: 8, marginBottom: 4 },
  iconBtn: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 20,
    padding: 4,
  },
  title: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  meta: { color: '#ccc', fontSize: 10 },
});
