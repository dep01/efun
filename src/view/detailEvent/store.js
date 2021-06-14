import {store} from 'react-easy-state';
import {global_state} from '../../utils/global_store';
import Moment from 'moment';
import {RegistEvent} from '../../provider/event';
export const state = store({
  loading: true,
  more: 3,
  show_picker: false,
  event: {
    address: '',
    banner_image: '',
    id: '',
    end_date: '',
    location: '',
    long_desc: '',
    name: '',
    price: '',
    short_desc: '',
    start_date: '',
    time_code: '',
    time_event: '',
  },
  get_ticket: false,
  qty: 1,
  date: '',
});
export async function initialized() {
  const date = new Date();
  state.date = Moment(date).format('yyyy-MM-DD');
}
export function changeDate(date, newValue) {
  var stringDate = Moment(newValue).format('yyyy-MM-DD');
  state.date = stringDate;
  state.show_picker = false;
}
export function cleanUp() {
  state.loading = false;
  state.get_ticket = false;
  state.more = 3;
  state.show_picker = false;
  state.qty = 1;
  state.date = '';
  state.event = {
    address: '',
    banner_image: '',
    id: '',
    end_date: '',
    location: '',
    long_desc: '',
    name: '',
    price: '',
    short_desc: '',
    start_date: '',
    time_code: '',
    time_event: '',
  };
}
export async function bookingEvent({navigation}) {
  global_state.setLoading(true);
  try {
    const body = {
      first_name: global_state.users.first_name,
      last_name: global_state.users.last_name,
      phone: global_state.users.phone,
      email: global_state.users.email,
      event_id: state.event.id,
      qty: state.qty,
      date: state.date,
    };
    const response = await RegistEvent(body);
    if (response) {
      global_state.toast?.current.show('Event has been booked');
      navigation.goBack();
    }
  } catch (error) {
    global_state.toast?.current.show(error.message);
  }
  global_state.setLoading(false);
}
