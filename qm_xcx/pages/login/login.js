const app = getApp();
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    host: app.globalData.host
  },
  onLoad: function() {
    var that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.queryUsreInfo();
  },
  bindGetUserInfo(){
    var that = this;
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    //logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    wx.login({
      success: (res) => {
        console.log(res)
        wx.request({
          //获取openid接口
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: app.globalData.appid,
            secret: app.globalData.secret,
            js_code: res.code,
            grant_type: 'authorization_code'
          },
          method: 'GET',
          success:function(res){
            console.log(res)
            that.queryUsreInfo();
          }
        })
      }
    })
  },
  //获取用户信息接口
  queryUsreInfo(){
    // 获取用户信息,也就是判断用户是否授权登录
    var that=this;
    wx.getSetting({
      withCredentials: true,
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              wx.setStorageSync('userInfo', res.userInfo);
              app.globalData.userInfo = wx.getStorageSync("userInfo");
              app.globalData.cartCount = wx.getStorageSync("cartCount") || 0;
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (app.userInfoReadyCallback) {
                app.userInfoReadyCallback(res)
                wx.switchTab({
                  url: '../index/index'
                })
              }
              wx.switchTab({
                url: '../index/index'
              })
            }
          })
        }
      }
    })
  },

})