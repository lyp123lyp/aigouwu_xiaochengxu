// pages/order/order.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host:app.globalData.host,
    index:0,
    point:true,//温馨提示是否显示
    orderList:[{
      numId: 7685501514530843,
      pid:1,
      time: "2017-12-29 15:00",
      img_url:"/picture/59dad163397c4.jpg",
      title:"息息本色竹浆抽纸3层330张20包1件 ",
      price:69,
      oldPrice:78,
      count:1,
      property:"无"
    }]
  },
  // 设置所处当前栏目的的样式
    status:function(event){
   // console.log(event)
   this.setData({
     index: event.currentTarget.dataset.id
   });
  },
  // 删除订单
  deleteNumId:function(event){
    var arr=this.data.orderList;
    var len = arr.length;
    var numId=event.currentTarget.dataset.numid;
    // wx.request({
    //   url: app.globalData.host,
    //   success:res=>{
    //     console.log(res);
    //   }
    // });;
    for(var i=0;i<len;i++){
        if(arr[i].numId==numId){
          arr.splice(i,1);
          this.setData({
            orderList:arr
          })
          break;
        }
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: app.globalData.host,
      success:function(res){
        console.log(res);
        //设置请求返回的数据
      }
    })
    this.setData({
       index:options.orderStatus||0
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