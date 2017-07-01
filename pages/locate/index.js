//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    city: '',
    hidden: true,
    currentTab: 0,
    latitude: 0,
    longitude: 0,
    hotcitys: [],
    catagory: []
  },
  onLoad: function () {
    //调用应用实例的方法获取全局数据
    wx.request({
      url: 'https://www.easy-mock.com/mock/591c7b6e9aba4141cf25ba81/dazhongdianping/cityList',
      method: 'GET',
      data: {},
      header: {
        'Accept':'application/json'
      },
      success:(res) => {
        console.log(res)
        this.setData({
          hotcitys: res.data.hotcitys,
          catagory: res.data.catagory,
        })
        console.log(this.data.hotcitys)
      }
    })
  },
  bindViewTap:function(e){
    // console.log(e.target.dataset.text);
    var city = e.target.dataset.text;
    // setStorage API设置本地存储
    wx.setStorage({
      key:"city",
      data:city
    });
    wx.switchTab({
      url: '../index/index'
    })
  },
  loadCity:function(longitude,latitude){
    var that =this;
    wx.request({
     //baidu地图逆地址解析API
      url: 'http://api.map.baidu.com/geocoder/v2/?ak=btsVVWf0TM1zUBEbzFz6QqWF&callback=renderReverse&location='+latitude+','+longitude+'&output=json&pois=1',
      data: {},
      header:{
        'Content-Type':'application/json'
      },
      success: function(res){
        // success
        console.log(res);
        var str1=res.data;
        //坑 此时返回的并不是JSON对象，要进行相关转换！
        var str2=str1.replace("renderReverse&&renderReverse(","");
        var str3=str2.substring(0,str2.length-1);
        var cityresult=JSON.parse(str3);
        console.log(typeof(cityresult));
        var city1=cityresult.result.addressComponent.city;
        var city=city1.replace("市","");
        that.setData({
          city:city
        });
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  switchNav:function(e){
    var that = this;
    // this 指向类
    // this.data 访问数据源
    // 组件自定义属性data-current e.target.dataset
    var current = e.target.dataset.current;
    if(this.data.currentTab === current){
      return false;
    } else{
      that.setData({
        currentTab:current
      })
    }
  },
  bindChange:function(e){
    var that = this;
    // e.detail 组件内置属性
    that.setData({
      currentTab:e.detail.current
    })
  }
  //事件处理函数
})
