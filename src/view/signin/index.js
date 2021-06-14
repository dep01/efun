import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {view} from 'react-easy-state';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {sys_colors, sys_icons, sys_styles} from '../../utils/constants';
import * as store from './store';
import {
  GlobalHeader,
  BackButton,
  CustomInput,
  CustomButton,
} from '../../components';

export default view(({navigation}) => {
  useEffect(() => {
    store.initialized();
    return () => {
      store.cleanUp();
    };
  }, [navigation, store]);
  return (
    <View style={sys_styles.scaffold}>
      <GlobalHeader title="welcome back" type="secondary" />
      <View style={sys_styles.container}>
        <Image
          source={sys_icons.ic_logo}
          style={styles.images}
          resizeMode="contain"
        />
        <CustomInput
          placeholder="Input email or phone number"
          value={store.state.email}
          onChangeText={(val) => store.handleChangeEmail(val)}
          label="Email or Phone"
        />
        <CustomInput
          placeholder="Input your password"
          label="Password"
          onChangeText={(val) => store.handleChangePassword(val)}
          value={store.state.password}
          secureTextEntry={store.state.secureText}
          right={
            <TouchableOpacity
              onPress={() => {
                store.state.secureText = !store.state.secureText;
              }}
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Icon name={store.state.secureText ? 'eye' : 'eye-slash'} />
            </TouchableOpacity>
          }
        />
        <View style={styles.containerButton}>
          <CustomButton
            style={styles.buttonLogin}
            title="signin"
            onPress={() => store.doLogin({navigation})}
          />
          <CustomButton
            style={styles.buttonLogin}
            title="signup"
            type="secondary"
            onPress={() => navigation.navigate('signup')}
          />
        </View>
      </View>
    </View>
  );
});
const styles = StyleSheet.create({
  containerButton: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 15,
  },
  images: {
    height: 120,
    width: 120,
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonLogin: {
    margin: 5,
  },
});
