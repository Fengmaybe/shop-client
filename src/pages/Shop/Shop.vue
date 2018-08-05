<template>
  <div>
    <ShopHeader />
    <div class="tab">
      <div class="tab-item">
        <!--link默认是push的，通过replace可解决，replace默认FALSE意思就是push-->
        <router-link to="/shop/goods" replace>点餐</router-link>
      </div>
      <div class="tab-item" >
        <router-link to="/shop/ratings" replace>评论</router-link>
      </div>
      <div class="tab-item" >
        <router-link to="/shop/info" replace>商家</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
  import ShopHeader from '../../components/ShopHeader/ShopHeader';
  export default {
    mounted () {
      this.$store.dispatch('getInfo');


    },
    components:{
      ShopHeader
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .tab
    height 40px
    line-height 40px
    position relative
    border none
    &:after
      content ''
      position absolute
      left 0
      bottom 4px
      width 100%
      height 1px
      background-color rgba(7, 17, 27, 0.1)
      transform scaleY(0.5)
    .tab-item
      float left
      width: 33.33333%
      text-align center
      font-size 14px
      bootom 4px !important
      color rgb(77, 85, 93)
      a
        display block
        &.router-link-active
          color #02a774
</style>
