//管理的状态
export default {
  //http://cangdu.org:8001/msite?geohash=28.42628,118.17648苍都
  longitude: 118.17648, // 经度
  latitude: 28.42628, // 纬度
  address: {},    // 地址信息对象-->headTop
  foodTypes: [], // 分类数组-->轮播的分组
  shops: [],    //商家数组-->商家分组信息
  user:{},  //用户信息（id   phone/name）

  goods:[],  //商家详情--点餐
  ratings:[],  //商家详情--评价
  info:{},  //商家详情--信息
}
