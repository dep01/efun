import {sys_post, sys_get} from '../../utils/api_client';
import {global_state} from '../../utils/global_store';

const url = 'event';
export async function GetAllEvent() {
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
export async function RegistEvent(body = {}) {
  try {
    var response = await sys_post({auth: true, body: body, endpoint: url});
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
