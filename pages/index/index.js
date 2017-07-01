//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    gessLike: []
  },
  //事件处理函数
  toChooseLocate:function(){
    wx.navigateTo({
      url: '../locate/index'
    })
  },
  toInputLocate:function(){
    wx.navigateTo({
      url: '../search/index'
    })
  },
  toPublicPage:function(){
    wx.navigateTo({
      url: '../public/index'
    })
  },
  toMoviePage:function(){
    wx.navigateTo({
      url: '../movie/index'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    wx.request({
      url: 'http://www.easy-mock.com/mock/591c7b6e9aba4141cf25ba81/dazhongdianping/gessLike',
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success:function(res) {
        that.setData({
          gessLike: res.data.gesslike
        })
      }
    })
  }
})
