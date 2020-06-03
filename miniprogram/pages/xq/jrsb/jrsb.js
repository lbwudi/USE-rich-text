// pages/jrsb/jrsb.js
const app = getApp()
Page({
  data: {
    word: '山西',
    url: null,
    newslist: [],
    // home: 'http://localhost:8080/wx_server/images/home.png',
    // next: 'http://localhost:8080/wx_server/images/next.png',
    // prev: 'http://localhost:8080/wx_server/images/prev.png'
       home: 'cloud://liubeibei-o5krp.6c69-liubeibei-o5krp-1302164922/o1XDd4tWZT8tMIYhCWTfYycG4Ek4/20206217325/image10.png',
    next: 'cloud://liubeibei-o5krp.6c69-liubeibei-o5krp-1302164922/o1XDd4tWZT8tMIYhCWTfYycG4Ek4/20206217506/image1.png',
    prev: 'cloud://liubeibei-o5krp.6c69-liubeibei-o5krp-1302164922/o1XDd4tWZT8tMIYhCWTfYycG4Ek4/20206217506/image3.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.newslist != null) {
      console.log("hello")
      console.log(options.newslist)
      var tmp = JSON.parse(options.newslist)
      this.setData({
        newslist: tmp
      })
    }
    else {
      console.log("init")
      console.log("------------------" + app.globalData.pageNum)
      if (options.word != null) {
        this.setData({
          word: options.word
        })

        var that = this

        wx.request({
          method: 'get',
          url: 'https://api.tianapi.com/guonei/index?key=54179c84d1d94034c92bd106a2b792c1&num=' + 10 + '&word=' + this.data.word + '&page=' + app.globalData.pageNum,

          success: function (res) {
            if (res.data.code == 200) {

              var a = app.globalData.pageNum + 1
              app.globalData.pageNum = a
              console.log("页数" + app.globalData.pageNum)

              var t = JSON.stringify(res.data.newslist)
              if (res.data != null) {
                var tmp = JSON.parse(t)
                that.setData({
                  newslist: tmp
                })
              }
            } else {
              console.log("连接超时")
            }
          },
          fail: function (err) {
            console.log(err)
          }
        })



      }

    }

  },

  next: function () {
    console.log("页数" + app.globalData.pageNum)
    wx.request({
      method: 'get',
      url: 'https://api.tianapi.com/guonei/index?key=54179c84d1d94034c92bd106a2b792c1&num=' + 10 + '&word=' + this.data.word + '&page=' + (app.globalData.pageNum + 1),

      success: function (res) {
        if (res.data.code == 200) {

          var a = app.globalData.pageNum + 1
          app.globalData.pageNum = a

          var t = JSON.stringify(res.data.newslist)

          if (t != null) {
            wx.navigateTo({
              url: '../jrsb/jrsb?newslist=' + t,
            })
          }
        } else {
          console.log("连接超时")
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },

  prev: function () {
    console.log("页数" + app.globalData.pageNum)
    wx.request({
      method: 'get',
      url: 'https://api.tianapi.com/guonei/index?key=54179c84d1d94034c92bd106a2b792c1&num=' + 10 + '&word=' + this.data.word + '&page=' + (app.globalData.pageNum - 1),

      success: function (res) {
        if (res.data.code == 200) {
          // that.setData({
          //content: res.data.newslist[0].content
          // })

          var a = app.globalData.pageNum - 1
          app.globalData.pageNum = a

          var t = JSON.stringify(res.data.newslist)

          if (t != null) {
            wx.navigateTo({
              url: '../jrsb/jrsb?newslist=' + t,
            })
          }
        } else {
          console.log("连接超时")
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },

  index: function (event) {

    wx.switchTab({
      url: '../../index/index',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})