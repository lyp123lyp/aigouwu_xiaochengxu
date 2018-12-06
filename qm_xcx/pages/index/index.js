// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host:"http://localhost:3000",
    navTitleList:["精选","洗护美发","每日坚果","雪地靴","棉服","篮球"],
    imgUrls:["/picture/lunbo1.png","/picture/lunbo2.jpg","/picture/lunbo3.jpg","/picture/lunbo4.jpg"],
    vipList: [{ img_url: "/picture/yuan11.png", text: "vip专区" }, 
              { img_url: "/picture/yuan22.png", text: "折扣专区" }, 
              { img_url:"/picture/yuan33.png", text: "微商专区" },
              { img_url:"/picture/yuan44.png",text:"今日推荐"}],
    loveList: [{ img_url: "/picture/1029(20).png", text: "按摩盆" }, 
               {img_url: "/picture/1029(1).png", text: "微波炉"}, 
               { img_url: "/picture/1029(2).png", text: "亚麻籽油" }],
    jpList: [
      { img_url: "5b961dfae8f3e.jpg", text: "即热式电热水龙头" }, 
      { img_url: "580dd94e00271.png", text: "迷你保险箱" },
      { img_url: "5b88f2cab118a.jpeg", text: "可降解环保垃圾" }]
   


  },
  bindButtonTap: function () {
    this.setData({
      focus: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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