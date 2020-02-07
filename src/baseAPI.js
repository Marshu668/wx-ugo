// console.log('okokok')
import wepy from 'wepy'
const baseURL = 'https://www.zhengzhicheng.cn/api/public/v1'
// 这里写的代码是再app.wpy里面执行也就是导入
// 弹框提示一个无图标的toast消息
// @str要提示的消息内容
wepy.baseToast = function(str = '获取数据失败!') {
  // 获取数据的信息提示弹框
  return wepy.showToast({
    title: str,
    // 弹框携带的图标
    icon: 'none',
    duration: 1500
  })
}
// 发起get请求的API，使用挂载的get方法，重新封装了函数
// @url请求的地址，为相对路径，必须以/开头
// @date请求的参数对象
wepy.get = function(url, data = {}) {
  return wepy.request({
    url: baseURL + url,
    method: 'get',
    data: data
  })
}
// 发起post请求的API，使用挂载的post方法，重新封装了函数
// @url请求的地址，为相对路径，必须以/开头
// @date请求的参数对象
wepy.post = function(url, data = {}) {
  return wepy.request({
    url: baseURL + url,
    method: 'post',
    data: data
  })
}
