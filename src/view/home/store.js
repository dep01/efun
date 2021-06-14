import {store} from 'react-easy-state';
import {GetAllEvent, GetProfile} from '../../provider';
import {global_state} from '../../utils/global_store';

export const state = store({
  loading: false,
  list_event: [],
});
export async function initialized() {
  state.loading = true;
  try {
    await GetProfile();
    const response = await GetAllEvent();
    if (response) {
      state.list_event = response.event;
    }
  } catch (error) {
    global_state.toast?.current.show(error.message);
  }
  state.loading = false;
}
export function cleanUp() {
  state.loading = false;
  state.list_event = [];
}
