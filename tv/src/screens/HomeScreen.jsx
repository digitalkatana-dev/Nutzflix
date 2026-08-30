import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import MainLayout from '../layouts/MainLayout';
import Trailer from '../components/Trailer';

const HomeScreen = () => {
  const { featured, movies, series, searchResults, favorites, recentlyAdded } =
    useSelector((state) => state.video);
  const dispatch = useDispatch();

  return (
    <MainLayout>
      <View style={styles.container}>
        <Trailer featured video={featured} />
        <Pressable>
          <Text style={styles.temp}>Blah</Text>
        </Pressable>
        <Text style={styles.temp}>Blah</Text>
        <Text style={styles.temp}>Blah</Text>
        <Text style={styles.temp}>Blah</Text>
        <Text style={styles.temp}>Blah</Text>
        <Text style={styles.temp}>Blah</Text>
        <Text style={styles.temp}>Blah</Text>
        <Text style={styles.temp}>Blah</Text>
      </View>
    </MainLayout>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
  },
  temp: {
    color: 'white',
  },
});
