//actions中有几个回调函数-->对应界面有几个操作

import {
  reqAddress,
  reqFoodTypes,
  reqShops,
  reqUsers,
  reqLayout,
  reqGoods,
  reqRatings,
  reqInfo,
  reqShopsOfKeys,
} from '../api';
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
  DECREMENTCOUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS
} from './mutation-types';

export default {
  //异步获取地址
  async getAddress({commit, state}) {
    //http://cangdu.org:8001/msite?geohash=28.42628,118.17648
    const geohash = state.latitude + ',' + state.longitude;
    const result = await reqAddress(geohash);
    if (result.code === 0) {
      //请求成功
      commit(RECEIVE_ADDRESS, {address: result.data});
    }
  },
  //异步获取分类的列表
  async getFoodTypes({commit}) {
    const result = await reqFoodTypes();
    if (result.code === 0) {
      //请求成功  result.data是一个array
      commit(RECEIVE_FOODTYPES, {foodTypes: result.data});
    }
  },
  //异步获取商家列表
  async getShops({commit, state}) {
    const {latitude, longitude} = state;
    const result = await reqShops(longitude, latitude);
    if (result.code === 0) {
      //请求成功
      commit(RECEIVE_SHOPS, {shops: result.data});
    }
  },
  //同步保存用户信息
  saveUser({commit}, user) {
    commit(RECEIVE_USER, {user});
  },
  //异步去请求用户信息
  async getUser({commit}) {
    const result = await reqUsers();
    if (result.code === 0) {
      commit(RECEIVE_USER, {user: result.data});
    }
  },
  //异步退出登录
  async getLayout ({commit}) {
    const result = await reqLayout();
    if (result.code === 0) {
      commit(RESET_USER);
    }
  },


  //异步获取商家商品分类
  async getGoods({commit},cb) {
    const result = await reqGoods();
    if (result.code === 0) {
      //请求成功
      commit(RECEIVE_GOODS, {goods: result.data});
    }
    //此时数据已经更新了，界面更新是异步的,等待界面更新
    cb && cb();
  },
  //异步获取评论
  async getRatings({commit},cb) {
    const result = await reqRatings();
    if (result.code === 0) {
      //请求成功
      commit(RECEIVE_RATINGS, {ratings: result.data});
      cb && cb();
    }
  },
  //异步获取商家信息
  async getInfo({commit},cb) {
    const result = await reqInfo();
    if (result.code === 0) {
      //请求成功
      commit(RECEIVE_INFO, {info: result.data});
      cb && cb();
    }
  },

  //同步增减food数量的函数
  updateFoodCount ({commit},{isAdd,food}) {
    if(isAdd){
      //增
      commit(INCREMENTCOUNT,{food})
    }else{
      //减
      commit(DECREMENTCOUNT,{food})
    }
  },

  //同步清空购物车
  clearCart ({commit}) {
    commit(CLEAR_CART)
  },

  //异步获取搜索商家列表
  async searchShops({commit, state},keyword) {
    // const geohash = state.latitude + ',' + state.longitude;
    /*?latitude=40.10038&longitude=116.36867*/
   // const geohash = '40.10038,116.36867';
    const geohash = '28.42628,118.17648';
    const result = await reqShopsOfKeys(geohash, keyword);
    if (result.code === 0) {
      //请求成功
      const  searchShops = result.data;
      commit(RECEIVE_SEARCH_SHOPS, {searchShops});
    }
  },
};
