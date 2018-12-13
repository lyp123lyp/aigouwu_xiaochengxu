// pages/assortment/assortment.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: app.globalData.host,
    keywords: "",
    shopListGroup: [],
    repeat: "", //防止同一关键词重复搜索
    rank: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      keywords: options.keywords || ""
    });
    if (options.keywords) {
      wx.request({
        url: this.data.host + '/products/search?keywords=' + options.keywords,
        success: res => {
          // console.log(res);
          if (res.data[0].code == 0) {
            wx.showToast({
              title: '没有相关商品',
              icon: "none"
            })
          } else {
            var shopListGroup = res.data;
            var len = shopListGroup.length;
            for (var i = 0; i < len; i++) {
              shopListGroup[i].img_url = shopListGroup[i].imgUrls.split("#")[0];
            }

            this.setData({
              shopListGroup,
              repeat: options.keywords
            });
            this.changeRankList();
          }

        }
      })
    }
  },
  //输入框获取焦点
  bindButtonTap: function() {
    this.setData({
      focus: true
    })
  },
  //搜索商品
  searchProduct(event) {
    var keywords = event.detail.keywords || this.data.keywords;
    var historyList = wx.getStorageSync('searchData') || [];
    if (this.data.repeat == keywords) {
      return
    }
    if (historyList.length > 0) {
      this.setData({
        historyList,
      })
    }
    if (keywords != "" && historyList.indexOf(keywords) == -1) {
      historyList.push(keywords);
      wx.setStorageSync("searchData", historyList);
    }
    if (keywords == "") {
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
  //输入事件
  inputValue(event) {
    //console.log(event);
    var keywords = event.detail.value;
    this.setData({
      keywords,
    });
  },
  //失去焦点事件
  handleBlur() {
    this.setData({
      historyStatus: false
    });
  },
  changeRankList(event) {
    var e=event;
    if(e){
      var rank = e.currentTarget.dataset.rank;
    }else{
       var rank=1;
    }
    
    this.setData({
      rank
    })
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
    this.setData({
      repeat: this.data.keywords
    })
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