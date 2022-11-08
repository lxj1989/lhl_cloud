const axios = require('axios')
const service = axios.create({
	// baseURL: process.env.VUE_APP_BASE_API, // api url = base url + request url
	// baseURL: baseURL, // api url = base url + request url
	timeout: 20000 //  请求超时

})



// request拦截器
service.interceptors.request.use(
	config => {
		config.headers['Content-Type'] = 'application/json;charset=UTF-8';

		return config
	},
	error => {
		// 处理请求错误
		console.log(error) // for debug
		return Promise.reject(error)
	}
)

// response拦截器
service.interceptors.response.use(

	response => {
		// let isRefresh = response.config.url.endsWith('/refreshToken');
		const res = response.data
		/**
		 * code为非0是抛错 可结合自己业务进行修改
		 */
		if (res.code == 200) {
			return Promise.resolve(res);

		} else if (res.code === 401) {} else if (res.code !== 0) {
			return Promise.reject('error')
		}
	},
	error => {
		console.log('err-----', error)
		return Promise.reject(error)
	})

module.exports = service
