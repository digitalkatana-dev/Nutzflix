import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainLayout from '../layouts/MainLayout';

const SeriesDetailsScreen = () => {
  const [focusedKey, setFocusedKey] = useState(null);

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
      <Text>SeriesDetailsScreen</Text>
    </MainLayout>
  );
};

export default SeriesDetailsScreen;

const styles = StyleSheet.create({});
