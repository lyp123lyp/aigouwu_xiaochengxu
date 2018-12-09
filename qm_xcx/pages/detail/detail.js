// pages/detail/detail.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    host: app.globalData.host,
    index: 1, //当前是第几张图片
    pid: 100000000000000, //商品id
    imgUrls: [], //滑动图片列表
    title: '', //标题
    newPrice: 0, //新价
    oldPrice: 0, //原价
    zhe: 9.8, //商品折扣
    sellCount: 1, //销量
    store: 1500, //商品当前的库存
    subtitle: "包邮", //商品是否包邮
    comment: 0, //上坪是否评论
    showComment: false, //是否有评论提示信息
    detailImgList: [], //商品详情图片列表
    cartCount: 0, //购物车的商品数量
    animationData: {},
    commentPople: true,
    spec: [], //商品的规格颜色，id编号
    chiMa: [], //商品的尺码
    showPop: false, //底层弹窗是否显示，
    colorStatus: -1,
    chiMaStatus: -1,
    value: 1, //添加商品输入框的初始值，也是最小值
  },
  //当前的current改变
  currentCheck(event){
    this.setData({
      index:event.detail.current+1
    });
  },
  // 显示底部弹层
  showModal: function() {
    var _this = this;
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
      delay: 0
    })
   
    _this.animation = animation
    animation.translateY(422).step()//启动动画的初始位置
    _this.setData({
      animationData: animation.export(),
      showPop: true
    })
    setTimeout(function() {
      animation.translateY(0).step()//动画的结束位置
      _this.setData({
        animationData: animation.export()
      })
    }.bind(_this), 200)
  },
  // 隐藏底部弹层
  hideModal: function() {
    var _this = this;
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
      delay: 0
    })
    _this.animation = animation
    animation.translateY(422).step()
    _this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      _this.setData({
        showPop:false
      })
    }.bind(_this),500)
  },
  addNum(event) {
    var id = event.currentTarget.id;
    if (id == "jia") {
      if (this.data.value < 999)
        this.data.value++
        else
          wx.showToast({
            title: '最大值999',
            icon: "none"
          })
    } else {
      if (this.data.value > 1)
        this.data.value--
        else
          wx.showToast({
            title: '最小值1',
            icon: "none",
          })
    }
    this.setData({
      value: this.data.value
    });
  },
  inputNum(event) {
    //console.log(event);
    var value = event.detail.value;
    if (value < 1 && value !== "") {
      var title = "最小值1";
      value = 1;
    } else if (value > 999) {
      var title = "最大值999";
      value = 999;
    } else {
      return;
    }
    wx.showToast({
      title,
      icon: "none"
    });
    this.setData({
      value
    });
  },
  checkStatus(event) {
    //console.log(event);
    var dataset = event.currentTarget.dataset;
    console.log(dataset);
    if (dataset.chiMaStatus == undefined) {
      this.setData({
        colorStatus: dataset.colorstatus
      });
    } else {
      this.setData({
        chiMaStatus: dataset.chimastatus
      });
    }
  },
  addCart(event) {
    if (this.data.chiMaStatus == -1 || this.data.colorStatus == -1) {
      wx.showToast({
        title: '请选择属性',
        icon: "none"
      })
    } else {
      //发送请求插入数据库
      //返回购物车的数据，购物车的数据全局储存
      //加入购物车后隐藏弹窗，
      if (event.currentTarget.id == "buy") {
         this.goToCart();
        return;
      }
      this.hideModal();

    }

  },
  goToCart(){
    wx.navigateTo({
      url: '../cart/cart',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var pid = options.pid;
    //根据pid 发送请求商品信息
    //
    var res = {
      imgUrls: ["/picture/5c04efd424c44.jpeg", "/picture/5c04efd5cab89.jpeg", "/picture/5c04efd748899.jpeg", "/picture/5c04efd907257.jpeg", "/picture/5c04efda7d523.jpeg"],
      title: "休闲胸包斜挎包防水单肩包旅行挎包背包",
      newPrice: 68,
      oldPrice: 88,
      zhe: 7.6,
      sellCount: 1,
      store: 1500,
      subtitle: "包邮",
      comment: 0,
      detailImgList: ["/picture/20181203165757_30549.png"],
      cartCount: 1,
      spec: [{
        pid: 1,
        color: "1971X黑色"
      }, {
        pid: 2,
        color: "1972L灰色"
      }],
      chiMa: []
    }
    var {
      imgUrls,
      title,
      newPrice,
      oldPrice,
      zhe,
      sellCount,
      store,
      subtitle,
      comment,
      detailImgList,
      cartCount,
      spec,
      chiMa
    } = res;
    this.setData({
      imgUrls,
      title,
      newPrice: newPrice.toFixed(2),
      oldPrice: oldPrice.toFixed(2),
      zhe,
      sellCount,
      store,
      subtitle,
      comment,
      detailImgList,
      cartCount,
      pid: pid || 0, //模拟数据为0，因为不给值会报错
      spec,
      chiMa,
      chiMaStatus: chiMa.length > 0 ? -1 : 0
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