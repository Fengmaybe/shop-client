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
import UserInfo from '../pages/UserInfo/UserInfo';
import Shop from '../pages/Shop/Shop';
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods';
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings';
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo';

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
      path: '/userInfo',
      component: UserInfo
    },
    {
      path: '/shop',
      component: Shop,
      children: [
        {
          path: '/shop/goods',
          component: ShopGoods
        },
        {
          path: 'ratings',
          component: ShopRatings
        },
        {
          path: 'info',
          component: ShopInfo
        },
        {
          path: '',
          redirect: '/shop/goods'
        }
      ]
    },
    {
      path: '',
      redirect: '/msite'
    }
  ]
});
