// pages/fj/fj.js
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
    loc_2: [
      "cloud://liubeibei-o5krp.6c69-liubeibei-o5krp-1302164922/o1XDd4tWZT8tMIYhCWTfYycG4Ek4/20206217325/image4.jpg",
      "cloud://liubeibei-o5krp.6c69-liubeibei-o5krp-1302164922/o1XDd4tWZT8tMIYhCWTfYycG4Ek4/20206217325/image5.jpg",
      "cloud://liubeibei-o5krp.6c69-liubeibei-o5krp-1302164922/o1XDd4tWZT8tMIYhCWTfYycG4Ek4/20206217325/image6.jpg",
    ],
    desc_2_name: "大禹渡",
    desc_2: "大禹渡位于县城东南20余里，它依山傍水，环境优美，是一座规模宏大，结构新颖的集灌溉、旅游为一体的旅游胜地。20世纪70年代，这里修建了大禹渡电灌站，电灌站于1979年对外开放。"
  }, 


  next: function(event){
    console.log("hello")
    
    wx.navigateTo({
      url: '../fj_2/fj_2',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
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