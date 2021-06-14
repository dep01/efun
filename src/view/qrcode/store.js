import {store} from 'react-easy-state';
import {global_state} from '../../utils/global_store';

export const state = store({
  content_text: '',
  event: {},
});
export async function initialized() {}
export function cleanUp() {
  state.content_text = '';
  state.event = {};
}
export const print = () => {
  console.log(state.testString);
};
