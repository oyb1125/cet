// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  try{
    const result=await cloud.openapi.subscribeMessage.send({
      touser:event.openid,
      page:"pages/index/index",
      data:{
        thing1:{
          value:event.title
        },
        character_string2:{
          value:event.printTime
        }
      },
      templateId:'Xat1B7EKaYM9H9urI7fWeuYmu7-JUdbVPuz3fE6IXQ0'
    })
    console.log(result)
    return result
  }catch (err) {
    return err
  }
}