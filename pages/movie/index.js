//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    movieArray: [],
    cinemaArray: []
  },
  //事件处理函数
  onLoad: function () {
    console.log('onLoad')
    var that = this;
    wx.request({
      url: 'http://m.maoyan.com/movie/list.json?type=hot&offset=0&limit=1000',
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success:function(res) {
        console.log(res.data.data.movies)
        that.setData({
          item: res.data.data.movies
        })
        console.log(that.data.movieArray);
      }
    }),
    wx.request({
      url: 'http://www.easy-mock.com/mock/591c7b6e9aba4141cf25ba81/dazhongdianping/movie',
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success:function(res) {
        that.setData({
          cinemaArray: res.data.cinema
        })
      }
    })
    // //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
