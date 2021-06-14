import {sys_post, sys_get} from '../../utils/api_client';
import {global_state} from '../../utils/global_store';

const url = 'profile';
export async function GetProfile() {
  try {
    var response = await sys_get({auth: true, endpoint: url});
    var res = await response.json();
    if (res.status == true) {
      console.log('kesini');
      global_state.users.email = res.data.profile.email;
      global_state.users.first_name = res.data.profile.first_name;
      global_state.users.last_name = res.data.profile.last_name;
      global_state.users.phone = res.data.profile.phone;
    } else {
      //   global_state.toast?.current.show(res.message);
    }
  } catch (error) {
    global_state.toast?.current.show(error.message);
  }
}
