// pages/user/user.js
var app = getApp()
Page({
  data: {
    host:app.globalData.host,
    hasUserInfo:false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo:{},
  },
  onLoad: function () {
    var that = this;
    
  },
  
  onShow: function () {
    var that = this;
    var key=wx.getStorageSync("userInfo");
    //console.log(key);
    if (key.nickName){
      that.setData({
         hasUserInfo:true,
         userInfo: key
      })
      
    }
   
   
  }

})