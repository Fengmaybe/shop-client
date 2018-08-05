/*
过滤器模块
 */

import moment from 'moment';
import Vue from 'vue';
Vue.filter('data-str',(value,format='YYYY-MM-DD HH-mm-ss')=>{
  return moment(value).format(format)
});
