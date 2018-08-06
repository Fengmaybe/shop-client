<template>
  <div id="app">

    <router-view />
    <FooterGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
  import FooterGuide from './components/FooterGuide/FooterGuide';
  import {reqFoodTypes} from './api';
  import {mapActions} from 'vuex';
export default {
   mounted () {
    //1.异步获取ajax数据到vuex管理的address(在这获取是最快的)
     this.getAddress();

     //去实现初始化的自动登录的效果
     this.$store.dispatch('getUser');
  },
  methods: {
    ...mapActions(['getAddress'])
  },
  components: {
    FooterGuide,
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
