import {store} from 'react-easy-state';
import {Alert} from 'react-native';
import {SignIn} from '../../provider';
import {global_state} from '../../utils/global_store';
import AsyncStorage from '@react-native-community/async-storage';
export const state = store({
  loading: false,
  secureText: true,
  password: '',
  email: '',
});
export async function initialized() {}
export function cleanUp() {
  state.loading = false;
  state.secureText = true;
  state.password = '';
  state.email = '';
}
export function handleChangeEmail(val = '') {
  state.email = val;
}
export function handleChangePassword(val = '') {
  state.password = val;
}
export async function doLogin({navigation}) {
  state.loading = true;
  try {
    const body = {
      email: state.email,
      password: state.password,
    };
    const response = await SignIn(body);
    if (response) {
      await AsyncStorage.setItem('access_token', response.access_token);
      global_state.users.first_name = response.first_name;
      global_state.users.last_name = response.last_name;
      global_state.users.email = response.email;
      global_state.users.phone = response.phone;
      navigation.replace('homepage');
    }
  } catch (error) {
    global_state.toast?.current.show(error.message);
  }
  state.loading = false;
}
