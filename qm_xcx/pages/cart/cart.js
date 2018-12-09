// pages/cart/cart.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: app.globalData.host,
    checkAllList: false,
    cartList: [], //购物车列表
    tatol: 0, //商品的合计
    count: 0, //被选中的商品数，用来判断是否全选
  },
  checkboxChange(event) {
    //console.log(event);
    var index = event.currentTarget.dataset.index;
    this.data.cartList[index].checks = !this.data.cartList[index].checks;
    var arr = getApp().tatolAll(this); 
    this.setData({
      count:arr[0],
      tatol:arr[1],
      checkAllList: arr[0] == this.data.cartList.lenth ? true : false
    });
  },
  addNum(event) {
    var arr = this.data.cartList;
    var curt = event.currentTarget;
    var index = curt.dataset.index;
    var id = curt.id;
    if (id == "jian") {
      if (arr[index].value == 1) {
        wx.showToast({
          title: '最小值1',
          icon: "none"
        })
        return;
      }
      arr[index].value--;
    } else {
      if (arr[index].value == 999) {
        wx.showToast({
          title: '最大值999',
          icon: "none"
        })
        return;
      }
      arr[index].value++;

    }
   
    var tatol_count=app.tatolAll(this);
   
    this.setData({
      cartList: arr,
      tatol:tatol_count[1]
    });
  },
  changeValue(event) {
    var value = event.detail.value;
    var index=event.currentTarget.dataset.index;
    if (value < 1 && value !== "") {
      var title = "最小值1";
      value = 1;
      wx.showToast({
        title,
        icon: "none"
      });
    } else if (value > 999) {
      var title = "最大值999";
      value = 999;
      wx.showToast({
        title,
        icon: "none"
      });
    } 
    
    var arr=this.data.cartList;
    var tatol_count=app.tatolAll(this);
    arr[index].value=value;
    this.setData({
      cartList:arr,
      tatol:tatol_count[1]
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
    var res = [{
      img_url: "/picture/5c04ef116e12f.jpeg",
      title: "女士羊毛纯色贝雷帽潮森系帽子",
      color: "MZ06 焦糖色",
      chiMa: "可调节",
      newPrice: 35,
      value: 1,
      checks: false,
      numId: 10000,
      pid: 1
    }];
    for (var i = 0; i < res.length; i++) {
      res[i].newPrice = res[0].newPrice.toFixed(2);
    }
    this.setData({
      cartList: res
    });
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