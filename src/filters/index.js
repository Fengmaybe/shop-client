/*
过滤器模块
 */

// import moment from 'moment';
//优化
 import format from 'date-fns/format'
import Vue from 'vue';
Vue.filter('data-str',(value,formatStr='YYYY-MM-DD HH-mm-ss')=>{
  //return moment(value).format(format)
  return format(value,formatStr);
});
