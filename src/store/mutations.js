//mutation-types所对应里面有几个回调函数
import {
  RECEIVE_ADDRESS,
  RECEIVE_FOODTYPES,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO
} from './mutation-types';

export default {
  [RECEIVE_ADDRESS] (state,{address}) {
    state.address = address;
  },
  [RECEIVE_FOODTYPES] (state,{foodTypes}) {
    state.foodTypes = foodTypes;
  },
  [RECEIVE_SHOPS] (state,{shops}) {
    state.shops = shops;
  },
  [RECEIVE_USER] (state,{user}) {
    state.user = user;
  },
  [RESET_USER] (state) {
    state.user = {};
  },
  [RECEIVE_GOODS] (state,{goods}) {
    state.goods = goods;
  },
  [RECEIVE_RATINGS] (state,{ratings}) {
    state.ratings =ratings;
  },
  [RECEIVE_INFO] (state,{info}) {
    state.info = info;
  },
}
