// pages/admin/sendMsg/print/print.js
const db=wx.cloud.database()
let title=''
let printTime=''
let users=[]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  getTitle(e){
    title=e.detail.value
  },
  getPrintTime(e){
    printTime=e.detail.value
  },
  empower(){
    wx.requestSubscribeMessage({
      tmplIds: ['Xat1B7EKaYM9H9urI7fWeuYmu7-JUdbVPuz3fE6IXQ0'],
      success(res){
        console.log('授权成功！',res)
      },
      fail(res){
        console.log('授权失败！',res)
      }
    })
  },

  //发送打印提醒
  sendMsg2(){
    wx.cloud.callFunction({
      name:'queryAllOpenid',
      success:res=>{
        console.log("查询所有openID",res)
        users=res.result.data
        users.forEach(item=>{
          wx.cloud.callFunction({
            name:"sendMsg2",
            data:{
              openid:item.openid,
              title:title,
              printTime:printTime
            }
          }).then(res=>{
            console.log("推送消息成功",res)
          }).catch(res=>{
            console.log("推送消息失败",res)
          })
        })
      }
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