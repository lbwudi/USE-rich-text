var that;
const app = getApp()

Page({
  data: {
    //富文本
    content: '',
    formats: {}, // 样式
    placeholder: '开始输入...',
    //富文本中的图片地址
    images: [],
    images_index: [],

    fileID:[],
    //文章编号
    passageId: '',
    uploadTasks: [],

    //数据库
    openid: '',
    passage: null,
    queryResult: '',
  },

  onLoad() {
    that = this;
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    } else {
      this.setData({
        openid: this.getOpenID
      })
    }
  },

  getOpenID: async function () {
    if (this.data.openid) {
      return this.data.openid
    }

    const { result } = await wx.cloud.callFunction({
      name: 'login',
      config: {
        env: 'release-f8415a',
      },
    })

    return result.openid
  },

  // 初始化编辑器
  onEditorReady() {
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context

      if (wx.getStorageSync("content")) { // 设置~历史值
        that.editorCtx.insertText(wx.getStorageSync("content"))
        // 注意：插入的是对象
      }

    }).exec()
  },
  // 返回选区已设置的样式
  onStatusChange(e) {
    // console.log(e.detail)
    const formats = e.detail
    this.setData({
      formats
    })
  },
  insertImage() {
    const that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        that.editorCtx.insertImage({
          src: res.tempFilePaths[0],
          data: {
            id: 'abcd',
            role: 'god'
          },
          width: '80%',
          success: function () {
            console.log('insert image success')
          }
        })
      },
      fail: e => {
        console.error(e)
      }
    })
  },
  // 内容发生改变
  onContentChange(e) {
    // console.log("内容改变")
    // console.log(e.detail)
    // that.setData({
    //   content: e.detail
    // })
    // wx.setStorageSync("content", e.detail)
  },
  // 失去焦点
  onNoFocus(e) {
    console.log("失去焦点")
    console.log(e.detail)
    that.setData({
      content: e.detail
    })
    wx.setStorageSync("content", e.detail)
  },
  generatePassageId() {
    var date = new Date
    console.log(new Date())
    var a = date.getFullYear()
    var b = date.getMonth() + 1
    var c = date.getDay()
    var d = date.getHours()
    var e = date.getMinutes()
    var f = date.getSeconds()
    console.log(a + '' + b + '' + c + '' + d + '' + e + '' + f)
    var time = a + '' + b + '' + c + '' + d + '' + e + '' + f
    this.setData({
      passageId: time
    })
  },
  // 获取内容
  clickLogText(e) {
    var j = 0
    // app.globalData.fileID = []
    that.editorCtx.getContents({
      success: function (res) {
        console.log(res.html)
        // wx.setStorageSync("content", res.html); // 缓存本地
        // <p><img src="http://tmp/wx9ae5c4c482cfeb39.o6zAJs2JZcoAyVtyjegLp3agxtfc.IelBZJYQlkdh4f386032ae52dcdbf6baca155d13b10e.png" width="80%" data-custom="id=abcd&amp;role=god"></p><p>撒打算</p>
        /*
        把图片存储到服务器上，并把路径设置成
            openid/passageid/图片i
        */

        //1、获取所有图片临时地址，
        var arr = res.delta.ops
        for (var i = 0; i < arr.length; i++) {
          var img = arr[i].insert["image"]
          if (img != undefined) {
            j++
          }
        }
        for (var i = 0; i < arr.length; i++) {
          var img = arr[i].insert["image"]
          if (img != undefined) {
            console.log(arr[i].insert["image"])
            that.setData({
              images: that.data.images.concat(img)
            })
          }
        }
        console.log(that.data.images)
        //获取文章编号（日期）
        that.generatePassageId()
        //按照地址把图片上传
        // wx.showLoading({
        //   title: '上传图片中',
        // })
        // 上传图片
        var paths = that.data.images
        //存储
        var fileNum = j
        var myData = res
        var level = 50
        
        //使用在complete递归上传
        that.uploadOne(paths,0,fileNum,myData,level)
        
      }
    })
  },
  uploadOne: function (paths, index, fileNum, myData,level) {
    if(index >= paths.length || paths[index] == undefined || paths[index] ==null || level < 0){
      console.log("start to save")
      
      that.mySave(fileNum, myData)

      return 0
    }else{
      console.log("inedx="+index+"paths="+paths[index])
      level -= 1
    }
    //设置一张图片的服务器地址
    const cloudPath = that.data.openid + '/' +
      that.data.passageId +
      '/image' + index + paths[index].match(/\.[^.]+?$/)[0]
    const filePath = paths[index]

    //开始上传
    wx.cloud.uploadFile({
      cloudPath,
      filePath,
      success: res => {
        console.log('[上传文件] 成功：', res)

        that.data.fileID = that.data.fileID
          .concat(res.fileID)
        console.log("wrong?" + that.data.fileID)
      },
      fail: e => {
        console.error('[上传文件] 失败：', e)
        wx.showToast({
          icon: 'none',
          title: '上传失败',
        })
      },
      complete: () => {
        that.uploadOne(paths, index + 1, fileNum, myData, level-1)
      }
    })
  },
  
  
  mySave: function(fileNum, myData) {
    console.log("进入save，输出参数" + fileNum + "," +
      myData.html)
    
    //上传任务全部已经完成

      console.log("文件列表长度：" +
        that.data.fileID.length)
      console.log("文件1：" +
        that.data.fileID[0])
      console.log("文件2：" +
        that.data.fileID[1])

      //把图片地址换成服务器地址
      var str = myData.html
      for (var i = 0; i < that.data.fileID.length; i++) {
        console.log("执行了一次")
        if (str.search(/http:\/\/tmp\/[a-zA-Z0-9]+\.[a-zA-Z0-9]+\.[a-zA-Z0-9]+\.[a-zA-Z0-9]+/) != -1){
        str = str.replace(/http:\/\/tmp\/[a-zA-Z0-9]+\.[a-zA-Z0-9]+\.[a-zA-Z0-9]+\.[a-zA-Z0-9]+/, that.data.fileID[i])
        }else{
          str = str.replace(/wxfile:\/\/tmp_[a-zA-Z0-9]+\.[a-zA-Z0-9]+/, that.data.fileID[i])
        }
      }
      console.log("提交数据" + str)

      /*上传到数据库
      */
      const db = wx.cloud.database()
      db.collection('passage').add({
        data: {
          passage: str,
          fileID: that.data.fileID,
          fileNum: that.data.fileNum,
          pName: "爱哭的小狗",
          passageId: that.data.passageId
        },
        success: res => {
          wx.showToast({
            title: '新增记录成功',
          })
          console.log('[数据库] [新增记录] 成功，记录 _id: ',
            res._id)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '新增记录失败'
          })
          console.error('[数据库] [新增记录] 失败：', err)
        }
      })

      //从数据中提取出预览数据（作者名pName，图片fileID，主题subject）
      var subject = that.extract(str)

      //添加预览信息到预览数据库
      db.collection('prewatch').add({
        data: {
          fileID: that.data.fileID[0],
          pName: "爱哭的小狗",
          subject: subject,
          passageId: that.data.passageId
        },
        success: res => {
          wx.navigateTo({
            // url: '../showPassage/showPassage'
            url: "../prewatch/prewatch"
          })

          wx.showToast({
            title: '新增记录成功',
          })
          console.log('[数据库] [新增记录] 成功，记录 _id: ',
            res._id)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '新增记录失败'
          })
          console.error('[数据库] [新增记录] 失败：', err)
        }
      })
    

     
    
  },

  extract(str){
    var start = str.search(/[\u4e00-\u9fa5]/i)
    console.log("陪陪中文" + start)
    var end = str.search(/<\/h[0-9]|<\/p|<img/, start + 1)
    // var end = str.search(/</, start + 1)
    console.log("不是中文" + end)
    var extract = str.slice(start, end)
    console.log("提取到的中文部分：" + extract)
    return extract
  },

  generateHtml(str) {
    for (var i = 0; i < that.data.fileID.length; i++) {
      str = str.replace(/http:\/\/tmp\/[a-zA-Z0-9]+\.[a-zA-Z0-9]+\.[a-zA-Z0-9]+\.[a-zA-Z0-9]+/, that.data.fileID[i])
    }
    return str
  },

  // 清空所有
  clear() {
    this.editorCtx.clear({
      success: function (res) {
        console.log("清空成功")
      }
    })
  },
  // 清除样式
  removeFormat() {
    this.editorCtx.removeFormat()
  },
  // 记录样式
  format(e) {
    let {
      name,
      value
    } = e.target.dataset
    if (!name) return
    this.editorCtx.format(name, value)
  },
})