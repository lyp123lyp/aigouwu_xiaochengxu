// pages/cart/cart.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: app.globalData.host,
    checkAllList: false,//是否全选
    cartList: [], //购物车列表
    tatol: 0, //商品的合计
    count: 0, //被选中的商品数，用来判断是否全选
  },
  //点击复选框来改变商品是否选中，来判断是否全选
  checkboxChange(event) {
    //console.log(event);
    var index = event.currentTarget.dataset.index;
    this.data.cartList[index].checks = !this.data.cartList[index].checks;
    var arr = getApp().tatolAll(this); 
    this.setData({
      count:arr[0],
      tatol:arr[1],
      checkAllList: arr[0] == this.data.cartList.length ? true : false
    });
    var cartList = JSON.stringify(this.data.cartList);
    wx.setStorageSync("cartList",cartList);
  },
  // 通过点击事件来改变输入框的值
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
    var cartList=JSON.stringify(this.data.cartList);
    wx.setStorageSync("cartList", cartList);

  },
  // 手动输入输入框的值
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
    var cartList = JSON.stringify(this.data.cartList);
    wx.setStorageSync("cartList", cartList);

  },
  //删除商品
  deleteItem(event){
      var index=event.currentTarget.dataset.index;
      var arr=this.data.cartList;
      arr.splice(index,1);
      var count_tatol=app.tatolAll(this);
      this.setData({
        cartList:arr,
        count:count_tatol[0],
        tatol:count_tatol[1],
        checkAllList:count_tatol[0]==arr.length&&arr.length!=0?true:false
      });
    var cartList = JSON.stringify(this.data.cartList);
    wx.setStorageSync("cartList", cartList);

      
  },
  //全选商品
  checkAllItem(event){
    var  flag=this.data.checkAllList;
    var arr=this.data.cartList;
     for(var i=0,len=arr.length;i<len;i++){
       arr[i].checks=!flag;
     }
     if(!flag){
       var count_tatol=app.tatolAll(this);
     }else{
       var count_tatol=[0,0]
     }
     this.setData({
       cartList:arr,
       checkAllList: !flag,
       count:count_tatol[0],
       tatol:count_tatol[1]
     });
    var cartList = JSON.stringify(this.data.cartList);
    wx.setStorageSync("cartList", cartList);

  },
  //提交订单
  gotoOrders(){
    if(this.data.tatol==0){
      wx.showToast({
        title: '您没有选中商品',
        icon:"none"
      });
      return
    }
    //向数据库发送请求，提交订单
    var cartList= wx.getStorageSync("cartList");
    var arr=JSON.parse(cartList);
    var orders=[];
    var cartList1=[];//用来筛选为选中的商品
    for(var i=0,len=arr.length;i<len;i++){
       if(arr[i].checks==true){
         orders.push(arr[i])
       }else{
         cartList1.push(arr[i]);
       }
    };
    wx.request({
      url: this.data.host+'/products/orders',
      data:{orders},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:function(res){
          var c=res.data;
          if(c.code==1){
            var title="提交成功"
            wx.showToast({
              title,
              icon: "none"
            });
            //提交成功后要删除原来选中的数据
            //重新给cartList储存赋值
            var cartList=JSON.stringify(cartList1);
            wx.setStorageSync("cartList", cartList);
          }else{
            var title="提交失败"
            wx.showToast({
              title,
              icon: "none"
            })
            return ;
          }
         
        //提交成功后跳转到订单页
          wx.navigateTo({
          url: '../order/order',
          })
      }
    })

    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
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
    var result = wx.getStorageSync("cartList");
    //console.log(result);
    var cartList = JSON.parse(result);
    //console.log(cartList); //返回值当中的guiGeChiMa是一个选择商品的类型数组。
    this.setData({
      cartList
    })
  //总价依赖于this
    var tatol_count = app.tatolAll(this);//获取商品总价，和选中了几个品牌
    this.setData({
      tatol:tatol_count[1],
      checkAllList: tatol_count[0] == this.data.cartList.length && tatol_count[0]!=0 ? true : false
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