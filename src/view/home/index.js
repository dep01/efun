import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {view} from 'react-easy-state';
import {sys_colors, sys_styles, sys_text_styles} from '../../utils/constants';
import {GlobalHeader, LoadingIndicator} from '../../components';
import * as store from './store';
import {SysCurrencyTransform, SysDateTransform} from '../../utils/global_store';

const {height} = Dimensions.get('window');
export default view(({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    store.initialized();
    return () => {
      store.cleanUp();
    };
  }, [navigation, store]);
  return (
    <View style={sys_styles.scaffold}>
      <GlobalHeader title="event" />
      {store.state.loading ? (
        <LoadingIndicator />
      ) : (
        <ScrollView style={[sys_styles.container_scrollview, {paddingTop: 20}]}>
          {store.state.list_event.map((item) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('detailEvent', {event: item})
                }
                key={item.id}
                style={styles.containerButton}>
                <Text style={styles.textDate}>{item.date.toUpperCase()}</Text>
                <View style={styles.containerImage}>
                  <Image
                    source={{uri: item.banner_image}}
                    style={styles.images}
                    resizeMode="cover"
                  />
                  <View style={{flex: 1, padding: 10}}>
                    <Text
                      numberOfLines={2}
                      style={sys_text_styles.header_medium_black}>
                      {item.name}
                    </Text>
                    <Text
                      style={[
                        sys_text_styles.header_medium_black,
                        {color: sys_colors.secondary},
                      ]}>
                      {SysDateTransform({date: item.start_date}) +
                        ' - ' +
                        SysDateTransform({date: item.end_date})}
                    </Text>
                    <View style={styles.containerPrice}>
                      <Text style={sys_text_styles.header_medium_black}>
                        Tiket Tersedia Sekarang
                      </Text>
                      <Text
                        style={[
                          sys_text_styles.header_black,
                          {color: sys_colors.secondary},
                        ]}>
                        {SysCurrencyTransform({num: parseInt(item.price)})}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
});
const styles = StyleSheet.create({
  containerButton: {width: '100%', height: height * 0.5},
  containerPrice: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerImage: {
    backgroundColor: sys_colors.white,
    borderRadius: 10,
    height: '80%',
    width: '100%',
  },
  textDate: {
    ...sys_text_styles.header_black,
    color: sys_colors.secondary,
    marginBottom: 10,
  },
  images: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
