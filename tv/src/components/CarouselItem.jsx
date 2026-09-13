import { memo } from 'react';
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

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_WIDTH = Math.min(
  437.3,
  Math.max(178, 127.16 + 0.1271 * SCREEN_WIDTH),
);
const ITEM_HEIGHT = ITEM_WIDTH * (99.93 / 178);

const CarouselItem = ({
  item,
  type,
  onFocusItem,
  focused,
  itemKey,
  onFocus,
  onBlur,
}) => {
  const { activeUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const isFavorite = activeUser?.favorites?.includes(item._id);

  const handleFocus = () => {
    onFocus(itemKey);
    onFocusItem?.();
  };

  const handlePress = () => {
    if (type === 'series') {
      dispatch(setSelectedSeries(item));
      navigation.navigate('SeriesDetails');
    } else {
      dispatch(setSelectedVideo(item));
      navigation.navigate('VideoDetails');
    }
  };

  return (
    <Pressable
      style={[styles.container, focused && styles.focused]}
      onFocus={handleFocus}
      onBlur={onBlur}
      onPress={handlePress}
    >
      <Image
        source={{ uri: item?.landscape }}
        style={styles.image}
        resizeMode='cover'
      />
      {focused && (
        <View style={styles.overlay}>
          <View style={styles.icons}>
            {isFavorite && (
              <MaterialIcons name='favorite' size={18} color='#e50914' />
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

export default memo(CarouselItem);

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
  icons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 4,
  },
  title: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  meta: {
    color: '#ccc',
    fontSize: 10,
  },
});
