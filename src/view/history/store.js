import {store} from 'react-easy-state';
import {GetHistory} from '../../provider';
import {global_state} from '../../utils/global_store';

export const state = store({
  content_text: '',
  loading: false,
  booking_list: [],
});
export async function initialized() {
  state.loading = true;
  try {
    const response = await GetHistory();
    if (response) {
      state.booking_list = response.event;
      console.log(state.booking_list);
    }
  } catch (error) {}
  state.loading = false;
}
export function cleanUp() {
  state.content_text = '';
  state.loading = false;
  state.booking_list = [];
}
export const print = () => {
  console.log(state.testString);
};
