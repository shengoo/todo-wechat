//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.showNavigationBarLoading();
    // 登录
    console.log('wx.login')
    wx.login({
      success: res => {console.log(res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //发起网络请求
          wx.request({
            url: `https://api.qsmttech.cn/wechat/common/jscode2session`,
            data: {
              code: res.code,
              appid: 'wx8160814f8957a587'
            },
            success: res => {
              console.log(res);
              wx.hideNavigationBarLoading();
              if (res.statusCode >= 200 && res.statusCode < 300) {
                var openid = res.data.openid;
                var session_key = res.data.session_key;
                this.globalData.openid = openid;
                if (this.openidReadyCallback) {
                  this.openidReadyCallback(openid)
                }
              } else {

              }
            },
            fail: () => {
              console.log('fail')
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
    console.log('getUserInfo1')
    wx.getUserInfo({
      success: res => {
        console.log(res)
        this.globalData.userInfo = res.userInfo
        
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
      }
    })
    wx.checkSession({
      success: function () {
        //session 未过期，并且在本生命周期一直有效
        console.log('checkSession success')
      },
      fail: function () {
        //登录态过期
        console.log('wx.login')
        wx.login() //重新登录
        console.log('checkSession fail')
      }
    })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     console.log(res)
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       console.log('getUserInfo2')
    //       wx.getUserInfo({
    //         success: res => {console.log(res)
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
    userInfo: null,
    openid: null,
  }
})