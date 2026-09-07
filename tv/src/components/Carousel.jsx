import { useRef } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import CarouselItem from './CarouselItem';

const Carousel = ({
  carouselId,
  list,
  series,
  favs,
  recent,
  count = 20,
  focusedKey,
  onFocus,
  onBlur,
}) => {
  const scrollRef = useRef(null);
  const positions = useRef({});

  const title = series
    ? 'Series'
    : favs
      ? 'My List'
      : recent
        ? 'Recently Added'
        : list?.name;
  const videos = list?.movies || list;

  const handleItemFocus = (index) => {
    const x = positions.current[index];
    if (x != null)
      scrollRef.current?.scrollTo({ x: Math.max(x - 40, 0), animated: true });
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {videos?.slice(0, count).map((item, i) => {
          const itemId = item._id ?? i;
          const composedKey = `${carouselId}:${itemId}`;
          return (
            <View
              key={itemId}
              onLayout={(e) => {
                positions.current[i] = e.nativeEvent.layout.x;
              }}
            >
              <CarouselItem
                item={item}
                type={
                  item.videoType?.toLowerCase() === 'series'
                    ? 'series'
                    : 'movie'
                }
                onFocusItem={() => handleItemFocus(i)}
                focused={focusedKey === composedKey}
                itemKey={composedKey}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  wrapper: { marginTop: 10, width: '100%' },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 5,
    fontSize: 18,
  },
  row: {
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
});
