// pages/order/order.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: app.globalData.host,
    index: 0,
    point: true, //温馨提示是否显示
    orderList: [{
      oid: 7685501514530843,
      pid: 1,
      time: "2017-12-29 15:00",
      img_url: "59dad163397c4.jpg",
      title: "息息本色竹浆抽纸3层330张20包1件",
      newPrice: 69,
      oldPrice: 78,
      value: 2,
      guiGeChiMa: "无"
    }]
  },

  // 设置所处当前栏目的的样式，以及显示相关状态的订单
  status: function(event) {
    // console.log(event)
    var id = event.currentTarget.dataset.id;
    this.setData({
      index: parseFloat(id)+1
    });
    this.showOrderStatus(id);


  },
  // 删除订单
  deleteOid: function(event) {
    var arr = this.data.orderList;
    var len = arr.length;
    var oid = event.currentTarget.dataset.oid;
    var itemList = ["删除订单？"];
    wx.showActionSheet({
      itemList: itemList,
      success: (res) => {
        for (var i = 0; i < len; i++) {
          if (arr[i].oid == oid) {
            //删除数据请求
            wx.request({
              url: this.data.host + '/products/delOrder',
              data: {
                oid
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              method: "get",
              dateType: "json",
              success: (res) => {
                if (res.data.code == 1) {
                  arr.splice(i, 1);
                  this.setData({
                    orderList: arr
                  })
                } else {
                  wx.showToast({
                    title: '删除失败',
                    icon: "none"
                  })
                }

              }
            })
            break;
          }
        }
      }
    })
  },
  handleBuy(event) {
    var oid = event.currentTarget.dataset.oid;
    //发送请求根据返回值在去设置商品支付状态
    wx.request({
      url: this.data.host + '/products/orderStatus',
      data: {
        oid,
        order_status:1
      },
      method:"POST",
      header:{
        "content-type":"application/x-www-form-urlencoded"
      },
      success: (res) => {
        if (res.data.code == 1) {
            wx.showToast({
              title: '支付成功'
            })
            //将发送过去的状态码，返回，设置订单状态，减少http请求,
            var orderList=app.getStorageFn("orderList");//获取本地缓存
            for(var i=0,len=orderList.length;i<len;i++){
                 if(oid==orderList[i].oid){
                    orderList[i].order_status=res.data.order_status
                 }
            };
            app.setStorageFn(orderList,"orderList");//设置本地缓存
            this.setData({
              orderList
            })

        } else {
          wx.showToast({
            title:"支付失败",
            icon:"none"
          })
        }
       
      }
    })
  },
  //根据订单单行栏目状态显示订单
  showOrderStatus(id,arr){
   var orderList= arr;
    var list = [];
    for (var i = 0, len = orderList.length; i < len; i++) {
      if (id == -1) {
        list = orderList;
      } else if (id == orderList[i].order_status) {
        list.push(orderList[i]);
      }
    }
    this.setData({
      orderList: list
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   // console.log(options)
    this.setData({
      index: options.orderStatus || 0
    });
    //需要使用 Promise
    app.getOrders(this).then(res => {//promise 返回的是一个数组
      this.showOrderStatus(this.data.index - 1,res);
    }); //获取订单列表，异步获取数据
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
   
    
  

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})