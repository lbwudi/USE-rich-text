// pages/jj/jj.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    w:null
  },

  submit: function(e){
    //微信、百度等小程序参考代码，和 Jquery发送ajax请求是一样的
    console.log(e.detail.value)
    var that = this
    var province = e.detail.value.province
    var city = e.detail.value.city
    var district = e.detail.value.district
    console.log(province+""+city+""+district)

    wx.request({
      method: 'get',
      url: 'https://api.tianapi.com/txapi/ncovnearby/index?key= 54179c84d1d94034c92bd106a2b792c1&province='+province+'&city='+city+'&district='+district,
      success: function (res) {
        if (res.data.code == 200) {
          // that.setData({
            //content: res.data.newslist[0].content
          // })
          console.log(typeof(JSON.stringify(res.data.newslist)))
          
          wx.navigateTo({
            url: "../yqzs/yqzs?newslist=" + 
              JSON.stringify(res.data.newslist)
          })
        } else {
          wx.navigateTo({
            url: "../yqzs/yqzs?newslist=" +
              null
          })
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  }
})