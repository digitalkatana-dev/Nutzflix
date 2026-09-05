import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Text,
  Pressable,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { setFocusedKey } from '../redux/slices/appSlice';
import { userAuth, clearUserErrors } from '../redux/slices/userSlice';

const LoginScreen = () => {
  const { focusedKey } = useSelector((state) => state.app);
  const { loading, userErrors } = useSelector((state) => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleFocus = (value) => {
    dispatch(setFocusedKey(value));
  };

  const handleBlur = () => {
    dispatch(setFocusedKey(null));
  };

  const handleClearErrors = () => {
    dispatch(clearUserErrors());
  };

  const handleLogin = () => {
    const data = {
      email,
      password,
    };

    dispatch(userAuth(data));
  };

  return (
    <ImageBackground
      source={require('../../assets/login_background.jpg')}
      style={styles.background}
      resizeMode='cover'
    >
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,.85)']}
        style={styles.container}
      >
        <View style={styles.topbar}>
          <Text
            style={[styles.brand, styles.glowLayer, { textShadowRadius: 40 }]}
          >
            NUTZFLIX
          </Text>
          <Text
            style={[styles.brand, styles.glowLayer, { textShadowRadius: 20 }]}
          >
            NUTZFLIX
          </Text>
          <Text
            style={[styles.brand, styles.glowLayer, { textShadowRadius: 8 }]}
          >
            NUTZFLIX
          </Text>
          <Text style={styles.brand}>NUTZFLIX</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.header}>Sign In</Text>
          <TextInput
            mode='outlined'
            style={styles.input}
            textColor='#fff'
            dense
            placeholder='Email'
            placeholderTextColor='#888'
            autoCapitalize='none'
            inputMode='email'
            onFocus={handleClearErrors}
            value={email}
            onChangeText={setEmail}
          />
          {userErrors?.email && (
            <Text style={styles.error}>{userErrors?.email}</Text>
          )}
          <TextInput
            mode='outlined'
            style={styles.input}
            textColor='#fff'
            dense
            placeholder='Password'
            placeholderTextColor='#888'
            secureTextEntry={show ? false : true}
            onFocus={handleClearErrors}
            value={password}
            onChangeText={setPassword}
            right={
              <TextInput.Icon
                icon={show ? 'eye-off' : 'eye'}
                style={focusedKey === 'password' && styles.focused}
                onFocus={() => handleFocus('password')}
                onBlur={handleBlur}
                onPress={() => setShow(!show)}
                focusable
              />
            }
          />
          {userErrors?.password && (
            <Text style={styles.error}>{userErrors?.password}</Text>
          )}
          <Pressable
            style={[styles.btn, focusedKey === 'login' && styles.focusedBtn]}
            onFocus={() => handleFocus('login')}
            onBlur={handleBlur}
            onPress={handleLogin}
            disabled={loading}
            focusable
          >
            <Text
              style={[
                styles.btnTxt,
                focusedKey === 'login' && styles.focusedBtnTxt,
              ]}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Text>
          </Pressable>
          {userErrors?.login && (
            <Text style={styles.error}>{userErrors?.login}</Text>
          )}
          <Text style={styles.caption}>
            This is protected by the Red, the Track, and Tical. With a key.
          </Text>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    position: 'relative',
  },
  topbar: {
    width: '100%',
    position: 'absolute',
    top: 0,
  },
  brand: {
    color: '#6b0ac9',
    fontSize: 48,
    fontFamily: 'SourGummy_600SemiBold',
  },
  glowLayer: {
    position: 'absolute',
    textShadowColor: 'black',
    textShadowOffset: { width: 0, height: 0 },
  },
  card: {
    width: 350,
    backgroundColor: 'rgb(11,11,11)',
    padding: 30,
    borderRadius: 6,
  },
  header: {
    color: '#fff',
    fontFamily: 'SourGummy_600SemiBold',
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    backgroundColor: 'rgba(26, 16, 32, 0.85)',
    color: '#fff',
    borderRadius: 6,
    marginBottom: 16,
  },
  focused: {
    backgroundColor: '#6b0ac9',
  },
  btn: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 6,
    marginTop: 8,
    alignItems: 'center',
  },
  focusedBtn: {
    backgroundColor: '#6b0ac9',
  },
  btnTxt: {
    color: '#6b0ac9',
    fontWeight: 'bold',
  },
  focusedBtnTxt: {
    color: '#fff',
    fontWeight: 'bold',
  },
  caption: {
    textAlign: 'center',
    color: '#fff',
    marginTop: 10,
    fontSize: 13,
  },
  error: {
    color: 'crimson',
    marginBottom: 12,
    textAlign: 'center',
  },
});
