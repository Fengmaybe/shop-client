//mutation-types所对应里面有几个回调函数
import Vue from 'vue';
import {
  RECEIVE_ADDRESS,
  RECEIVE_FOODTYPES,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  INCREMENTCOUNT,
  DECREMENTCOUNT
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
  [INCREMENTCOUNT] (state,{food}) {
    if(!food.count){

      //count=1;  //初始化
      // 问题: 新添加的属性没有数据劫持==>数据绑定==>更新了数据但界面不变
      //对象，属性名，属性值  在food新增属性上本无数据绑定，可通过set来设置
      Vue.set(food,'count',1)
    }else{
      food.count++;
    }
  },
  [DECREMENTCOUNT] (state,{food}) {
    if(food.count){ //只有有值才去减少
      food.count--;
    }
  },
}
