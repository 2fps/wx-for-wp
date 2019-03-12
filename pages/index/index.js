//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        curIndex: 0,        // 当前序号
    },
    clickIndex: function(e) {
        let index = e.target.dataset.id - 0;

        this.setData({
            curIndex: index
        });
    },
    onLoad: function () {
        wx.request({
            url: 'http://127.0.0.1:3001/wp-json/wp/v2/pages',
            success: function(data) {  
                console.log(data);
            }
        })
    }
})
