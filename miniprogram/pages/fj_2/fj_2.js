// pages/fj_2/fj_2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    loc_1: [
      'cloud://liubeibei-o5krp.6c69-liubeibei-o5krp-1302164922/o1XDd4tWZT8tMIYhCWTfYycG4Ek4/20206217325/image1.jpg',
      'cloud://liubeibei-o5krp.6c69-liubeibei-o5krp-1302164922/o1XDd4tWZT8tMIYhCWTfYycG4Ek4/20206217325/image2.jpg',
      'cloud://liubeibei-o5krp.6c69-liubeibei-o5krp-1302164922/o1XDd4tWZT8tMIYhCWTfYycG4Ek4/20206217325/image3.jpg'
    ],
    desc_1_name: "永乐宫",
    desc_1: "永乐宫（大纯阳万寿宫）是中国现存最大一座元代道教宫观，全真教三大祖庭之一，是为纪念唐代道教著名人物吕洞宾。原建于芮城县黄河岸边永乐镇。原址北靠峨嵋岭，南临黄河。“永乐宫”因故址在永乐镇而命名，1959年至1964年间，因国家修建三门峡水库，由于永乐宫位于库区淹没区的原因，所以被整体搬迁至县城北郊龙泉村附近，建在原西周的古魏国都城遗址上，距离原址20千米许，是全国重点文物保护单位"

  },
  next: function (event) {
    console.log("hello")
    wx.navigateTo({
      url: '../fg/fg',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
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