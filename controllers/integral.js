// const rp = require('request-promise')
// const axios = require('axios')
const lhl_DBBASE = require('../models/lhl_integral')
const db = require('../db')
module.exports = function(router) {
	router.get('/integral/total', async (ctx) => {


		var openid = ctx.request.headers["x-wx-openid"];

		let res = await lhl_DBBASE.findOne({
			attributes: {
				//排除之前没有字段
				exclude: ['id', 'createdAt', 'updatedAt', 'version']
			},
			where: {
				openid
			}
		})
		ctx.response.body = {
			code: 200,
			data: res
		}


	})
	// router.get('/user/getopenid', async (ctx) => {
	// 	console.log(ctx.query)
	// 	var {
	// 		openid
	// 	} = ctx.query;
	// })
	return router;
}
