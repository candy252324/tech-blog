# 其它

## uni 有自己的请求方法

uni 自己的请求方法[uni.request](https://uniapp.dcloud.net.cn/api/request/request.html#request)。

开发的时候不知道，直接使用了之前封装的 `axios`, 浏览器上都正常，真机调试的时候接口调用报错。

解决方法：添加 `adapter` 配置。

>注：以下 adapter 配置不保证对所有版本的 axios 都有效，当时 axios 版本  0.19.0 。
```js
import adapter from './adapter'
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 30 * 1000,
  adapter,
})
```

```js
// adapter.js

import settle from 'axios/lib/core/settle'
import buildURL from 'axios/lib/helpers/buildURL'

export default function (config) {
  return new Promise((resolve, reject) => {
    uni.request({
      method: config.method.toUpperCase(),
      url: buildURL(config.url, config.params, config.paramsSerializer),
      header: config.headers,
      data: config.data,
      dataType: config.dataType,
      responseType: config.responseType,
      sslVerify: config.sslVerify,
      complete: function complete(response) {
        response = {
          data: response.data,
          status: response.statusCode,
          errMsg: response.errMsg,
          header: response.header,
          config,
        }
        settle(resolve, reject, response)
      },
    })
  })
}
```

## 图片上传api
  
uni 的图片上传 api [uni.uploadFile](https://uniapp.dcloud.net.cn/api/request/network-file.html#uploadfile)只支持 POST 请求，而后端返回的 oss 上传地址只支持 PUT 请求。

## 没找到合适的调试工具

 如果是微信小程序或 h5,可以用 `vconsole`，但是 uni 没找到合适的调试工具。

