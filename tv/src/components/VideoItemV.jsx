import { View, Image, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const VideoItemV = ({
  routeName,
  onFocusItem,
  onPress,
  image,
  caption,
  focused,
  variant,
}) => {
  const navigation = useNavigation();
  const isSideItem = variant === 'side';

  const handlePress = () => {
    onPress?.();
    if (routeName) navigation.navigate(routeName);
  };

  return (
    <Pressable
      style={styles.vLink}
      onFocus={onFocusItem}
      onPress={handlePress}
      focusable
    >
      <View
        style={[
          styles.vItem,
          isSideItem ? styles.vItemNarrow : styles.vItemWide,
          focused && styles.focused,
        ]}
      >
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode='cover'
        />
      </View>
      <Text style={styles.caption} numberOfLines={2}>
        {caption}
      </Text>
    </Pressable>
  );
};

export default VideoItemV;

const styles = StyleSheet.create({
  vLink: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  vItem: {
    aspectRatio: 2 / 3,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#1A1020',
  },
  vItemWide: {
    width: 150,
  },
  vItemNarrow: {
    width: 75,
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
