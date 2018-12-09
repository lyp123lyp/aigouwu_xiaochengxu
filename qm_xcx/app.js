//app.js
App({
  onLaunch: function() { //小程序生命周期函数，初始化函数
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //获取openId
          // wx.request({
          //   url: this.globalData.host, //后台数据配置，返回openId...
          //   data: {
          //     code: res.code
          //   },
          //   method: 'GET',
          //   header: {
          //     'content-type': 'application/json'
          //   },
          //   success: function(openIdRes) {
          //     console.info("获取用户openId成功");
             

          //   },
          //   fail: function(error) {
          //     console.info("获取用户openId失败");
          //     this.globalData.openID = "失败2";
          //     console.info(error);
          //   },
          //   complete: function(openIdRes) {
          //     //this.globalData.openID ="Complete";
          //   }
          // })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })

    // 获取用户信息,也就是判断用户是否授权登录
    wx.getSetting({
      success: res => {
        //console.log(res);
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // console.log(res);
              // 可以将 res 发送给后台解码出 unionId

              wx.setStorageSync('userInfo', res.userInfo);
              //this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  accumulation(a,b){
    return a*b;
  },
  tatolAll(_this){
    var arr = _this.data.cartList,
      count = 0,
      tatol = 0;
    for (var i = 0, len = arr.length; i < len; i++) {
      if (arr[i].checks) {
        count++;
        tatol = (parseFloat(tatol) + this.accumulation(arr[i].value, arr[i].newPrice)).toFixed(2);
      }
    }
    return [count,tatol]
  },
  globalData: {
    userInfo: null,
    host: "http://localhost:3000"
   
  }
})