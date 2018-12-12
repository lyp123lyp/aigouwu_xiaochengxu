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
      img_url:"5c04efd424c44.jpeg",
      title:"云南白药留兰香型祛除口腔异味牙膏-3支装",
      newPrice:0,
      oldPrice:0,
      value:1,
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
    var details=options.details;
    var arr=details.slice(1,-1).split(",");
    //console.log(arr);
    var res={zhekou:2.5};
      var [oid,title,newPrice,oldPrice,value,time,img_url]=arr;
      this.setData({
        tatol1: (newPrice * value).toFixed(2),
        tatol2: (newPrice * value-res.zhekou).toFixed(2),
        oid:oid,
        img_url:img_url,
        title:title,
        newPrice:(newPrice*1).toFixed(2),
        oldPrice:(oldPrice*1).toFixed(2),
        time:time,//获取到的是毫秒要做转换
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