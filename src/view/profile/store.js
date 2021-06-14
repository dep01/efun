import {store} from 'react-easy-state';
import AsyncStorage from '@react-native-community/async-storage';
export const state = store({
  content_text: '',
});
export async function initialized() {}
export function cleanUp() {
  state.content_text = '';
}
export const print = () => {
  console.log(state.testString);
};
export async function doLogOut({navigation}) {
  await AsyncStorage.clear();
  navigation.popToTop();
  navigation.replace('splash');
}
