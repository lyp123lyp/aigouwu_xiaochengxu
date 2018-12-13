// pages/classify/classify.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: app.globalData.host,
    navList: [], //导航栏列表
    contentList: [], //内容列表
    curStatus: 1
  },
  //发送数据请求，侧边栏导航列表，和列表详情，把值过滤
  //当发送 nav 值为1时，表示，表示侧边栏的值已经获取过来
  getList(nav, fid) {
    var that = this;
    return new Promise(function(open, err) {
      wx.request({
        url: that.data.host + '/products/navContentList',
        data: {
          navList: nav,
          fid: fid
        },
        method: "get",
        dataType: "json",
        success: function(res) {   
          var obj = res.data;
          var arr1 = obj.navList,
            arr2 = obj.contentList;
          var value = {};
          var contentList = [];
          if (arr1!=undefined) {
            var navList = [];
            for (var i = 0, len = arr1.length; i < len; i++) {
              var fid = arr1[i].fid;
              navList[fid - 1] = arr1[i];
            }
            value.navList = navList;
          }
          for (var i = 0, len = arr2.length; i < len; i++) {   
            var keywords = arr2[i].keywords.split("&");
            var obj = {};
            obj.sname = arr2[i].sname;
            obj.keywords = keywords;
            contentList[i] = obj;
          }
          value.contentList = contentList;
          open(value);

        }
      })
    })


  },
  //改变侧边栏的选中状态，请求数据
  changeContentList(event) {
    var fid = event.currentTarget.id;
    if (this.data.curStatus==fid){
      return 
    }
    this.getList(1, fid).then(res => {
     //console.log(res);
      this.setData({
        contentList: res.contentList,
        curStatus: fid
      })
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getList(0, 1).then(res => {
      //  console.log(res);
      this.setData({
        navList: res.navList,
        contentList: res.contentList
      })
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