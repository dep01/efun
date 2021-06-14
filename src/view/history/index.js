import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {view} from 'react-easy-state';
import {sys_colors, sys_styles, sys_text_styles} from '../../utils/constants';
import * as store from './store';
import {GlobalHeader, LoadingIndicator} from '../../components';
import {SysCurrencyTransform, SysDateTransform} from '../../utils/global_store';

const {height} = Dimensions.get('window');
export default view(({navigation}) => {
  const unsubscribe = navigation.addListener('focus', () => {
    store.initialized();
  });
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    store.initialized();
    unsubscribe();
    return () => {
      store.cleanUp();
    };
  }, [navigation, store]);
  const renderItem = (items, index) => {
    var item = items.item;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('qrcode', {event: item})}
        style={{width: '100%', marginBottom: 10}}
        key={index}>
        <View
          style={{
            width: '100%',
            height: height * 0.2,
            backgroundColor: sys_colors.white,
            flexDirection: 'row',
          }}>
          <Image
            source={{uri: item.banner_image}}
            style={{height: '100%', width: '30%', marginRight: 10}}
            resizeMode="cover"
          />
          <View style={{flex: 1, padding: 5}}>
            <Text
              style={{
                ...sys_text_styles.header_medium_black,
                color: sys_colors.secondary,
                width: '100%',
                textAlign: 'center',
                marginBottom: 5,
              }}>
              {item.booking_qty +
                ' Tickets for ' +
                SysDateTransform({date: item.booking_date})}
            </Text>
            <Text style={sys_text_styles.header_medium_black}>{item.name}</Text>
            <Text
              style={{...sys_text_styles.content_medium_black, marginTop: 5}}>
              {item.address}
            </Text>
            <Text
              style={{...sys_text_styles.content_medium_black, marginTop: 5}}>
              {item.time_event + ' ' + item.time_code}
            </Text>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Text
                style={{
                  ...sys_text_styles.header_black,
                  color: sys_colors.secondary,
                  marginTop: 5,
                }}>
                {SysCurrencyTransform({num: parseInt(item.booking_price)})}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={sys_styles.scaffold}>
      <GlobalHeader title="history" type="secondary" />
      {store.state.loading ? (
        <LoadingIndicator />
      ) : store.state.booking_list.length <= 0 ? null : (
        <FlatList
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          data={store.state.booking_list}
          style={styles.containerFlatlist}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
});
const styles = StyleSheet.create({
  containerFlatlist: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
});
