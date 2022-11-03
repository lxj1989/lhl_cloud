// const rp = require('request-promise')
// const axios = require('axios')
const lhl_DBBASE = require('../models/lhl_jieri')
const lhl_DBBASE1 = require('../models/lhl_jiejia')
const lhl_DBBASE2 = require('../models/lhl_jieri_detail')
const {
	Op
} = require("sequelize");
module.exports = function(router) {
	router.get('/jieri/query', async (ctx) => { // 首页

		var {
			show
		} = ctx.query;
		console.log(show)
		var page = 1;
		var limit = 1000;
		let res = await lhl_DBBASE.findAll({
			limit: limit,
			attributes: {
				//排除之前没有字段
				exclude: ['id', 'createdAt', 'updatedAt', 'version']
			},
			offset: (Number(page) - 1) * limit,
			where: {
				show
			},
		})

		ctx.response.body = {
			code: 200,
			data: res
		}
	})
	router.get('/jiejia/query', async (ctx) => { // 首页

		var year = new Date().getFullYear();
		var page = 1;
		var limit = 1000;
		let res = await lhl_DBBASE1.findAll({
			limit: limit,
			attributes: {
				//排除之前没有字段
				exclude: ['id', 'createdAt', 'updatedAt', 'version']
			},
			offset: (Number(page) - 1) * limit,
			where: {
				date: {
					[Op.like]: `%${year}%`
				}
			},
		})

		ctx.response.body = {
			code: 200,
			data: res
		}
	})
	router.get('/jieri/queryInfo', async (ctx) => {
		var {
			pid
		} = ctx.query;
		let res = await lhl_DBBASE2.findOne({
			attributes: {
				//排除之前没有字段
				exclude: ['id', 'createdAt', 'updatedAt', 'version']
			},
			where: {
				pid
			},
		})
		ctx.response.body = {
			code: 200,
			data: res
		}
	})


	return router;
}

// module.exports = {
// 3.挂载路由

// }
