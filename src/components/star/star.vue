<template>
  <!--:class的外面有括号不要忘记了-->
  <div  class="star" :class="`star-${size}`">
    <span class="star-item" v-for="(starClass,index) in starClassArr" :key="index" :class="starClass" ></span>
  </div>
</template>

<script>
  const CLASS_ON = 'on';
  const CLASS_HALF = 'half';
  const CLASS_OFF = 'off';
  export default {
    //多个组件需要使用这个组件，先去判断那些使用的组件传来什么值
    props:{
      score:Number,  //由分数决定星星
      size:Number    //由size来决定2X 3X
    },
    //我的span标签的星星数怎么决定是怎样的。可以根据本地的score来决定
    computed:{
      starClassArr () {
        //定义一个星星类名的数组
        const starClasses = [];

        //取整-就是满星的个数
        const scoreInteger = Math.floor(this.score);
        for (let i = 0; i < scoreInteger; i++) {
          starClasses.push(CLASS_ON);
        }
        //取小数，看是否需要（0/1）个半星
        if(this.score*10-scoreInteger*10>5){
          //需要半颗的星星
          starClasses.push(CLASS_HALF);
        }
        //取剩余的灰色星星个数
        while(starClasses.length < 5){
          starClasses.push(CLASS_OFF);
        }
        //计算属性返回一个包含三种类名的数组
        return starClasses;
      }
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/stars/star48_on')
        &.half
          bg-image('./images/stars/star48_half')
        &.off
          bg-image('./images/stars/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star36_on')
        &.half
          bg-image('./images/stars/star36_half')
        &.off
          bg-image('./images/stars/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star24_on')
        &.half
          bg-image('./images/stars/star24_half')
        &.off
          bg-image('./images/stars/star24_off')

</style>
