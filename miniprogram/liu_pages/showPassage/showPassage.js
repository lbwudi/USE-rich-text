const app = getApp()
var that
Page({
  onShareAppMessage() {
    return {
      title: 'rich-text',
      path: 'page/component/pages/rich-text/rich-text'
    }
  },

  data: {
    edit:'cloud://liubeibei-o5krp.6c69-liubeibei-o5krp-1302164922/o1XDd4tWZT8tMIYhCWTfYycG4Ek4/20206217325/image7.png',
    home:'cloud://liubeibei-o5krp.6c69-liubeibei-o5krp-1302164922/o1XDd4tWZT8tMIYhCWTfYycG4Ek4/20206217325/image10.png',
    //数据库
//     htmlSnip:`
// < h2 > a good day</h2> <p><img src="cloud://liubeibei-o5krp.6c69-liubeibei-o5krp-1302164922/o1XDd4tWZT8tMIYhCWTfYycG4Ek4/202050201812/image0.png" width="80%" data-custom="id=abcd&amp;role=god"></p><p>happy</p><p><img src="cloud://liubeibei-o5krp.6c69-liubeibei-o5krp-1302164922/o1XDd4tWZT8tMIYhCWTfYycG4Ek4/202050201812/image1.jpg" width="123" data-custom="id=abcd&amp;role=god" style=""></p>
//     `,
    htmlSnip:``,
    renderedByHtml: false,

    passageId:0

  },
  index: function (event) {
    wx.navigateTo({
      // url: '../../pages/index/index',
      url: '../prewatch/prewatch',
    })
  },
  renderHtml() {
    this.tired()
    this.setData({
      renderedByHtml: true
    })
    
  },
  
  onLoad(option){
    that = this
    this.setData({
      passageId: Number(option.id)
    })
    console.log("接收到参数"+this.data.passageId)
    this.onQuery()
    
    
   
    // console.log("%%%%%%%" + this.data.htmlSnip)
    // this.tired()
  },
  onQuery: function () {
    const db = wx.cloud.database()
    console.log("、、、、、准备查询的passageId=" + app.globalData.passageIdList[that.data.passageId])
    // 查询当前用户所有的 counters
    db.collection('passage').where({
      _openid: app.globalData.openid,
      passageId: app.globalData.passageIdList[that.data.passageId]
    }).get({
      success: res => {
        var str=''
        //把所有数据都查出来了，需要再加上日期或者文章号才能具体查询
        // for(var i=0;i<res.data.length;i++){
        str+='`'+res.data[0].passage
        // }
        str+='`'
        that.data.htmlSnip = str
        that.setData({
          htmlSnip: str
        })
        
        console.log("数据库文本" + str)
        console.log('[数据库] [查询记录] 成功: ', res)

        that.tired()

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
  tired:function(){
    //得到要存入rich-text中的message.
    var _message = this.data.htmlSnip;
    var img_index = _message.indexOf("img")
    var srcindex = 0
    var jpgindex = 0

    console.log(img_index);

    that.replaceSrc(_message,
      img_index, srcindex, jpgindex,5)
  },

  replaceSrc: function (_message,
    img_index, srcindex, jpgindex,level){
    console.log("message="+_message)
    console.log("img_index=" + img_index)
    // console.log("srcindex=" + srcindex)
    // console.log("jpgindex=" + jpgindex)
    //如果message中有img
    
    if (img_index == -1 || level < 0){
      this.setData({
        renderedByHtml: true
      })
      return 
    }

    //找到云端的src
    srcindex = _message.indexOf("cloud:", srcindex+1);
    jpgindex = _message.indexOf(".jpg", jpgindex+1);
    console.log("srcindex=" + srcindex)
    console.log("jpgindex=" + jpgindex)
    if(jpgindex == -1 || jpgindex=='-1' || Number(jpgindex) == -1){
      console.log("iiiiiiiiiiiiiiiiiiiiiiiii")
      jpgindex = _message.indexOf(".png", jpgindex + 1);
      console.log("ooooooooooo"+jpgindex)
    }
    
    var src = _message.substring(srcindex, jpgindex + 4);
    console.log("===="+src);
    //使用wx提供的getTempFileURL的方法获取临时url
    wx.cloud.getTempFileURL({
      fileList: [src],
      success: res => {
        // 将原来message中的img的src 云端id转换为零时的fileId
        // console.log(res.fileList[0].tempFileURL);
        
        _message = _message.replace(src, res.fileList[0].tempFileURL);
        
        console.log("***"+_message)
        //设置message
        that.setData({
          htmlSnip: _message
        })
      },
      complete: function(){
        that.replaceSrc(_message,
          img_index, srcindex, jpgindex,level-1)
      }
    })
    img_index = _message.indexOf("img", img_index + 1)
  },
  edit: function (event) {

    wx.navigateTo({
     
      url: '../edit/edit',
    })
  },
  
})