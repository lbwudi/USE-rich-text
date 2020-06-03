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
    //文章编号
    passageid: '',
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
    // console.log("失去焦点")
    // console.log(e.detail)
    // that.setData({
    //   content: e.detail
    // })
    // wx.setStorageSync("content", e.detail)
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
      passageid: time
    })
  },
  // 获取内容
  clickLogText(e) {
    var j = 0
    app.globalData.fileID = []
    that.editorCtx.getContents({
      success: function (res) {
        console.log(res.html)
        // wx.setStorageSync("content", res.html); // 缓存本地
        // <p><img src="http://tmp/wx9ae5c4c482cfeb39.o6zAJs2JZcoAyVtyjegLp3agxtfc.IelBZJYQlkdh4f386032ae52dcdbf6baca155d13b10e.png" width="80%" data-custom="id=abcd&amp;role=god"></p><p>撒打算</p>
        /*
        把图片存储到服务器上，并把路径设置成
            openid/passageid/图片i
        */

        //1、获取所有图片地址，
        //2、把临时地址替换成服务器地址
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
        wx.showLoading({
          title: '上传图片中',
        })
        // 上传图片
        var paths = that.data.images

        var uploadTasks_id = []
        for (var i = 0; i < paths.length; i++) {
          const cloudPath = that.data.openid + '/' +
            that.data.passageid +
            '/image' + i + paths[i].match(/\.[^.]+?$/)[0]

          const filePath = paths[i]

          uploadTasks_id[i] = wx.cloud.uploadFile({
            cloudPath,
            filePath,
            success: res => {
              console.log('[上传文件] 成功：', res)

              app.globalData.fileID = app.globalData.fileID
                .concat(res.fileID)
              console.log("wrong?" + app.globalData.fileID)
            },
            fail: e => {
              console.error('[上传文件] 失败：', e)
              wx.showToast({
                icon: 'none',
                title: '上传失败',
              })
            },
            complete: () => {
              wx.hideLoading()
            }
          })

          console.log("上传" + that.data.uploadTasks.length)
          var fileNum = j
          var myData = res
          // console.log("dsad" + myData.html)
        }

        that.data.uploadTasks = uploadTasks_id

        that.save(fileNum, myData)
      }
    })
  },


  save: function (fileNum, myData) {
    console.log("进入save，输出参数" + fileNum + "," +
      myData.html)
    var count = 0
    var over = [0, 0]
    var arr = []
    arr = that.data.uploadTasks
    console.log("任务监控器0" + arr[0])
    console.log("任务监控器1" + arr[1])

    var interval = setInterval(function () {
      console.log("进入定时器over0" + over[0] + ",over1=" + over[1])
      if (over[1] == 100) {
        var a = 1
        arr[a].offProgressUpdate()
      }
      if (over[0] == 100) {
        var a = 0
        arr[a].offProgressUpdate()
      }


      //先0后1，他可能未开始，所以不显示
      if (over[1] != 100) {
        arr[1].onProgressUpdate(res2 => {
          console.log('1上传进度' + res2.progress);
          if (res2.progress == 100) {
            count++
            console.log("count加一" + count)
            over[1] = 100
          }
        });
      }

      if (over[0] != 100) {
        arr[0].onProgressUpdate(res => {
          console.log('0传进度' + res.progress);
          if (res.progress == 100) {
            count++
            console.log("count加一" + count)
            over[0] = 100
          }
        });
      }



      // for (var i = 0; i < arr.length; i++){
      //   arr[i].onProgressUpdate(res => {
      //     console.log(i+'上传进度', res.progress);
      //     if (res.progress == 100){
      //       count++
      //       console.log("count加一"+count)
      //     }
      //   });
      // }
      console.log("上传任务数量" + that.data.uploadTasks.length)
      console.log("计数器" + count)
      //上传任务全部已经完成
      if (count == fileNum) {

        console.log("文件列表长度：" +
          app.globalData.fileID.length)
        console.log("文件1：" +
          app.globalData.fileID[0])
        console.log("文件2：" +
          app.globalData.fileID[1])

        //把图片地址换成服务器地址
        var str = myData.html
        for (var i = 0; i < app.globalData.fileID.length; i++) {
          console.log("执行了一次")
          str = str.replace(/http:\/\/tmp\/[a-zA-Z0-9]+\.[a-zA-Z0-9]+\.[a-zA-Z0-9]+\.[a-zA-Z0-9]+/, app.globalData.fileID[i])
        }
        console.log("提交数据" + str)

        /*上传到数据库
        
        const db = wx.cloud.database()
        db.collection('passage').add({
          data: {
            passage: str
          },
          success: res => {
            wx.navigateTo({
              url: '',
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
          */
        console.log(interval)
        clearInterval(interval)
      }
    }, 1000)



  },

  generateHtml(str) {
    for (var i = 0; i < app.globalData.fileID.length; i++) {
      str = str.replace(/http:\/\/tmp\/[a-zA-Z0-9]+\.[a-zA-Z0-9]+\.[a-zA-Z0-9]+\.[a-zA-Z0-9]+/, app.globalData.fileID[i])
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