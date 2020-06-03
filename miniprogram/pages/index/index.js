// pages/ls/ls.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //src:'http://localhost:8080/wx_server/audio/rain.mp3',
    // text:"这是一个页面"
    music_img:
      "cloud://liubeibei-o5krp.6c69-liubeibei-o5krp-1302164922/o1XDd4tWZT8tMIYhCWTfYycG4Ek4/20206217506/image2.png",
    music_play: true,
    open: false

  },
  changeStateOfMusic: function () {
    if (this.data.music_play) {
      this.data.music.pause(() => {
        
      })
      this.setData({
        music_play: false,
        music_img:
          "cloud://liubeibei-o5krp.6c69-liubeibei-o5krp-1302164922/o1XDd4tWZT8tMIYhCWTfYycG4Ek4/20206217506/image5.png"
      })
      console.log('pause')
    }
    else{
      this.data.music.play(() => {
        
      })
      this.setData({
        music_play: true,
        music_img:
          "cloud://liubeibei-o5krp.6c69-liubeibei-o5krp-1302164922/o1XDd4tWZT8tMIYhCWTfYycG4Ek4/20206217506/image2.png"
      })
      console.log('开始播放')
    }
    
  },
  

  showitem: function () {
    this.setData({
      open: !this.data.open,
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
   // this.audioCtx = wx.createAudioContext('myAudio')
    const innerAudioContext = wx.createInnerAudioContext()
    this.setData({
      music: innerAudioContext
    })
    innerAudioContext.autoplay = true
    innerAudioContext.src = 'http://localhost:8080/wx_server/audio/rain.mp3'
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
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