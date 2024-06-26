const rp = require('request-promise')
// const axios = require('axios')
const lhl_DBBASE = require('../models/lhl_user')
const db = require('../db')
const config = require('../utils/config')
module.exports = function(router) {
	router.post('/user/add', async (ctx) => {
		var {
			userInfo
		} = ctx.request.body;
		var openid = ctx.request.headers["x-wx-openid"];
		var sdata = {
			openid
		}
		userInfo.openid = openid;
		userInfo._id = db.generateId4();
		userInfo.userid = db.generateId4();
		userInfo.time = db.serverDate();
		userInfo.id = db.generateId4();

		const [user, created] = await lhl_DBBASE.findOrCreate({
			attributes: {
				//排除之前没有字段
				exclude: ['id', 'createdAt', 'updatedAt', 'version']
			},
			where: sdata,
			defaults: userInfo
		});
		ctx.response.body = {
			code: 200,
			data: user,
			created: created
		}

		// var {
		// 	userInfo
		// } = ctx.request.body;
		// var openid = ctx.request.headers["x-wx-openid"];

		// var sdata = {
		// 	openid
		// }
		// let res2 = await lhl_DBBASE.findOne({
		// 	attributes: {
		// 		//排除之前没有字段
		// 		exclude: ['id', 'createdAt', 'updatedAt', 'version']
		// 	},
		// 	where: sdata
		// })
		// if (res2) {
		// 	ctx.response.body = {
		// 		code: 200,
		// 		data: res2
		// 	}
		// } else {

		// 	userInfo.openid = openid;
		// 	userInfo._id = db.generateId4();
		// 	userInfo.userid = db.generateId4();
		// 	userInfo.time = db.serverDate();
		// 	userInfo.id = db.generateId4();

		// 	lhl_DBBASE.create(userInfo).then(res => {
		// 		ctx.response.body = {
		// 			code: 200,
		// 			data: res
		// 		}
		// 	}).catch(err => {
		// 		ctx.response.body = {
		// 			code: 200,
		// 			data: err
		// 		}
		// 	})

		// }

	})
	router.post('/user/list', async (ctx) => { // 首页
		var {
			title,
			page = 1,
			limit = 10
		} = ctx.request.body;
		// var openid = ctx.request.headers["x-wx-openid"];
		// var limit = 1000;
		// var page = 1;
		var sdata = {}
		if (title) sdata.nickName = {
			[Op.like]: '%' + title + '%'
		}
		// departments: {
		// 	[Op.like]: `%${depInfo.id}%`
		// }
		let {
			count,
			rows
		} = await lhl_DBBASE.findAndCountAll({
			attributes: {
				//排除之前没有字段
				exclude: ['id', 'createdAt', 'updatedAt', 'version']
			},
			limit: limit,
			offset: (Number(page) - 1) * limit,
			where: sdata,
		})
		// ctx.response.body = {
		// 	code: 200,
		// 	list: res2
		// }
		ctx.rest({
			list: rows,
			total: count
		})
	})
	router.get('/user/getopenid', async (ctx) => {
		var {
			code
		} = ctx.query;

		var url =
			`https://api.weixin.qq.com/sns/jscode2session?appid=${config.APPID}&secret=${config.secret}&js_code=${code}&grant_type=authorization_code}`;
		let res2 = await rp(url)
		let _r = JSON.parse(res2)
		ctx.response.body = {
			code: 200,
			data: _r
		}
	})
	return router;
}
