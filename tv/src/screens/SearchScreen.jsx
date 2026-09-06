import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainLayout from '../layouts/MainLayout';

const SearchScreen = () => {
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
      <Text>SearchScreen</Text>
    </MainLayout>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
