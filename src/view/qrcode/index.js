import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {view} from 'react-easy-state';
import {sys_colors, sys_styles, sys_text_styles} from '../../utils/constants';
import * as store from './store';
import {BackButton, GlobalHeader} from '../../components';
import QRCode from 'react-native-qrcode-svg';
export default view(({navigation, route}) => {
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    store.initialized();
    store.state.event = route.params.event;
    return () => {
      store.cleanUp();
    };
  }, [navigation, store]);
  return (
    <View style={sys_styles.scaffold}>
      <GlobalHeader
        title=""
        right={
          <BackButton
            iconName="close"
            color="black"
            style={{alignItems: 'center'}}
          />
        }
        style={{backgroundColor: sys_colors.primary}}
      />
      <View style={sys_styles.container}>
        <QRCode
          value={store.state.event.id}
          size={250}
          logoBackgroundColor={sys_colors.white}
        />
        <Text
          style={{
            ...sys_text_styles.header_black,
            marginTop: 20,
            textAlign: 'center',
            width: '50%',
          }}>
          Tunjukan QRCode ini kepada petugas pada hari yang sudah anda reservasi
        </Text>
      </View>
    </View>
  );
});
const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: sys_colors.primary,
  },
  text: {
    color: sys_colors.text.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
