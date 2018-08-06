<template>
<div>
  <div class="shopcart">
    <div class="content">
      <div class="content-left" @click="toggleShow">
        <div class="logo-wrapper">
          <div class="logo" :class="{highlight:CartFoodCount}">
            <i class="iconfont icon-shopping_cart" :class="{highlight:CartFoodCount}"></i>
          </div>
          <div class="num">{{CartFoodCount}}</div>
        </div>
        <div class="price" :class="{highlight:CartFoodPrice}">￥{{CartFoodPrice}}</div>
        <div class="desc">另需配送费￥{{info.deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">
          {{payText}}
        </div>
      </div>
    </div>
    <transition name="move">
    <div class="shopcart-list" v-show="showList">
      <div class="list-header">
        <h1 class="title">购物车</h1>
        <span class="empty" @click="clearCart">清空</span>
      </div>
      <div class="list-content" ref="listWrapper">
        <ul>
          <li class="food" v-for="(CartFood,index) in CartFoods" :key="index">
            <span class="name">{{CartFood.name}}</span>
            <div class="price"><span>￥{{CartFood.price}}</span></div>
            <div class="cartcontrol-wrapper">
              <CartControl :food="CartFood"/>
            </div>
          </li>
        </ul>
      </div>
    </div>
    </transition>
  </div>
  <transition name="fade">
  <div class="list-mask" v-show="showList" @click="toggleShow"></div>
  </transition>
</div>
</template>

<script>
  /*
  购物车状态的设计：goods-foods-food去遍历其count的数量时比较效率低的
  直接state管理购物车的状态即可。当count从0变1 就添加购物车  当count从1变0 就从购物车删除
   */
  import BScroll from 'better-scroll';
  import { MessageBox } from 'mint-ui';
  import {mapState,mapGetters} from 'vuex';
  import CartControl from '../CartControl/CartControl';
  export default {
    data (){
      return {
        isShow:false,
      }
    },
    components:{
      CartControl,
    },
    computed:{
      ...mapState(['CartFoods','info']),
      ...mapGetters(['CartFoodCount','CartFoodPrice']),
      payText () {
        //由info.deliveryPrice  info.minPrice CartFoodPrice决定
        const {CartFoodPrice} = this;
        const {deliveryPrice,minPrice} = this.info;
        if(CartFoodPrice===0){
          return `￥${minPrice}元起送`;
        }else if(CartFoodPrice<minPrice){
          return `还差￥${minPrice-CartFoodPrice}元起送`;
        }else{
          return '去结算'
        }
      },
      payClass () {
        //由info.minPrice CartFoodPrice决定
        const {CartFoodPrice} = this;
        const {minPrice} = this.info;
        if(minPrice>CartFoodPrice){
          return 'not-enough'
        }else{
          return 'enough'
        }
      },
      showList () {
        if(this.CartFoodCount===0){
          this.isShow = false; //当数量减为0时，还要改变isShow为FALSE
          return false;  //如果总数量为0，直接隐藏
        }
        //当列表显示的时候，我创建滚动对象
        if(this.isShow){
          this.$nextTick(()=>{
            //界面更新完成
            //完成单例对象，解决click点击多次问题
            if(!this.scrollFood){
             this.scrollFood = new BScroll(this.$refs.listWrapper,{
                click:true,
              })
            }else{
              //当创建滚动对象时那一刻是没有形成滚动，那么之后增加就不会滚动，故要每次重新刷新
              this.scrollFood.refresh();
            }

          });

        }
        //否则，看isShow的状态
        return this.isShow
      }
    },
    methods:{
      toggleShow () {
        //要切换isShow只有当数量不为0
        if(this.CartFoodCount>0){
          this.isShow = !this.isShow;
        }
      },
      clearCart () {
        MessageBox.confirm('确定清空购物车么？').then(action => {
        this.$store.dispatch('clearCart');
        },()=>{});
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            &.highlight
              background: $green
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #ffffff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .shopcart-list
      position: absolute
      left: 0
      top: 0
      z-index: -1
      width: 100%
      transform translateY(-100%)
      &.move-enter-active,&.move-leave-active
        transition transform .3s
      &.move-enter,&.move-leave-to
        transform translateY(0)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)

      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px

  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    backdrop-filter: blur(10px)
    opacity: 1
    background: rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
    &.fade-enter, &.fade-leave-to
      opacity: 0
</style>
