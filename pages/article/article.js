//index.js
//获取应用实例
const app = getApp();
const config = require('../../config/config');
const WxParse = require('../../utils/wxParse');

Page({
    data: {
        title: '',      // 标题
        content: ''     // 内容
    },
    onLoad: function (options) {
        let id = options.id,
            url = config.url + 'wp-json/wp/v2/posts/' + id;

        wx.request({
            url,
            success: (data) => {
                let title = data.data.title.rendered,
                    content = data.data.content.rendered;

                this.setData({
                    title
                });
                WxParse.wxParse('article', 'html', content, this, 5);
            }
        });
    }
})
