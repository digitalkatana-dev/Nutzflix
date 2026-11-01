import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../layouts/MainLayout';
import VideoItemV from '../components/VideoItemV';

const SeriesScreen = () => {
  const [focusedKey, setFocusedKey] = useState(null);
  const { series } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  const handleFocus = (value) => {
    setFocusedKey(value);
  };

  const handleBlur = () => {
    setFocusedKey(null);
  };

  return (
    <MainLayout
      focusedKey={focusedKey}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Series</Text>
      </View>
      <ScrollView contentContainerStyle={styles.main}>
        {series?.map((series, idx) => {
          const key = `serie-${idx}`;
          return (
            <VideoItemV
              key={key}
              routeName='SeriesDetails'
              image={series.poster}
              capton={series.title}
              focused={focusedKey === series._id}
              onFocusItem={() => handleFocus(series._id)}
              onBlurItem={handleBlur}
            />
          );
        })}
      </ScrollView>
    </MainLayout>
  );
};

export default SeriesScreen;

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'left',
    padding: 20,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  main: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 20,
    padding: 20,
  },
});
