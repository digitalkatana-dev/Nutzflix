import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainLayout from '../layouts/MainLayout';

const HomeScreen = () => {
  return (
    <MainLayout>
      <View style={styles.container}></View>
    </MainLayout>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
  },
});
