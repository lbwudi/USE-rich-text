// pages/fg/fg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:[
      "田园风光", 
      "圣天湖",
      "黄河",
      "山", 
      "清晨的街道",
      "公园"
    ],
    loc: [
      // "http://localhost:8080/wx_server/images/field.jpg",
      // "http://localhost:8080/wx_server/images/lake1.jpg",
      // "http://localhost:8080/wx_server/images/river.jpg",
      // "http://localhost:8080/wx_server/images/mountain.jpg",
      // "http://localhost:8080/wx_server/images/street.jpg",
      // "http://localhost:8080/wx_server/images/yuan.jpg"
      "cloud://liubeibei-o5krp.6c69-liubeibei-o5krp-1302164922/o1XDd4tWZT8tMIYhCWTfYycG4Ek4/20206217325/image8.jpg",
      "cloud://liubeibei-o5krp.6c69-liubeibei-o5krp-1302164922/o1XDd4tWZT8tMIYhCWTfYycG4Ek4/20206217325/image12.jpg",
      "cloud://liubeibei-o5krp.6c69-liubeibei-o5krp-1302164922/o1XDd4tWZT8tMIYhCWTfYycG4Ek4/20206217506/image4.jpg",
      "cloud://liubeibei-o5krp.6c69-liubeibei-o5krp-1302164922/o1XDd4tWZT8tMIYhCWTfYycG4Ek4/20206217506/image0.jpg",
      "cloud://liubeibei-o5krp.6c69-liubeibei-o5krp-1302164922/o1XDd4tWZT8tMIYhCWTfYycG4Ek4/20206217506/image6.jpg",
      "cloud://liubeibei-o5krp.6c69-liubeibei-o5krp-1302164922/o1XDd4tWZT8tMIYhCWTfYycG4Ek4/20206217506/image7.jpg"
    ]
  },
  next: function (event) {
    console.log("hello")

    wx.switchTab({
      url: '../index/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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