/*
路由器：管理配置路由
 */

import Vue from 'vue';
import VueRouter from 'vue-router';

import MSite from '../pages/MSite/MSite';
import Order from '../pages/Order/Order';
import Search from '../pages/Search/Search';
import Profile from '../pages/Profile/Profile';
import Login from '../pages/Login/Login';

//声明使用插件
Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/msite',
      component: MSite,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '',
      redirect: '/msite'
    }
  ]
});
