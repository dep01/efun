import {sys_get} from '../../utils/api_client';
import {global_state} from '../../utils/global_store';

const url = 'history';
export async function GetHistory() {
  try {
    var response = await sys_get({auth: true, endpoint: url});
    var res = await response.json();
    if (res.status == true) {
      return res.data;
    } else {
      global_state.toast?.current.show(res.message);
    }
  } catch (error) {
    global_state.toast?.current.show(error.message);
  }
}
