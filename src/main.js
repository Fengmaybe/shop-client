
import Vue from 'vue'
import App from './App'
import router from './router';
import store from './store';

import {Button,Range,Header, Swipe, SwipeItem,Popup,Progress } from 'mint-ui'
import VueLazyload from 'vue-lazyload';


import './mock/mockServer'
import './filters'

import loading from './common/images/loading.gif';
Vue.use(VueLazyload, {
  loading
});

Vue.component(Button.name, Button);
Vue.component(Header.name, Header);
Vue.component(Range.name, Range);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Popup.name, Popup);
Vue.component(Progress.name, Progress);

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,  //注册路由器，多了三个标签和两个路由对象
  store,   //配置store对象，所有组件都可以有了$store
});
