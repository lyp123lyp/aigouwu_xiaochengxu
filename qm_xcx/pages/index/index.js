// pages/index/index.js
const  app= getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    host:app.globalData.host,
    value: "",
    historyStatus:false,
    historyList:[],
    navTitleList:["面膜","保险箱","水龙头","坚果","垃圾袋","皮鞋","双肩","浴巾","充电宝"],
    imgUrls: [],//轮播图
    topicList: [{ img_url: "/picture/yuan11.png", title: "vip专区" }, 
              { img_url: "/picture/yuan22.png", title: "折扣专区" }, 
              { img_url:"/picture/yuan33.png", title: "微商专区" },
              { img_url:"/picture/yuan44.png",title:"今日推荐"}],//专题栏目
    vipjpList:[],//vip精品
    jpList1: [],//精品块上面的三张
    jpList2: [],//精品块下面的两张
    wsgList: [],//微商馆
    rmjxList: []//热门精选

  },
  //商品搜索+历史纪录储存
  searchProduct(event){
    var keywords=event.detail.value||this.data.value;
    var historyList= wx.getStorageSync('searchData')||[];
    if(historyList.length>0){
      this.setData({
        historyList
      })
    }
    if(keywords!=""&&historyList.indexOf(keywords)==-1){
      historyList.push(keywords);
      wx.setStorageSync("searchData",historyList);
    }
    if(keywords==""){
      wx.showToast({
        title: '搜索不能为空',
        icon: "none"
      })
      return
    }
    wx.navigateTo({
      url: '../search/search?keywords=' + keywords,
    })
  },
  inputValue(event){
      //console.log(event);
      var value=event.detail.value;
      this.setData({
          value,
      });
  },
  //获取焦点
  bindButtonTap: function () {
    this.setData({
      focus: true,
      historyStatus: true
    })
  },
  //失去焦点
  handleBlur(){
    this.setData({
      historyStatus:false
    });
  },
  //顶部滑动导航栏的搜索
  selectMeal(event){
    var keywords=event.currentTarget.dataset.keywords;
   wx.navigateTo({
     url: '../search/search?keywords='+keywords,
   });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
      wx.request({
        url: this.data.host+'/index/',
        success:res=>{
        //  console.log(res);
          var arr=res.data;
          this.setData({
            imgUrls:arr.slice(0,4),
            vipjpList:arr.slice(4,6),
            jpList1:arr.slice(6,9),
            jpList2:arr.slice(9,11),
            wsgList:arr.slice(11,14),
            rmjxList:arr.slice(14)
          });
        
        }
      })
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
    var historyList = wx.getStorageSync("searchData") || [];//获取历史纪录
    this.setData({
      historyList
    });
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
    wx.showToast({
      title: '没有更多了',
      icon:"none"
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
      console.log(0);
  }
})