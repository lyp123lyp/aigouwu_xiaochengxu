//app.js
App({
  onLaunch: function() { //小程序生命周期函数，初始化函数
    // 展示本地存储能力
    //var logs = wx.getStorageSync('logs') || []
    //logs.unshift(Date.now())
    //wx.setStorageSync('logs', logs)
  },
  accumulation(a, b) {
    return a * b;
  },
  tatolAll(_this) {
    var arr = _this.data.cartList,
      count = 0,
      tatol = 0;
    for (var i = 0, len = arr.length; i < len; i++) {
      if (arr[i].checks) {
        count++;
        tatol = (parseFloat(tatol) + this.accumulation(arr[i].value, arr[i].newPrice)).toFixed(2);
      }
    }
    return [count, tatol]
  },
  getOrders(_this) { //获取商品的订单
    return new Promise(function (open, err) {
      wx.request({
        url: _this.data.host + '/products/getOrders',
        data: {
          uid: 101 //uid要动态赋值 
        },
        success: (res) => {
          // console.log(res);
          var orderList = res.data;
          //设置请求返回的数据
          // _this.setData({
          //   orderList
          // });
          //console.log(orderList);
          var orderStr = JSON.stringify(orderList);
          wx.setStorageSync("orderList", orderStr);
          open(orderList);
        }
      })
    });
  },
  getStorageFn(key){//获取缓存，相对数组和对象使用
    var orders = wx.getStorageSync(key);
    var orderList = JSON.parse(orders);
    return orderList;
  },
  setStorageFn(obj,key){//设置换存，相对数组和对象使用
    var orders = JSON.stringify(obj);
    wx.setStorageSync(key, orders);
  },
  globalData: {
    userInfo: null,
    host: "http://localhost:3000",
    cartCount: 0,
    appid:"wxa5db924157312b20",
    secret:"a0f6b5ac03642a99dc4b914269995fe8"

  }
})