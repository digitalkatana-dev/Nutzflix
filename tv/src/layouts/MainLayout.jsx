import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View, ScrollView, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar, Button, Divider, Menu } from 'react-native-paper';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { setFocusedKey } from '../redux/slices/appSlice';
import { logout } from '../redux/slices/userSlice';

const MainLayout = ({ children }) => {
  const { focusedKey } = useSelector((state) => state.app);
  const { activeUser } = useSelector((state) => state.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);

  const navLinks = ['Home', 'Series', 'Movies', 'My List'];

  const handleFocus = (value) => {
    dispatch(setFocusedKey(value));
  };

  const handleBlur = () => {
    dispatch(setFocusedKey(null));
  };

  const handleEscape = () => {
    setMenuOpen(false);
  };

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
            <Pressable
              style={[
                styles.profile,
                focusedKey === 'profile' && styles.focused,
              ]}
              onFocus={() => handleFocus('profile')}
              onBlur={handleBlur}
              onPress={openMenu}
              focusable
            >
              <Avatar.Image
                size={30}
                source={{ uri: activeUser?.profilePhoto }}
              />
              <MaterialIcons name='arrow-drop-down' size={24} color='#888' />
            </Pressable>
          }
        >
          <Pressable
            style={[styles.btn, focusedKey === 'escape' && styles.focused]}
            onFocus={() => handleFocus('escape')}
            onBlur={handleBlur}
            onPress={handleEscape}
            focusable
          >
            <Menu.Item
              leadingIcon={() => (
                <Avatar.Image
                  size={25}
                  source={{ uri: activeUser?.profilePhoto }}
                />
              )}
              title={activeUser?.firstName}
              dense
            />
          </Pressable>
          <Divider />
          <Pressable
            style={[
              styles.btn,
              styles.btnBottom,
              focusedKey === 'logout' && styles.focused,
            ]}
            onFocus={() => handleFocus('logout')}
            onBlur={handleBlur}
            onPress={handleLogout}
            focusable
          >
            <Menu.Item leadingIcon='logout' title='Logout' dense />
          </Pressable>
        </Menu>
        <View style={styles.links}>
          {navLinks.map((label) => (
            <Pressable
              key={label}
              onFocus={() => handleFocus(label)}
              onBlur={handleBlur}
              focusable
            >
              <Text
                style={[
                  styles.temp,
                  focusedKey === label && styles.focusedText,
                ]}
              >
                {label}
              </Text>
            </Pressable>
          ))}
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
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  focused: {
    borderWidth: 2,
    borderColor: '#6b0ac9',
  },
  focusedText: {
    color: '#6b0ac9',
  },
  profile: {
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
