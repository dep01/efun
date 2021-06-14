import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {view} from 'react-easy-state';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {sys_colors, sys_icons, sys_styles} from '../../utils/constants';
import * as store from './store';
import {
  GlobalHeader,
  BackButton,
  CustomInput,
  CustomButton,
  CustomLabel,
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
      <GlobalHeader
        left={<BackButton />}
        title="please complete your data"
        type="secondary"
      />
      <ScrollView style={sys_styles.container_scrollview_no_navigation}>
        <CustomInput
          placeholder="Input your first name"
          value={store.state.first_name}
          onChangeText={(val) => store.handleChangeFirstName(val)}
          label="First name"
        />
        <CustomInput
          placeholder="Input your last name"
          value={store.state.last_name}
          onChangeText={(val) => store.handleChangeLastName(val)}
          label="Last name"
        />
        <CustomInput
          placeholder="Input your email"
          value={store.state.email}
          onChangeText={(val) => store.handleChangeEmail(val)}
          label="Email"
        />
        <CustomInput
          placeholder="Input your phone number"
          value={store.state.phone}
          keyboardType="numeric"
          onChangeText={(val) => store.handleChangePhone(val)}
          label="Phone"
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
            title="signup"
            type="secondary"
            onPress={() => store.doSignUp({navigation})}
          />
        </View>
      </ScrollView>
    </View>
  );
});
const styles = StyleSheet.create({
  containerButton: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  images: {
    height: 120,
    width: 120,
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 20,
  },
});
