function request(options) {
    console.log(options)
    return wx.request({
        url:options.url,
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        
      });
}
export default request;