//基于state的状态中任意属性计算出get的计算属性
export default {
    //获取评论的总数
  getTotalRateCount (state) {
    return state.ratings.length;
  },
    //获取好评的数量
  getHappyRateCount (state) {
    return state.ratings.reduce((pre,rating)=>{return pre+(rating.rateType?0:1)},0)
  },
  //购物车数量
  CartFoodCount (state) {
    return state.CartFoods.length;
  } ,
  //购物车总价格
  CartFoodPrice (state) {
    return state.CartFoods.reduce((pre,CartFood)=>{return pre+(CartFood.price*CartFood.count)},0)
  }
}
