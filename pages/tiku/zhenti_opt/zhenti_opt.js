// pages/tiku/zhenti_opt/zhenti_opt.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list4:[
      ["2019年12月CET4第一套","https://6365-cet-cloud-18hwz-1301709814.tcb.qcloud.la/%E7%9C%9F%E9%A2%98/CET4/2019%E5%B9%B412%E6%9C%88%E5%9B%9B%E7%BA%A7%E7%9C%9F%E9%A2%98%E7%AC%AC%E4%B8%80%E5%A5%97.pdf?sign=39cdbd594cb49595017c9c80f06bae0b&t=1592038121"],
      ["2019年12月CET4第二套","https://6365-cet-cloud-18hwz-1301709814.tcb.qcloud.la/%E7%9C%9F%E9%A2%98/CET4/2019%E5%B9%B412%E6%9C%88%E5%9B%9B%E7%BA%A7%E7%9C%9F%E9%A2%98%E7%AC%AC%E4%BA%8C%E5%A5%97.pdf?sign=2f3c629d2995c01cd51c1c306bfd6f73&t=1592038139"],
      ["2019年12月CET4第三套","https://6365-cet-cloud-18hwz-1301709814.tcb.qcloud.la/%E7%9C%9F%E9%A2%98/CET4/2019%E5%B9%B412%E6%9C%88%E5%9B%9B%E7%BA%A7%E7%9C%9F%E9%A2%98%E7%AC%AC%E4%BA%8C%E5%A5%97.pdf?sign=8f46fbbe16373f948f0d79274d613eeb&t=1592038153"],
      ["2019年6月CET4第一套", "https://6365-cet-cloud-18hwz-1301709814.tcb.qcloud.la/%E7%9C%9F%E9%A2%98/CET4/2019%E5%B9%B46%E6%9C%88%E5%9B%9B%E7%BA%A7%E7%9C%9F%E9%A2%98%E7%AC%AC%E4%B8%80%E5%A5%97.pdf?sign=b9333b543ac7bfd9dedb5dc40444607b&t=1592040191"],
      ["2019年6月CET4第二套", "https://6365-cet-cloud-18hwz-1301709814.tcb.qcloud.la/%E7%9C%9F%E9%A2%98/CET4/2019%E5%B9%B46%E6%9C%88%E5%9B%9B%E7%BA%A7%E7%9C%9F%E9%A2%98%E7%AC%AC%E4%BA%8C%E5%A5%97.pdf?sign=02be8df9d281307b1d97f101dc970887&t=1592040510"],
      ["2019年6月CET4第三套", "https://6365-cet-cloud-18hwz-1301709814.tcb.qcloud.la/%E7%9C%9F%E9%A2%98/CET4/2019%E5%B9%B46%E6%9C%88%E5%9B%9B%E7%BA%A7%E7%9C%9F%E9%A2%98%E7%AC%AC%E4%B8%89%E5%A5%97.pdf?sign=babb7ec16fb9f598723b3134a9c035af&t=1592040643"],
      ["2018年6月CET4第一套", "https://6365-cet-cloud-18hwz-1301709814.tcb.qcloud.la/%E7%9C%9F%E9%A2%98/CET4/2018%E5%B9%B46%E6%9C%88%E5%9B%9B%E7%BA%A7%E7%9C%9F%E9%A2%98%E7%AC%AC%E4%B8%80%E5%A5%97.pdf?sign=4b10a02c372aef59af85e18a62b64aa1&t=1592040708"],
      ["2018年6月CET4第二套", "https://6365-cet-cloud-18hwz-1301709814.tcb.qcloud.la/%E7%9C%9F%E9%A2%98/CET4/2018%E5%B9%B46%E6%9C%88%E5%9B%9B%E7%BA%A7%E7%9C%9F%E9%A2%98%E7%AC%AC%E4%BA%8C%E5%A5%97.pdf?sign=1894fa98152f31d19177991f27f64b3b&t=1592040722"],
      ["2018年6月CET4第三套", "https://6365-cet-cloud-18hwz-1301709814.tcb.qcloud.la/%E7%9C%9F%E9%A2%98/CET4/2018%E5%B9%B46%E6%9C%88%E5%9B%9B%E7%BA%A7%E7%9C%9F%E9%A2%98%E7%AC%AC%E4%B8%89%E5%A5%97.pdf?sign=a499d3a001b6f72125e6306502ef455f&t=1592040735"],
      ["2017年12月CET4第一套", "https://6365-cet-cloud-18hwz-1301709814.tcb.qcloud.la/%E7%9C%9F%E9%A2%98/CET4/2017%E5%B9%B412%E6%9C%88%E5%9B%9B%E7%BA%A7%E7%9C%9F%E9%A2%98%E7%AC%AC%E4%B8%80%E5%A5%97.pdf?sign=f8a51bc3486b71003efb6fbb57f4091b&t=1592040934"],
      ["2017年12月CET4第二套", "https://6365-cet-cloud-18hwz-1301709814.tcb.qcloud.la/%E7%9C%9F%E9%A2%98/CET4/2017%E5%B9%B412%E6%9C%88%E5%9B%9B%E7%BA%A7%E7%9C%9F%E9%A2%98%E7%AC%AC%E4%BA%8C%E5%A5%97.pdf?sign=0dd287368e0868457a33bdd6f1df4ba2&t=1592040950"],
      ["2017年12月CET4第三套", "https://6365-cet-cloud-18hwz-1301709814.tcb.qcloud.la/%E7%9C%9F%E9%A2%98/CET4/2017%E5%B9%B412%E6%9C%88%E5%9B%9B%E7%BA%A7%E7%9C%9F%E9%A2%98%E7%AC%AC%E4%B8%89%E5%A5%97.pdf?sign=133adf8aa77cfa9b9d2b7a425bf62aa4&t=1592040962"],

    ],
    list6:[
      ["2019年12月CET6第一套", "https://6365-cet-cloud-18hwz-1301709814.tcb.qcloud.la/%E7%9C%9F%E9%A2%98/CET6/2019%E5%B9%B412%E6%9C%88CET6%E7%AC%AC%E4%B8%80%E5%A5%97.pdf?sign=7857027638f068448b88cb77bba0f2d8&t=1592042287"],
      ["2019年12月CET6第二套", "https://6365-cet-cloud-18hwz-1301709814.tcb.qcloud.la/%E7%9C%9F%E9%A2%98/CET6/2019%E5%B9%B412%E6%9C%88CET6%E7%AC%AC%E4%BA%8C%E5%A5%97.pdf?sign=be310efd445cb2096734a80de9f531b9&t=1592042303"],
      ["2019年12月CET6第三套", "https://6365-cet-cloud-18hwz-1301709814.tcb.qcloud.la/%E7%9C%9F%E9%A2%98/CET6/2019%E5%B9%B412%E6%9C%88CET6%E7%AC%AC%E4%B8%89%E5%A5%97.pdf?sign=296a2cb40cb38934801daddc8eea3458&t=1592042317"],
      ["2019年6月CET6第一套", "https://6365-cet-cloud-18hwz-1301709814.tcb.qcloud.la/%E7%9C%9F%E9%A2%98/CET6/2019%E5%B9%B46%E6%9C%88%E5%85%AD%E7%BA%A7%E7%9C%9F%E9%A2%98%E7%AC%AC%E4%B8%80%E5%A5%97.pdf?sign=6e530fcce636a30fa8969d238f8969b5&t=1592042342"],
      ["2019年6月CET6第二套", "https://6365-cet-cloud-18hwz-1301709814.tcb.qcloud.la/%E7%9C%9F%E9%A2%98/CET6/2019%E5%B9%B46%E6%9C%88%E5%85%AD%E7%BA%A7%E7%9C%9F%E9%A2%98%E7%AC%AC%E4%BA%8C%E5%A5%97.pdf?sign=b812420eea206f16be2b29f64d2d72ec&t=1592042366"],
      ["2019年6月CET6第三套", "https://6365-cet-cloud-18hwz-1301709814.tcb.qcloud.la/%E7%9C%9F%E9%A2%98/CET6/2019%E5%B9%B46%E6%9C%88%E5%85%AD%E7%BA%A7%E7%9C%9F%E9%A2%98%E7%AC%AC%E4%B8%89%E5%A5%97.pdf?sign=fa386eceafadd1b60caa56c115a85bb7&t=1592042381"],
      ["2018年6月CET6第一套", "https://6365-cet-cloud-18hwz-1301709814.tcb.qcloud.la/%E7%9C%9F%E9%A2%98/CET6/2018%E5%B9%B46%E6%9C%88%E7%AC%AC1%E5%A5%97.pdf?sign=ec72900650717992f335f711617b533a&t=1592042466"],
      ["2018年6月CET6第二套", "https://6365-cet-cloud-18hwz-1301709814.tcb.qcloud.la/%E7%9C%9F%E9%A2%98/CET6/2018%E5%B9%B46%E6%9C%88%E7%AC%AC2%E5%A5%97.pdf?sign=60a4b19324b1e618cc050a87399c3ad0&t=1592042484"],
      ["2018年6月CET6第三套", "https://6365-cet-cloud-18hwz-1301709814.tcb.qcloud.la/%E7%9C%9F%E9%A2%98/CET6/2018%E5%B9%B46%E6%9C%88%E7%AC%AC3%E5%A5%97.pdf?sign=5101a1de4d1a071155b21d3aca063808&t=1592042506"],
      ["2017年12月CET6第一套", "https://6365-cet-cloud-18hwz-1301709814.tcb.qcloud.la/%E7%9C%9F%E9%A2%98/CET6/2017%E5%B9%B412%E6%9C%88%E8%8B%B1%E8%AF%AD%E5%85%AD%E7%BA%A7%E8%80%83%E8%AF%95%E7%9C%9F%E9%A2%98%EF%BC%88%E5%8D%B7%E4%B8%80%EF%BC%89.pdf?sign=351bc4781a84663192c1e48014ff7231&t=1592042525"],
      ["2017年12月CET6第二套", "https://6365-cet-cloud-18hwz-1301709814.tcb.qcloud.la/%E7%9C%9F%E9%A2%98/CET6/2017%E5%B9%B412%E6%9C%88%E8%8B%B1%E8%AF%AD%E5%85%AD%E7%BA%A7%E8%80%83%E8%AF%95%E7%9C%9F%E9%A2%98%EF%BC%88%E5%8D%B7%E4%BA%8C%EF%BC%89.pdf?sign=1b8faedfe14cf75eababac49434cae1f&t=1592042542"],
      ["2017年12月CET6第三套", "https://6365-cet-cloud-18hwz-1301709814.tcb.qcloud.la/%E7%9C%9F%E9%A2%98/CET6/2017%E5%B9%B412%E6%9C%88%E8%8B%B1%E8%AF%AD%E5%85%AD%E7%BA%A7%E8%80%83%E8%AF%95%E7%9C%9F%E9%A2%98%EF%BC%88%E5%8D%B7%E4%B8%89%EF%BC%89.pdf?sign=03684191b89b2d01425e97b13a81b447&t=1592042554"],

    ]
  },
  zhenti:function(e){
    console.log(e.currentTarget.dataset)
    var that=this
    wx.showLoading({
      title: '下载中，请稍后...',
    })
    if(that.data.type=='CET4'){
      wx.downloadFile({
        url: that.data.list4[e.currentTarget.dataset.id][1],
        success(res) {
          wx.hideLoading()
          const filepath = res.tempFilePath
          console.log(res)
          wx.openDocument({
            filePath: filepath,
            success(res) {
              console.log("打开文件成功")
            },
            fail: console.error
          })
        },
        fail: console.error
      })
      downloadTask.onProgressUpdate(function (res) {
        that.setData({
          percent: res.progress
        })
      })
    }else{
      wx.downloadFile({
        url: that.data.list6[e.currentTarget.dataset.id][1],
        success(res) {
          wx.hideLoading()
          const filepath = res.tempFilePath
          console.log(res)
          wx.openDocument({
            filePath: filepath,
            success(res) {
              console.log("打开文件成功")
            },
            fail: console.error
          })
        },
        fail: console.error
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.type
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