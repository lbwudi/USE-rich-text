// liu_pages/prewatch/prewatch.js

var that;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datalist: [],
    edit: 'cloud://liubeibei-o5krp.6c69-liubeibei-o5krp-1302164922/o1XDd4tWZT8tMIYhCWTfYycG4Ek4/20206217325/image7.png',
    home: 'cloud://liubeibei-o5krp.6c69-liubeibei-o5krp-1302164922/o1XDd4tWZT8tMIYhCWTfYycG4Ek4/20206217325/image10.png'
  },
  index: function (event) {
    wx.switchTab({
      url: '../../pages/index/index',
      // url: '../prewatch/prewatch',
    })
  },
  edit: function (event) {
    wx.navigateTo({
      url: '../edit/edit',
    })
  },
  detail: function (event){
    console.log("点击了"+event.currentTarget.id)
    wx.navigateTo({
      url: '../showPassage/showPassage?id=' +event.currentTarget.id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    this.onQuery()

    
  },
  onQuery: function () {
    console.log("ehle")
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('prewatch').where({
      pName: "爱哭的小狗"
    }).get({
      success: res => {
        that.setData({
          datalist: res.data
        })
        app.globalData.passageIdList=[]
        console.log("\\\\\\"+res.data.length)
        for (var i = 0; i < res.data.length;i++){
          // if (res.data[i]['passageId'] == "20206217325" && 
          //   res.data[i]['_openid'] == "o1XDd4tWZT8tMIYhCWTfYycG4Ek4"){
          //     continue
          //   }
         app.globalData.passageIdList[i] = res.data[i]['passageId']
        }
        for (var i = 0; i < app.globalData.passageIdList.length; i++) {
          console.log("文章号列表:i=" + app.globalData.passageIdList[i])
        }
        
        console.log("昌都市"+app.globalData.passageIdList.length)
        // console.log("1"+that.data.datalist)
        // console.log("2" + that.data.datalist[0]['pName'])
        // console.log(that.data.datalist[0]['fileID'] == "cloud://liubeibei-o5krp.6c69-liubeibei-o5krp-1302164922/o1XDd4tWZT8tMIYhCWTfYycG4Ek4/202062105026/image0.png")
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }

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