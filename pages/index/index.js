//index.js
//获取应用实例
const app = getApp();
const config = require('../../config/config');

Page({
    data: {
        curIndex: 0,                // 当前序号
        articles: [],               // 展示的文章
        page: 0,                    // 当前第几页
        perPage: config.perPage,    // 
    },
    clickIndex: function(e) {
        let index = e.target.dataset.id - 0;

        this.setData({
            curIndex: index
        });
    },
    onLoad: function () {
        this.getArticles();
    },
    getArticles: function() {
        let url = 'http://127.0.0.1:3001/wp-json/wp/v2/posts' + '?status=publish&page=' + (this.data.page + 1) + '&per_page=' + this.data.perPage;

        wx.request({
            url,
            success: (data) => {
                let info = [];

                data.data.forEach((item) => {
                    info.push({
                        title: item.title.rendered,     // 标题
                        author: item.author,            // 作者
                        content: item.content.rendered, // 文章内容
                        modified: item.modified,        // 修改时间
                        excerpt: item.excerpt.rendered, // 简介
                        id: item.id,                    // 文章id号
                    });
                });
            }
        })
    }
})
