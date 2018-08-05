<template>
  <div class="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{info.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{info.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <div> <Star :score="info.serviceScore" :size="36"/></div>
            <span class="score">{{info.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <div>
              <Star :score="info.foodScore" :size="36"/>
            </div>
            <span class="score">{{info.foodScore}}</span></div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{info.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>

      <div class="split"><Spilt /></div>

      <div><RatingFilter :selectRateType="selectRateType"
                         :onlyShowContent="onlyShowContent"
                         :setSelectRateType="setSelectRateType"
                         :toggleOnlyShowContent="toggleOnlyShowContent"
                          /></div>

      <div class="rating-wrapper">
        <ul>
          <li class="rating-item" v-for="(rating,index) in ratingsFilter" :key="index">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <div><Star :size="24" :score="rating.score"/></div>
                <span class="delivery">{{rating.score}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend">
                <span class="iconfont" :class="rating.rateType ? 'icon-thumb_down':'icon-thumb_up' "></span>
                <span class="item" v-for="(item,index) in rating.recommend" :key="index">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime | data-str}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import BScroll from 'better-scroll';

  import Star from '../../../components/Star/Star';
  import Spilt from '../../../components/Split/Split';
  import RatingFilter from '../../../components/RatingFilter/RatingFilter';
  export default {
    data () {
      return {
        selectRateType:2,  //2代表全部 0代表满意 1代表不满意
        onlyShowContent:false,  //是否仅仅展示内容部分
      }
    },
    mounted () {
      this.$store.dispatch('getRatings',()=>{
        this.$nextTick(()=>{
          //滚动--第一个参数是一个外部的固定可视区域
          new BScroll('.ratings',{
            click:true,
          })
        })
      });
    },
    computed:{
      ...mapState(['ratings','info']),
      ratingsFilter () {
        //此计算属性由ratings、selectRateType、onlyShowContent值确定-->过滤
        /*满足条件一
        selectRateType 0 1 2
        rating.rateType  0 1
        如果selectRateType===2 全部留下
        如果selectRateType===1/2===rating.rateType才留下
        selectRateType===2 || selectRateType===rating.rateType  才留下
        */
        /*且满足条件二
         onlyShowContent  TRUE FALSE
         rating.text.length>0
         如果onlyShowContent===false 全部流血
         如果onlyShowContent==true && rating.text.length>0 留下
         !onlyShowContent || rating.text.length>0  才留下
        */
        return this.ratings.filter(rating=>{
          return (this.selectRateType===2 || this.selectRateType===rating.rateType) && (!this.onlyShowContent || rating.text.length>0)
        })
      }
    },
    components: {
      Star,
      Spilt,
      RatingFilter
    },
    methods:{
      setSelectRateType (type) {
        this.selectRateType = type;
      },
      toggleOnlyShowContent () {
        this.onlyShowContent = !this.onlyShowContent
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"

  .ratings
    position: absolute
    top: 247px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .overview
      display: flex
      padding: 6px 0
      .overview-left
        flex: 0 0 137px
        padding: 6px 0
        width: 137px
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        text-align: center
        @media only screen and (max-width: 320px)
          flex: 0 0 120px
          width: 120px
        .score
          margin-bottom: 6px
          line-height: 28px
          font-size: 24px
          color: rgb(255, 153, 0)
        .title
          margin-bottom: 8px
          line-height: 12px
          font-size: 12px
          color: rgb(7, 17, 27)
        .rank
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
      .overview-right
        flex: 1
        padding: 6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding-left: 6px
        .score-wrapper
          margin-bottom: 8px
          font-size: 0
          .title
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(7, 17, 27)
          .star
            display: inline-block
            margin: 0 12px
            vertical-align: top
          .score
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(255, 153, 0)
        .delivery-wrapper
          font-size: 0
          .title
            line-height: 18px
            font-size: 12px
            color: rgb(7, 17, 27)
          .delivery
            margin-left: 12px
            font-size: 12px
            color: rgb(147, 153, 159)
    .rating-wrapper
      padding: 0 18px
      .rating-item
        display: flex
        padding: 18px 0
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        .avatar
          flex: 0 0 28px
          width: 28px
          margin-right: 12px
          img
            border-radius: 50%
        .content
          position: relative
          flex: 1
          .name
            margin-bottom: 4px
            line-height: 12px
            font-size: 10px
            color: rgb(7, 17, 27)
          .star-wrapper
            margin-bottom: 6px
            font-size: 0
            .star
              display: inline-block
              margin-right: 6px
              vertical-align: top
            .delivery
              display: inline-block
              vertical-align: top
              line-height: 12px
              font-size: 10px
              color: rgb(147, 153, 159)
          .text
            margin-bottom: 8px
            line-height: 18px
            color: rgb(7, 17, 27)
            font-size: 12px
          .recommend
            line-height: 16px
            font-size: 0
            .icon-thumb_up, .icon-thumb_down, .item
              display: inline-block
              margin: 0 8px 4px 0
              font-size: 9px
            .icon-thumb_up
              color: $yellow
            .icon-thumb_down
              color: rgb(147, 153, 159)

            .item
              padding: 0 6px
              border: 1px solid rgba(7, 17, 27, 0.1)
              border-radius: 1px
              color: rgb(147, 153, 159)
              background: #fff
          .time
            position: absolute
            top: 0
            right: 0
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
</style>

