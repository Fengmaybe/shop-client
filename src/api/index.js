/*
定义多个接口请求函数--与后台交互的接口
 */
import ajax from './ajax';

const BASE_URL = '/api';

// 1、根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`);
// 2、获取食品分类列表
export const reqFoodTypes = () => ajax(BASE_URL + '/index_category');
// 3、根据经纬度获取商铺列表(经度，纬度)
export const reqShops = (longitude,latitude) => ajax(BASE_URL + '/shops',{longitude,latitude});
// 4、根据经纬度和关键字搜索商铺列表
export const reqShopsOfKeys = (geohash,keyword) => ajax(BASE_URL + '/search_shops',{geohash,keyword});
// 5、获取一次性验证码
export const reqCaptchas = () => ajax(BASE_URL + '/captcha');
// 6、用户名密码登陆
export const reqLogin = (name,pwd,captcha) => ajax(BASE_URL + '/login_pwd',{name,pwd,captcha},'POST');
// 7、发送短信验证码
export const reqMessageCode = (phone) => ajax(BASE_URL + '/sendcode',{phone});
// 8、手机号验证码登陆
export const reqPhoneCode = (phone,code) => ajax(BASE_URL + '/login_sms',{phone,code},'POST');
// 9、根据会话获取用户信息
export const reqUsers = () => ajax(BASE_URL + '/userinfo');
// 10、用户登出
export const reqLayout = () => ajax(BASE_URL + '/logout');

//这里不需要去代理（使用API前缀） 一旦这时去请求goods，执行过一次的mockServer文件就会拦截，并生产模拟数据
//模拟接口：商品分类
export const reqGoods = () => ajax('/goods');
//模拟接口：评价
export const reqRatings = () => ajax('/ratings');
//模拟接口：商家信息
export const reqInfo = () => ajax('/info');

