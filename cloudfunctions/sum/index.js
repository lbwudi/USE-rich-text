// index.js 是入口文件，云函数被调用时会执行该文件导出的 main 方法
// event 包含了调用端（小程序端）调用该函数时传过来的参数，同时还包含了可以通过 getWXContext 方法获取的用户登录态 `openId` 和小程序 `appId` 信息
const cloud = require('wx-server-sdk')
// 云函数入口函数
cloud.init()
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log("hello" +event.a + event.b)
  const sum = "hello" + event.a + event.b
  return {
    sum,
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}