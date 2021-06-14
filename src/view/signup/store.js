import {store} from 'react-easy-state';
import {SignUp} from '../../provider';
import AsyncStorage from '@react-native-community/async-storage';
import {global_state} from '../../utils/global_store';
export const state = store({
  loading: false,
  secureText: true,
  password: '',
  confirm_password: '',
  email: '',
  phone: '',
  gender: 'M',
  first_name: '',
  last_name: '',
  listGender: [
    {label: 'MALE', value: 'M', selected: true},
    {label: 'FEMALE', value: 'F'},
  ],
});
export async function initialized() {}
export function cleanUp() {
  state.loading = false;
  state.secureText = true;
  state.password = '';
  state.confirm_password = '';
  state.email = '';
  state.phone = '';
  state.gender = 'M';
  state.last_name = '';
  state.first_name = '';
}
export function handleChangeEmail(val = '') {
  state.email = val;
}
export function handleChangePassword(val = '') {
  state.password = val;
}
export function handleChangeConfirmPassword(val = '') {
  state.confirm_password = val;
}
export function handleChangeFirstName(val = '') {
  state.first_name = val;
}
export function handleChangeLastName(val = '') {
  state.last_name = val;
}
export function handleChangePhone(val = '') {
  state.phone = val;
}
export function handleChangeGender(val = 'M') {
  state.gender = val;
}
export async function doSignUp({navigation}) {
  state.loading = true;
  try {
    const body = {
      email: state.email,
      password: state.password,
      phone: state.phone,
      gender: state.gender,
      last_name: state.last_name,
      first_name: state.first_name,
    };
    const response = await SignUp(body);
    if (response) {
      await AsyncStorage.setItem('access_token', response.access_token);
      global_state.users.first_name = response.first_name;
      global_state.users.last_name = response.last_name;
      global_state.users.email = response.email;
      global_state.users.phone = response.phone;
      navigation.replace('homepage');
    }
  } catch (error) {}
  state.loading = true;
}
