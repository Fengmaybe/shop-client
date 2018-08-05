<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
      <span class="header_search" slot="left">
         <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right">
         <span class="header_login_text">登录|注册</span>
      </span>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="foodTypes.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(foodTypes,index) in foodTypesArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(foodType,index) in foodTypes" :key="index">
              <div class="food_container">
                <img :src="imgBaseUrl + foodType.image_url">
              </div>
              <span>{{foodType.title}}</span>
            </a>

          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="backSVG" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList />
    </div>
  </section>
</template>

<script>

  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';
  import {mapState} from 'vuex';

  //引入头部slot组件
  import HeaderTop from '../../components/HeaderTop/HeaderTop';
  //引入商品列表组件
  import ShopList from '../../components/ShopList/ShopList';

  export default {
    data () {
      return {
        imgBaseUrl: 'https://fuss10.elemecdn.com'
      }
    },
    mounted () {
      //1.后台ajax获取数据保存到vuex中（不用map映射）
      this.$store.dispatch('getFoodTypes');
      this.$store.dispatch('getShops');
    },
    watch: {
    //当我state中的foodTypes更新之后，我要处理一些逻辑，显示界面
      foodTypes () {
        //走到这里：说明数据已经更新了-->异步更新界面-->需求：在更新界面之后再去创建实现轮播的效果
        this.$nextTick(()=>{  //一旦界面更新好了（前提有数据更新），就触发回调函数
          //走到这里：数据已经更新好了，界面已经更新好了。
          //创建swiper实例对象，来实现轮播（js方式）
          new Swiper ('.swiper-container', {
            //是否循环轮播
            loop: true,
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
          })
        });
      }

    },
    components: {
      HeaderTop,
      ShopList
    },
    computed: {
      //2.在组件中去读取状态
      ...mapState(['address','foodTypes']),
      //3.在模板中显示

      //轮播的二维数组的逻辑（计算属性）
      /*
      根据其状态下this.foodTypes的数组转换一个二维数组--计算属性
      由this.foodTypes得出一个新的状态的值显示在模板页面中
      */
      foodTypesArr () {
        const foodTypes = this.foodTypes;
        //外面的大数组
        const arr = [];
        //里面的小数组
        let minArr = [];
        foodTypes.forEach(e => {
          //如果小数组满了，就生成新的小数组(先做，因为在插入小数组之前要确保小数组正常)
          if(minArr.length === 8){
            minArr = []
          }
          //如果小数组length为0，我就插入这个小数组到大数组。（为啥不在小数组满的时候插入呢，因为可能不会满）
          if(minArr.length ===0){
            arr.push(minArr);
          }
          minArr.push(e);
        });
        return arr;
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px

</style>
