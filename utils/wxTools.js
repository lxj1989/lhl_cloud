var sha1 = require('sha1')
// 拼接字符串
function rawString(args) {
	let keys = Object.keys(args);
	keys = keys.sort()
	let newArgs = {}
	keys.forEach(function(key) {
		newArgs[key.toLowerCase()] = args[key]
	})
	let string = '';
	for (let k in newArgs) {
		string += '&' + k + '=' + newArgs[k]
	}
	return string.substr(1)
}

module.exports = {
	// 时间戳
	createTimestamp() {
		return parseInt(new Date().getTime() / 1000).toString()
	},

	// 随机字符串
	createNonceStr() {
		return Math.random().toString(36).substr(2, 15)
	},

	// 签名
	sign(url, wx) {
		return sha1(rawString({
			jsapi_ticket: wx.ticket,
			nonceStr: wx.noncestr,
			timestamp: wx.timestamp,
			url: url
		}))
	},

	//获取 时间格式
	getTime(str) {
		var date = null
		if (!str) {
			date = new Date()
		} else {
			date = new Date(str)
		}
		const Y = date.getFullYear() // 年
		const M = (date.getMonth() + 1).toString().padStart(2, '0');
		const D = date.getDate().toString().padStart(2, '0');
		var nowDate = `${Y}-${M}-${D}`
		return nowDate;
	}

}
