//index.js
//获取应用实例
const app = getApp();
const config = require('../../config/config');
const util = require('../../utils/util');

Page({
    data: {
        curIndex: 0,                // 当前序号
        articles: [],               // 展示的文章
        page: 0,                    // 当前第几页
        perPage: config.perPage,    // 
        height: '10px',
        gridCol: 3,
        loadModal: false,           // 加载中遮挡框
    },
    clickIndex: function(e) {
        let index = e.currentTarget.dataset.id - 0;

        this.setData({
            curIndex: index
        });
    },
    onLoad: function () {
        this.setHeight();
        this.getArticles();
    },
    viewArticle: function(e) {
        let id = e.currentTarget.dataset.id - 0;

        wx.navigateTo({
            url: '../article/article?id=' + id
        });
    },
    getArticles: function() {
        let url = 'http://127.0.0.1:3001/wp-json/wp/v2/posts' + '?status=publish&page=' + (this.data.page + 1) + '&per_page=' + this.data.perPage;

        wx.request({
            url,
            success: (data) => {
                let info = [],
                    arts = this.data.articles;

                data.data.forEach((item) => {
                    info.push({
                        title: item.title.rendered,     // 标题
                        author: item.author,            // 作者
                        content: item.content.rendered, // 文章内容
                        modified: util.dateFormat(item.modified),        // 修改时间
                        excerpt: util.filterTag(item.excerpt.rendered), // 简介
                        id: item.id,                    // 文章id号
                    });
                });

                this.setData({
                    articles: [...arts, ...info],
                    loadModal: false
                });
            }
        });
    },
    /**
     * 根据用户id获取用户详细信息
     * @param {Number} userId 用户id
     */
    getUserInfo: function(userId) {
        let url = config.url + 'wp-json/wp/v2/users/' + userId;

        wx.request({
            url,
            success: (data) => {
                debugger;
            }
        });
    },
    /**
     * 设置container的高度
     */
    setHeight: function() {
        wx.getSystemInfo({
            success: (res) => {
                let height = res.windowHeight;

                this.setData({
                    height: height - 42 + 'px'
                });
            }
        });
    },
    /**
     * 滚动到底部触发
     */
    scrollToBottom: function() {
        let page = ++this.data.page;
        
        this.setData({
            page,
        }, () => {
            this.setData({
                loadModal: true
            });
            this.getArticles();
        });
    },
    gridchange: function (e) {
      this.setData({
        gridCol: e.detail.value
      });
    },
})
