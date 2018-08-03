//使用mockjs提供模拟数据接口

import Mock from 'mockjs';
import MockData from './data';

//点餐商品接口
Mock.mock('/goods',{code:0, data:MockData.goods});

//评价接口
Mock.mock('/ratings',{code:0, data:MockData.ratings});

//商家信息接口
Mock.mock('/info',{code:0, data:MockData.info});

//此模块不需要暴露


