// const rp = require('request-promise')
// const axios = require('axios')
module.exports = function(router) {
	router.post('/liu/fanyi', async (ctx) => { // 首页
		// console.log(ctx.request.body)
		// const clientId = 'R2K4mdcgdmG0okoznyXZSiYu'
		// const clientSecret = 'aXts0latpO9G0nIFfzOjHbNLeFXujknG'
		// let _wxUrl = `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
		// let result = await rp(_wxUrl)
		// let _result = JSON.parse(result)
		// let access_token = _result.access_token;

		//    var {q,from ,to,termIds=""} = ctx.request.body

		// var data = {
		// 	q,
		// 	from,
		// 	to,
		// 	termIds
		// }
		// let _wxUrl1 = `https://aip.baidubce.com/rpc/2.0/mt/texttrans-with-dict/v1?access_token=${access_token}`
		// let options = {
		// 	url: _wxUrl1,
		// 	method: 'POST',
		//  //  headers:{ //需要啥传啥 我列了几个常用的，不需要删除即可
		// 	// "content-type": "application/json", //编码类型 不同的content-type传递方式不相同 下面传参时会介绍
		//  // },
		// 	data: data,
		// };

		// let result1 = await axios(options)

		ctx.response.body = {
			code: 1,
			data: 2
		}
	})
	return router;
}

// module.exports = {
// 3.挂载路由

// }
