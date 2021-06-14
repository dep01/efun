import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {view} from 'react-easy-state';
import {
  sys_colors,
  sys_icons,
  sys_styles,
  sys_text_styles,
} from '../../utils/constants';
import * as store from './store';
import {global_state} from '../../utils/global_store';
import {Paragraph, CustomButton, SpaceText} from '../../components';

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
      <View style={[sys_styles.container, {backgroundColor: sys_colors.white}]}>
        <View
          style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
          <Image
            source={sys_icons.ic_user}
            style={{width: 100, height: 100}}
            resizeMode="contain"
          />
          <Text style={sys_text_styles.header_black}>
            Hai,{' '}
            {global_state.users.first_name + ' ' + global_state.users.last_name}
          </Text>
        </View>
        <Paragraph
          style={{marginTop: 20, marginBottom: 10}}
          titleStyle={sys_text_styles.header_black}
          contentStyle={styles.containerContent}
          title="Phone"
          content={global_state.users.phone}
        />
        <Paragraph
          style={{marginBottom: 10}}
          titleStyle={sys_text_styles.header_black}
          contentStyle={styles.containerContent}
          title="Email"
          content={global_state.users.email}
        />
        <CustomButton
          type="secondary"
          title="logout"
          onPress={() => store.doLogOut({navigation})}
        />
      </View>
    </View>
  );
});
const styles = StyleSheet.create({
  containerContent: {
    ...sys_text_styles.header_black,
    borderBottomWidth: 0.7,
    marginLeft: 8,
    borderLeftWidth: 0.7,
    borderColor: sys_colors.icon.unactive,
    padding: 10,
  },
  text: {
    color: sys_colors.text.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
