import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainLayout from '../layouts/MainLayout';

const MyListScreen = () => {
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
      <Text>MyListScreen</Text>
    </MainLayout>
  );
};

export default MyListScreen;

const styles = StyleSheet.create({});
