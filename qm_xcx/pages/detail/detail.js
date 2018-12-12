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
    promise: "包邮", //商品是否包邮
    comment: 0, //上坪是否评论
    showComment: false, //是否有评论提示信息
    detailImgList: [], //商品详情图片列表
    cartCount: app.globalData.cartCount||0, //购物车的商品数量
    animationData: {},
    commentPople: true,
    spec: [], //商品的规格/颜色，id编号
    chiMa: [], //商品的尺码
    showPop: false, //底层弹窗是否显示，
    colorStatus: -1, //是否选中规格颜色
    chiMaStatus: -1, //尺码是否选中
    value: 1, //添加商品输入框的初始值，也是最小值
    guiGeChiMa: [] //用来提交订单的,规格尺码的集合
  },
  //当前的current改变
  currentCheck(event) {
    this.setData({
      index: event.detail.current + 1
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
    animation.translateY(422).step() //启动动画的初始位置
    _this.setData({
      animationData: animation.export(),
      showPop: true
    })
    setTimeout(function() {
      animation.translateY(0).step() //动画的结束位置
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
    setTimeout(function() {
      _this.setData({
        showPop: false
      })
    }.bind(_this), 500)
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
    //console.log(dataset);
    var arr = this.data.guiGeChiMa;
    if (dataset.chiMaStatus == undefined) {
      arr[0] = dataset.guigeyanse; //规格颜色
      this.setData({
        colorStatus: dataset.colorstatus,
        guiGeChiMa: arr
      });
    } else {
      arr[1] = this.dataset.chima;
      this.setData({
        chiMaStatus: dataset.chimastatus,
        guiGeChiMa: arr
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
      //本地储存
      //返回购物车的数据，购物车的数据全局储存
      var {
        title,
        newPrice,
        oldPrice,
        guiGeChiMa,
        value,
        pid
      } = this.data;
      var img_url=this.data.imgUrls[0];
      var obj = {
        "title": title,
        "newPrice": newPrice,
        "oldPrice":oldPrice,
        "guiGeChiMa": guiGeChiMa,
        "value": value,
        "pid": pid,
        "img_url":img_url,
        "checks":false//用啦判断购物车商品是否点击选中
      };
     // wx.clearStorageSync("caratList");//清空购物车数据  
      var cartList = wx.getStorageSync("cartList") || [];
      var len = cartList.length,
        index = -1;
      if (len == 0) {
        var arr = [obj];
        cartList = JSON.stringify(arr);
      } else {
        var arr = JSON.parse(cartList);
        var arr2=[];
        for (var i = 0, len = arr.length; i < len; i++) {
          var obj2 = arr[i];
          if (obj["pid"] == obj2["pid"]) {
            obj2["value"] = obj2["value"] * 1 + obj["value"] * 1;
            index = i;
          }
          arr2[i] = obj2;
        }
        if (index == -1) {
           arr2.push(obj);
        }
        cartList = JSON.stringify(arr2);
        
      }
      
      wx.setStorageSync("cartList", cartList);
      //获取商品数量，赋值给购物车
      
     
      var count = this.cartCount();
      this.setData({
        cartCount: count

      })

      //加入购物车后隐藏弹窗，
      if (event.currentTarget.id == "buy") {
        this.goToCart();
        return;
      }
      this.hideModal();
    }

  },
  goToCart() {
    wx.switchTab({
      url: '../cart/cart',
    })
  },
  //获取购物车商品数量
  cartCount(){
    var cartList=wx.getStorageSync("cartList");
    var arr= JSON.parse(cartList);
    var count=0;
    for(var i=0,len=arr.length;i<len;i++){
      count+=arr[i]["value"]*1;
    };
    return count;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var pid = options.pid;
    //根据pid 发送请求商品信息
    wx.request({
      url: this.data.host + '/products/detail?pid=' + pid,
      success: result => {
        var res = result.data[0];
        var {
          imgUrls,
          title,
          newPrice,
          oldPrice,
          zhe,
          promise,
          detailImgList,
          spec,
          chiMa
        } = res;
        imgUrls = imgUrls.length > 0 ? imgUrls.slice(0, -1) : "";
        detailImgList = detailImgList.length > 0 ? detailImgList.slice(0, -1) : "";
        spec = spec != null ? spec.slice(0, -1) : null;
        chiMa = chiMa != null ? chiMa.slice(0, -1) : null;
        this.setData({
          imgUrls: imgUrls.split("#"),
          title,
          newPrice: newPrice.toFixed(2),
          oldPrice: oldPrice.toFixed(2),
          zhe,
          promise,
          detailImgList: detailImgList.split("#"),
          pid: pid || 1, //模拟数据为0，因为不给值会报错
          spec: spec != null ? spec.split("#") : [],
          chiMa: chiMa != null ? chiMa.split("#") : [],
          chiMaStatus: chiMa != null && chiMa.length > 0 ? -1 : 0
        });

      }
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
    var cartCount =this.cartCount();
    this.setData({
      cartCount
    });
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