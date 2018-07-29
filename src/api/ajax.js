/*
封装ajax请求函数的模块
在外面包裹着一层promise 用它去直接返回response.data数据的promise对象
 */
import axios from 'axios';
export default ajax = (url='',data={},type='GET') => {
  //外面包裹一层promise，也就是函数最终返回还是一个promise
  return new Promise((resolve, reject) => {
    //执行之前的代码
    let promise;
    if(type === 'GET'){
      //准备将data数据拼串成带query的URL地址
      let dataStr = '';
      Object.keys(data).forEach(key => {
        dataStr += key + '=' +data[key] + '&'
      })
      if(dataStr !== ''){
        //有query的参数,则将最后的一个&干掉
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'));
        url = url + '?' +dataStr;
      }
      //得到URL 发送get请求
      promise = axios.get(url);
    } else {
      //直接发送POST请求
      promise = axios.post(url,data);
    }

    //执行完之前的代码后，对小写promise进行处理
    //拿到response，成功回调后返回response.data
    promise.then(response => {
      //success
      resolve(response.data)
    }).catch(err => {
      //fail
      reject(err);
    })
  })
}
