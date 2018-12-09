// pages/orderDetail/orderDetail.js
const app= getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     host: app.globalData.host,
     userInfo:{
       uname: "LiLei",
       uphone:"13973897035",
       address:"湖南省-长沙市-岳麓区-绿地中央"
     },
       pid:1,
       img_url:"/picture/5c04efd424c44.jpeg",
       title:"云南白药留兰香型祛除口腔异味牙膏-3支装",
       newPrice:0,
      oldPrice:0,
      count:1,
       time: "2018-12-07 21:20:35",
       zhifu:"在线支付",
       zhekou:0,
       tatol1: 0,
        tatol2:0,
        fapiao:""
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var res={
      pid: 1,
      img_url: "/picture/5c04efd424c44.jpeg",
      title: "云南白药留兰香型祛除口腔异味牙膏-3支装",
      newPrice: 99,
      oldPrice: 112,
      count: 1,
      time: "2018-12-07 21:20:35",
      zhifu: "在线支付",
      zhekou: 15,
      fapiao:"不要发票"
    };  
    console.log(res.time);
      this.setData({
        tatol1: (res.newPrice * res.count).toFixed(2),
        tatol2: (res.newPrice * res.count-res.zhekou).toFixed(2),
        pid:res.pid,
        img_url:res.img_url,
        title:res.title,
        newPrice:(res.newPrice).toFixed(2),
        oldPrice:(res.oldPrice).toFixed(2),
        time:res.time,//获取到的是毫秒要做转换
        zhifu:res.zhifu,
        zhekou:(res.zhekou).toFixed(2),
        fapiao:"不要发票"
        
      });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})