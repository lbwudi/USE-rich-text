Page({
  data: {
    latitude: 34.70,
    longitude: 110.68,
    markers: [{
      id: 1,
      latitude: 34.70,
      longitude: 110.68,
      name: '位置1'
    }],
    covers: [{
      latitude: 34.70,
      longitude: 110.68,
      iconPath: '../images/location.png'
    }]
  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
  },
  getCenterLocation: function () {
    this.mapCtx.getCenterLocation({
      success: function (res) {
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
 
})
