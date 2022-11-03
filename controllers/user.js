// const rp = require('request-promise')
// const axios = require('axios')
const lhl_DBBASE = require('../models/lhl_user')
const db = require('../db')
module.exports = function(router) {
	router.post('/user/add', async (ctx) => {

		var {
			userInfo
		} = ctx.request.body;
		var openid = ctx.request.headers["x-wx-openid"];

		var sdata = {
			openid
		}
		let res2 = await lhl_DBBASE.findAll({
			attributes: {
				//排除之前没有字段
				exclude: ['id', 'createdAt', 'updatedAt', 'version']
			},
			limit: 100,
			// offset: (Number(page) - 1) * limit,
			where: sdata,
		})
		if (res2.length > 0) {
			ctx.response.body = {
				code: 200,
				list: res2
			}
		} else {
			const id = db.generateId()

			userInfo.openid = openid;
			userInfo._id = id;
			userInfo.userid = db.generateId();
			userInfo.time = db.serverDate();
			// userInfo.id = '';
			// userInfo.createdAt = '';
			// userInfo.updatedAt = '';
			// userInfo.version = '';
			const newUser = await lhl_DBBASE.create(userInfo)
			ctx.response.body = {
				code: 200,
				data: newUser
			}
		}

	})
	router.get('/user/getopenid', async (ctx) => {
		console.log(ctx.query)
		var {
			openid
		} = ctx.query;
	})
	return router;
}
