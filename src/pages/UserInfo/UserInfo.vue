<template>
  <div>
    <mt-header title="我的资料">
      <router-link to="/profile" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <mt-swipe :show-indicators="false">
      <mt-swipe-item>
        <img src="./images/12.png" alt="12" class="UserInfoImg">
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="./images/15.png" alt="12" class="UserInfoImg">
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="./images/18.png" alt="12" class="UserInfoImg">
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="./images/4.png" alt="12" class="UserInfoImg">
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="./images/6.png" alt="12" class="UserInfoImg">
      </mt-swipe-item>
    </mt-swipe>
    <p class="center">用户名： {{user.name || user.phone}}</p>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    data() {
      return {
        rangeValue: 0,
      }
    },
    methods: {
      backProfile() {
        this.$router.back();
      }
    },
    computed:{
      ...mapState(['user'])
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .mint-header
    background-color rgb(2, 167, 116)
    height 50px
    font-size 18px
    &.mint-header-title
      line-height 18px
  .UserInfoImg
    width 180px
    height 180px
    position absolute
    left 0
    right 0
    margin auto
  .mint-swipe
    width 100%
    height 200px
    position relative
    margin-top 10px
  .center
    font-size 22px
    color darkslategray
    font-weight bold
    text-align center
</style>
