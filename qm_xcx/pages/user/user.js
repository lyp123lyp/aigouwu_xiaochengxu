// pages/user/user.js
var app = getApp()
Page({
  data: {
    host: app.globalData.host,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {},
  },
  onLoad: function() {
    var that = this;

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
    var orderList = app.getStorageFn("orderList");
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


  }

})