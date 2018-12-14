// pages/user/user.js
var app = getApp()
Page({
  data: {
    host: app.globalData.host,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {},
  },
  onLoad: function() {
    var that = this;
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    })

  },
 

  onShow: function() {
    var that = this;
    var key = wx.getStorageSync("userInfo");
    //console.log(key);
    var orderInfo = {
      pay_num: 0,
      Has_Sum: 0,
      rec_num: 0,
      finish_num: 0,
      refund_num: 0
    };
    app.getOrders(this).then(res=>{
      //console.log(res);
      var orderList = res;
      for (var i = 0, len = orderList.length; i < len; i++) {
        var status = orderList[i].order_status;
        if (status == 0) {
          orderInfo.pay_num += 1;
        } else if (status == 1) {
          orderInfo.Has_Sum += 1;
        } else if (status == 2) {
          orderInfo.rec_num += 1;
        } else if (status == 3) {
          orderInfo.finish_num += 1;
        } else if (status == 5) {
          ordreInfo.refund_num += 1;
        }
      };
      if (key.nickName) {
        that.setData({
          hasUserInfo: true,
          userInfo: key,
          orderInfo
        })

      }
    });
    


  }

})