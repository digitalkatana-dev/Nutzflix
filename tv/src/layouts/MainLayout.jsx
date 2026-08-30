import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View, ScrollView, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar, Button, Menu } from 'react-native-paper';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { logout } from '../redux/slices/userSlice';

const MainLayout = ({ children }) => {
  const { activeUser } = useSelector((state) => state.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <LinearGradient
      colors={['#141414', '#6b0ac9']}
      locations={[0.6, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <View style={styles.topbar}>
        <Menu
          visible={menuOpen}
          onDismiss={closeMenu}
          anchor={
            <Pressable style={styles.profile} onPress={openMenu} focusable>
              <Avatar.Image
                size={40}
                source={{ uri: activeUser?.profilePhoto }}
              />
              <MaterialIcons name='arrow-drop-down' size={24} color='#888' />
            </Pressable>
          }
        >
          <Pressable onPress={handleLogout} focusable>
            <Menu.Item title='Logout' dense />
          </Pressable>
        </Menu>
        <View style={styles.links}>
          <Text style={styles.temp}>Home</Text>
          <Text style={styles.temp}>Shows</Text>
          <Text style={styles.temp}>Movies</Text>
          <Text style={styles.temp}>My List</Text>
        </View>
        <Text style={styles.brand}>NUTZFLIX</Text>
      </View>
      <ScrollView style={styles.main}>{children}</ScrollView>
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
    height: 60,
    position: 'absolute',
    top: 0,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#141414',
    zIndex: 1000,
  },
  profile: {
    width: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  links: {
    flexDirection: 'row',
    gap: 40,
  },
  temp: {
    color: '#fff',
  },
  brand: {
    color: '#6b0ac9',
    fontSize: 25,
    fontFamily: 'SourGummy_600SemiBold',
  },
  main: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 30,
  },
});
