import React, {useEffect} from 'react';
import {ActivityIndicator, Image, View, StyleSheet} from 'react-native';
import {sys_icons, sys_colors} from '../../utils/constants';
import AsyncStorage from '@react-native-community/async-storage';
export default ({navigation}) => {
  const timer = async () => {
    const isLogin = await AsyncStorage.getItem('access_token');
    setTimeout(() => {
      isLogin ? navigation.replace('homepage') : navigation.replace('signin');
    }, 2000);
  };
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    timer();
  }, [timer]);
  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        source={sys_icons.ic_logo}
        style={styles.image}
      />
      <ActivityIndicator
        size={32}
        color={sys_colors.secondary}
        style={styles.loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: sys_colors.primary,
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  image: {height: 150, width: 150, borderRadius: 75},
  loading: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
});
