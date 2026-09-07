import { useNavigation } from '@react-navigation/native';
import { Image, Text, Pressable, StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';

const VideoItemH = ({
  routeName,
  onFocusItem,
  onPress,
  image,
  caption,
  focused,
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    onPress?.();
    if (routeName) navigation.navigate(routeName);
  };

  return (
    <Pressable
      style={styles.hLink}
      onFocus={onFocusItem}
      onPress={handlePress}
      focusable
    >
      <Surface style={[styles.hItem, focused && styles.focused]}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode='cover'
        />
      </Surface>
      <Text style={styles.caption} numberOfLines={2}>
        {caption}
      </Text>
    </Pressable>
  );
};

export default VideoItemH;

const styles = StyleSheet.create({
  hLink: {
    flexDirection: 'column',
    gap: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  hItem: {
    width: 225,
    height: 150,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#1A1020',
  },
  focused: {
    borderWidth: 3,
    borderColor: '#6b0ac9',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  caption: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});
