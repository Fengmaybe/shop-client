<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul ref="leftUl">
          <li class="menu-item" v-for="(item,index) in goods" :key="index" :class="{current:index===currentIndex}"
              @click="redirectGood(index)">
            <span class="text bottom-border-1px">
              <img v-if="item.icon"
                   class="icon" :src="item.icon">
              {{item.name}}</span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="RightUl">
          <li class="food-list food-list-hook" v-for="item in goods">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food,index) in item.foods"
                  :key="index" @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food" />
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart />
    </div>
    <Food :food="food" ref="sonFood"/>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import BScroll from 'better-scroll';
  import bounce from 'better-scroll';


  import CartControl from '../../../components/CartControl/CartControl';
  import Food from '../../../components/Food/Food';
  import ShopCart from '../../../components/ShopCart/ShopCart';

  export default {
    data() {
      return {
        scrollY: 0, //右侧列表滑动的top值，以正值去计算。
        tops: [],  // 右侧列表的top（每个li分类的开始）的tops数组
        food:{},   //指定点击的那个food信息
        isNeedScroll:true,  //左边的列表是否需要滚动
      }
    },
    mounted() {
      this.$store.dispatch('getGoods', () => {

        this.$nextTick(() => {

          //初始化的时候计算出tops数组，更新tops的值
          this._initTops();

          //初始化滚动的一些逻辑，更新scrollY的值
          this._initScroll();

        });
      });
    },
    components:{
      CartControl,
      Food,
      ShopCart
    },
    computed: {
      ...mapState(['goods']),
      currentIndex() {
        //计算属性啥时候触发？初始化和更新其依赖数据的任一数据时
        const {scrollY, tops} = this;
        //tops : [0,5,10,15]
        //scrollY : 12 锁定下标为2 -->显示左侧列表的下标为2
        const index = tops.findIndex((top, index) => scrollY >= top && scrollY < tops[index + 1]);
        //处理左侧列表同步右侧滚动的效果--这种做法有小bug
        //this._handleScrollLeftList(index);
        if(this.leftScroll && this.isNeedScroll){
          const LiHeight = this.$refs.leftUl.firstElementChild.clientHeight;
          if(index===7) {
            //列表向上移动一格
            this.leftScroll.scrollTo(0,-LiHeight,300)
          }else if(index === 8){
            //列表向上移动两位
            this.leftScroll.scrollTo(0,-LiHeight*2,300)
          }else{
            //一格都不要移动
            this.leftScroll.scrollTo(0,0)
          }

        }
        return index;
      }
    },
    methods: {
      //初始化计算tops[]
      _initTops() {
        let tops = [];
        let top = 0;
        tops.push(top);
        //找到右侧列表的每个li,计算出其高度，累加上去(第二次忘记了refs前面有$!!!!!!!)
        const lis = this.$refs.RightUl.getElementsByClassName('food-list-hook');
        //转为真数组,累加
        Array.prototype.slice.call(lis).forEach((li, index) => {
          //得到遍历的每个li的高度
          top += li.clientHeight;
          tops.push(top);
        });
        //更新状态tops
        this.tops = tops;
      },

      //初始化滚动的逻辑，更新scrollY的值
      _initScroll() {
        //走到这里说明界面已经更新完成了

        //左侧列表
        this.leftScroll = new BScroll('.menu-wrapper', {
          click: true,  //使用bscroll库来派发click事件
        });

        //右侧列表
        this.rightScroll = new BScroll('.foods-wrapper', {
          click: true,  //使用bscroll库来派发click事件
          probeType: 2 //非实时。betterscroll默认禁用了所有原生事件，故要从库里自动派发事件。
          // 手指触摸才猝发，且一定距离，且不监听惯性滑动。
        });

        //绑定scroll事件监听，动态修改scrollY的值
        this.rightScroll.on('scroll', ({x, y}) => {
          //console.log('scroll', x, y);
          this.isNeedScroll=true;
          this.scrollY = Math.abs(y);  //保存的值是正值


       /*   //当右边列表自动滑动时，左边列表跟着滑动
          //求左边的li高度
          console.log('a');
          const leftLiHeight = this.$refs.leftUl.firstElementChild.clientHeight;
          console.log(leftLiHeight);
          this.leftScroll.scrollTo(0, - this.currentIndex*leftLiHeight, 200, bounce)*/

        })

          //绑定scrollEnd事件监听，动态修改scrollY的值
          this.rightScroll.on('scrollEnd', ({x, y}) => {
            //console.log('scroll', x, y);
            this.scrollY = Math.abs(y);  //保存的值是正值
          })
        // this.leftScroll.on('scroll',()=>{
        //
        // })
      },

      //左侧滑动
      /*_handleScrollLeftList (index) {
        if(this.leftScroll){
          //要滚动的那个li位置（那个方法是可行的，居然可在可视区域上显示，很棒啊！之前用scrollTo）
          const li = this.$refs.leftUl.children[index];
          //用滚动对象调用scrollToElement(el, time, offsetX, offsetY, easing)方法
          this.leftScroll.scrollToElement(li,300,false,false,bounce);
        }
      },*/

      //事件函数
      redirectGood (index) {

        //1.接受用户点击哪个左侧的下标，对应去滑动到指定位置且2.改变scrollY的值以确保可以直接显示更新
        //scrollY的值就是top值
        this.isNeedScroll=false;
        const top = this.tops[index];  //top为正
        //立即更新scrollY 以确保立即变白
        this.scrollY = top;
        this.rightScroll.scrollTo(0, -top, 300, bounce);

      },

      //显示当前用户点击的food的详情
      showFood (food) {
        //更新状态food
        this.food = food;
        //显示food(父组件要用子组件的方法-->得到标签对象)
        this.$refs.sonFood.toggleIsShowFood();
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/mixins.styl"

  .goods
    display: flex
    position: absolute
    top: 250px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 4px
</style>

