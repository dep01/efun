import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import {view} from 'react-easy-state';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {sys_colors, sys_styles, sys_text_styles} from '../../utils/constants';
import * as store from './store';
import {
  GlobalHeader,
  BackButton,
  CustomButton,
  SpaceText,
} from '../../components';
import {SysCurrencyTransform, SysDateTransform} from '../../utils/global_store';

const {height} = Dimensions.get('window');
export default view(({navigation, route}) => {
  useEffect(() => {
    store.initialized();
    store.state.event = route.params.event;
    return () => {
      store.cleanUp();
    };
  }, [navigation, store]);
  return (
    <View style={sys_styles.scaffold}>
      <GlobalHeader
        title={store.state.event.name}
        type="secondary"
        left={<BackButton />}
      />
      <ScrollView
        style={[
          sys_styles.container_scrollview_no_navigation,
          {paddingHorizontal: 0, paddingVertical: 0, maxHeight: height * 0.8},
        ]}>
        <Image
          source={{uri: store.state.event.banner_image}}
          style={{width: '100%', height: height * 0.35}}
          resizeMode="cover"
        />
        <View
          style={{
            ...sys_styles.container,
            alignItems: 'flex-start',
            backgroundColor: sys_colors.white,
          }}>
          <Text numberOfLines={2} style={sys_text_styles.header_black}>
            {store.state.event.name}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              ...sys_text_styles.header_medium_black,
              color: sys_colors.secondary,
            }}>
            {'Event di ' + store.state.event.location}
          </Text>
          <Text
            numberOfLines={store.state.more}
            style={sys_text_styles.content_medium_black}>
            {store.state.event.long_desc}
          </Text>
          <CustomButton
            type="secondary"
            style={{height: 25, width: 50, textAlign: 'left', padding: 0}}
            textStyle={{color: sys_colors.icon.unactive}}
            title={store.state.more != null ? 'More' : 'Less'}
            onPress={() => {
              if (store.state.more != null) {
                store.state.more = null;
              } else {
                store.state.more = 3;
              }
            }}
          />
          <View style={{marginVertical: 10, width: '100%'}}>
            <View
              style={{width: '100%', flexDirection: 'row', marginVertical: 5}}>
              <Icon
                name="map-marker-alt"
                color={sys_colors.secondary}
                size={20}
                style={{marginRight: 10}}
              />
              <Text style={sys_text_styles.header_black}>Location</Text>
            </View>
            <Text style={sys_text_styles.content_medium_black}>
              {store.state.event.address}
            </Text>
          </View>
          <View style={{marginVertical: 10, width: '100%'}}>
            <View
              style={{width: '100%', flexDirection: 'row', marginVertical: 5}}>
              <Icon
                name="clock"
                color={sys_colors.secondary}
                size={20}
                style={{marginRight: 7}}
              />
              <Text style={sys_text_styles.header_black}>Date</Text>
            </View>
            <Text style={sys_text_styles.content_medium_black}>
              {SysDateTransform({date: store.state.event.start_date}) +
                ' - ' +
                SysDateTransform({date: store.state.event.end_date})}
            </Text>
            <Text style={sys_text_styles.content_medium_black}>
              {store.state.event.time_event + ' ' + store.state.event.time_code}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          bottom: 0,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          backgroundColor: sys_colors.white,
          borderColor: sys_colors.primary,
          borderWidth: 0.7,
        }}>
        {store.state.get_ticket ? (
          <View style={{width: '100%', alignItems: 'center', padding: 10}}>
            <TouchableOpacity
              onPress={() => {
                store.state.get_ticket = false;
              }}
              style={{
                width: '100%',
                alignItems: 'flex-end',
                margin: 5,
              }}>
              <Icon name="times" color={sys_colors.secondary} size={10} />
            </TouchableOpacity>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 10,
              }}>
              <Text style={sys_text_styles.content_medium_black}>Date</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  width: '30%',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    store.state.show_picker = true;
                  }}>
                  <Text style={sys_text_styles.content_medium_black}>
                    {SysDateTransform({date: store.state.date})}
                  </Text>
                </TouchableOpacity>
                {store.state.show_picker && (
                  <DateTimePicker
                    value={new Date(store.state.date)}
                    mode="default"
                    display="default"
                    onChange={(val, newValue) => {
                      store.changeDate(val, newValue);
                    }}
                  />
                )}
              </View>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={sys_text_styles.content_medium_black}>Qty</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '30%',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    if (store.state.qty > 1) {
                      store.state.qty = store.state.qty - 1;
                    }
                  }}
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 15,
                    backgroundColor: sys_colors.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={sys_text_styles.header_black}>-</Text>
                </TouchableOpacity>
                <Text style={sys_text_styles.header_black}>
                  {store.state.qty}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    store.state.qty = store.state.qty + 1;
                  }}
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 15,
                    backgroundColor: sys_colors.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={sys_text_styles.header_black}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <SpaceText
              left="Total"
              right={SysCurrencyTransform({
                num: parseInt(store.state.event.price) * store.state.qty,
              })}
              rightStyle={{textAlign: 'right'}}
            />
            <CustomButton
              title="Book"
              style={{width: '100%'}}
              onPress={() => store.bookingEvent({navigation})}
            />
          </View>
        ) : (
          <View style={{width: '100%', padding: 10}}>
            <CustomButton
              title="get ticket"
              style={{width: '100%'}}
              onPress={() => {
                store.state.get_ticket = true;
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
});
const styles = StyleSheet.create({});
