const request = require('./axios.js')

// module.exports = function post_interface(url, data) {
// 	return request({
// 		url: url,
// 		method: 'post',
// 		data
// 	})
// }

// module.exports = function get_interface(url, query) {
// 	return request({
// 		url: url,
// 		method: 'get',
// 		params: query
// 	})
// }

var config = {
	post_interface(url, data) {
		return request({
			url: url,
			method: 'post',
			data
		})
	},
	get_interface(url, query) {
		return request({
			url: url,
			method: 'get',
			params: query
		})
	}
}

module.exports = config
