const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}
/**
 * 格式化后端传来的数据
 * @param {String} str 时间戳
 */
function dateFormat (str) {
    return str.split('T').join(' ');
}

/**
 * 过滤标签中含有的字符串
 * @param {String} str 含有标签的字符串
 */
function filterTag(str) {
    return str.replace(/<[\/\!]*[^<>]*>/ig, "").replace(/[\r\n]/g,"");
}

/**
 * 获取当前时间，输出如 2019年3月14号 21:17
 */
function getNowTime() {
    let date = new Date(),
        str = '';

    str += date.getFullYear() + '年';
    str += date.getMonth() + 1 + '月';
    str += date.getDate() + '日 ';

    str += date.getHours() + ':';
    str += date.getMinutes();

    return str;
}

module.exports = {
    formatTime,
    dateFormat,
    filterTag,
    getNowTime,
}
