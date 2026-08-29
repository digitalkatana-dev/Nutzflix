import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar, Icon } from 'react-native-paper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const MainLayout = ({ children }) => {
  const { activeUser } = useSelector((state) => state.user);

  return (
    <LinearGradient
      colors={['#141414', '#6b0ac9']}
      locations={[0.6, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <View style={styles.topbar}>
        <View>
          <Avatar.Image size={24} source={activeUser?.profilePhoto} />
          <MaterialIcons name='arrow-drop-down' size={24} color='black' />
        </View>
      </View>
      {children}
    </LinearGradient>
  );
};

export default MainLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  topbar: {
    width: '100%',
    height: 70,
    position: 'absolute',
    top: 0,
    backgroundColor: 'orange',
  },
});
