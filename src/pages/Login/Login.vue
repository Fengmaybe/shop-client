<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">港汇外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:loginWay}" @click="handleMegPwdTab">短信登录</a>
          <a href="javascript:;" :class="{on:!loginWay}" @click="handleMegPwdTab">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <!--根据form表单去提交信息，学会这种使用手段。对form表单的提交按钮事件。对验证码的button去取消默认行为。-->
        <form><!--@submite.prevent="loginFrontEnd"-->
          <div :class="{on:loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone" @keyup.enter="loginFrontEnd" autocomplete="off">
              <!--computeTime>0这里如果直接用computeTime number类型是不会转为Boolean类型的-->
              <button :disabled="computeTime>0" class="get_verification"
              :class="{right_phone:is_right_phone,sending:computeTime>0}"
              @click.prevent="sendCode">{{computeTime>0 ? `已发送(${computeTime}s)` : '获取验证码'}}</button>
            <!--用form要阻止默认行为-->
            </section>
            <section class="login_verification">
              <input type="text" maxlength="8" placeholder="验证码" v-model="code" @keyup.enter="loginFrontEnd" autocomplete="off">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!loginWay}">
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name" @keyup.enter="loginFrontEnd" autocomplete="email">
              </section>
              <section class="login_verification">
                <input :type="isShowPwd ? 'text':'password'" maxlength="8" placeholder="密码" v-model="pwd" @keyup.enter="loginFrontEnd" autocomplete="off">
                <div class="switch_button " :class="isShowPwd ? 'on':'off'" @click="isShowPwd=!isShowPwd">
                  <div class="switch_circle" :class="{right:isShowPwd}"></div>
                  <span class="switch_text">{{isShowPwd ? 'abc' : ''}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha" @keyup.enter="loginFrontEnd" autocomplete="off">
                <img ref="captcha" class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="ReloadCodeImg"/>
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="loginFrontEnd">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <!--在父组件中绑定事件监听，监听到了之后，就会触发子组件的函数closeTip-->
    <AlertTip v-if="isShowAlert" @closeTip="closeTip" :alertText="alertText"/>
  </section>
</template>

<script>
  import {reqMessageCode,reqPhoneCode,reqLogin} from '../../api';
  import AlertTip from '../../components/AlertTip/AlertTip';
  import { Toast , MessageBox} from 'mint-ui';

  export default {
    data () {
      return {
        loginWay:true,   //登录方式，true表示短信登录

        /*手机验证码登录方式*/
        phone:'',  //input框中的phone值（名字与API接口一致）
        code:'',  //验证码（手机登录的验证码）
        computeTime:0, //倒计时的时间

        /*邮箱/用户名/手机登录方式*/
        name:'',  //用户名邮箱登录的名称
        pwd:'',  //代表密码，名字与API接口一致
        isShowPwd:false ,  //默认是不显示密码
        captcha: '', // 图片验证码

        isShowAlert:false,  //默认是不显示alert提示框
        alertText:'',  //提示框的内容
      }
    },
    computed:{
      is_right_phone () {
        return /^1\d{10}$/.test(this.phone); //如果正确格式手机号，那么就换样式。
      },

    },
    components:{
      AlertTip
    },
    methods: {
      //处理点击tab切换逻辑函数
      handleMegPwdTab () {
        //改登录方式
        this.loginWay = !this.loginWay;
        //验证码图片重新请求
        this.ReloadCodeImg()
      },
      //发送验证码的界面效果和后台交互效果
      async sendCode () {
        if(this.is_right_phone){
          //手机号是正确的
          //1.设置倒计时总时间
           this.computeTime = 10;
          //2.定时器减少时间
          let Timers = setInterval(()=>{
            this.computeTime--;
            //到0，清除
            if(this.computeTime<=0){
              this.computeTime = 0;
              clearInterval(Timers);
            }
          },1000);

          //发送ajax请求
          const result = await reqMessageCode(this.phone);
          if(result.code === 0){
            //success
            Toast({
              message: '发送成功',
              position: 'bottom',
              duration: 5000,
              iconClass: 'icon icon-success'
            });
          }else if(result.code === 1){
            //fail
            this.computeTime = 0;
            MessageBox('失败', result.msg);
          }
        }
      },
      //更新验证码图片
      ReloadCodeImg () {
        //防止浏览器的将其看做一个地址，使用缓存加载
        /*组件对象上的都有$refs  别忘记了！！*/
        /*这是普通的请求，不是ajax请求，只有ajax请求才存在跨域问题*/
        this.$refs.captcha.src = 'http://localhost:4000/captcha?time='+Date.now();
        //event.target.src = 'http://localhost:4000/captcha?time='+Date.now();
      },
      //专门更新显示提示框的函数
      UpdateAlertText (alertText) {
        this.isShowAlert = true; //显示提示框
        this.alertText = alertText;
      },

      //1.前台表单验证
      async loginFrontEnd () {
        let result;
        //分类两种登录方式(手机短信/用户名邮箱)
        if(this.loginWay){ //手机短信登录方式
          if(!this.is_right_phone){
            //不是正确的手机号
            this.UpdateAlertText('手机号不合法！');
            return;
          }else if (!/^\d{6}$/.test(this.code)){
            //不是正确的6位验证码
            this.UpdateAlertText('验证码不合法！');
            return;
          }

          //2. 发送相应的ajax请求
          result = await reqPhoneCode(this.phone,this.code);

        }else{ //用户名/邮箱登录方式
          if(!this.name){
            //无此name
            this.UpdateAlertText('用户名/邮箱/手机号不能为空');
            return;
          }else if (!this.pwd){
            //无此pwd
            this.UpdateAlertText('密码不能为空！');
            return;
          }else if(!this.captcha){
            //无此图片验证码
            this.UpdateAlertText('验证码不能为空！');
            return;
          }

          //2. 发送相应的ajax请求
          result = await reqLogin(this.name,this.pwd,this.captcha)
        }

        //3. 根据不同的响应处理（保存状态，跳转路由）
        if(result.code === 0){
          //success
          //保存状态
          const user = result.data;
          this.$store.dispatch('saveUser',user);
          //跳转路由
          this.$router.replace('/profile');

        }else {
          //fail
          this.UpdateAlertText(result.msg);
          !this.loginWay && this.ReloadCodeImg();
          //当两者都失败 清除验证码
          this.captcha = '';
          this.code = '';
          return;
        }


      },
      // 关闭提示框
      closeTip () {
        this.isShowAlert = false;
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone
                  color black
                  font-weight bold
                &.sending
                  color lightgrey
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(28px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
