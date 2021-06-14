import {sys_post} from '../../utils/api_client';
import {global_state} from '../../utils/global_store';

const url = 'auth/signup';
export async function SignUp(body = {}) {
  try {
    var response = await sys_post({auth: false, body: body, endpoint: url});
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
