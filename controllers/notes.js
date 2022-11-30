// const rp = require('request-promise')
// const axios = require('axios')
const lhl_DBBASE = require('../models/lhl_notes')
const db = require('../db')
const {
	Op
} = require("sequelize");
module.exports = function(router) {
	router.post('/notes/list', async (ctx) => { // 首页
		var {
			title,
			date
		} = ctx.request.body;
		var openid = ctx.request.headers["x-wx-openid"];
		var limit = 1000;
		var page = 1;
		var sdata = {
			openid: openid,

		}
		if (date) sdata.date = date;
		if (title) sdata.title = {
			[Op.like]: '%' + title + '%'
		}
		// departments: {
		// 	[Op.like]: `%${depInfo.id}%`
		// }
		let res2 = await lhl_DBBASE.findAll({
			attributes: {
				//排除之前没有字段
				exclude: ['id', 'createdAt', 'updatedAt', 'version']
			},
			limit: limit,
			// offset: (Number(page) - 1) * limit,
			where: sdata,
		})
		ctx.response.body = {
			code: 200,
			list: res2
		}
	})
	router.post('/notes/add', async (ctx) => {
		var {
			data
		} = ctx.request.body;
		var openid = ctx.request.headers["x-wx-openid"];
		if (!openid) {
			return ctx.response.body = {
				code: 500,
				list: '请先登录'
			}
		} else {
			const id = db.generateId()

			data.openid = openid;
			data._id = id;
			data.time = db.serverDate();
			data.id = db.generateId();
			if (!data.guanxi) {
				data.guanxi = 0
			}
			// userInfo.createdAt = '';
			// userInfo.updatedAt = '';
			// userInfo.version = '';
			const res = await lhl_DBBASE.create(data)
			ctx.response.body = {
				code: 200,
				data: res
			}
		}
	})
	router.get('/notes/queryById', async (ctx) => {
		var {
			_id
		} = ctx.query;
		var openid = ctx.request.headers["x-wx-openid"];
		if (!openid) {
			return ctx.response.body = {
				code: 500,
				list: '请先登录'
			}
		}
		let res = await lhl_DBBASE.findOne({
			attributes: {
				//排除之前没有字段
				exclude: ['id', 'createdAt', 'updatedAt', 'version']
			},
			where: {
				_id
			},
		})
		ctx.response.body = {
			code: 200,
			data: res
		}
	})
	router.post('/notes/update', async (ctx) => {
		var {
			data
		} = ctx.request.body;
		var openid = ctx.request.headers["x-wx-openid"];
		if (!openid) {
			return ctx.response.body = {
				code: 500,
				list: '请先登录'
			}
		}
		var userUpdate = await lhl_DBBASE.update(data, {
			'where': {
				'_id': data.id
			}
		})
		ctx.response.body = {
			code: 200,
			data: userUpdate,
			msg: '更新成功'
		}
	})
	router.post('/notes/delete', async (ctx) => {
		var {
			_id
		} = ctx.request.body;
		var openid = ctx.request.headers["x-wx-openid"];
		if (!openid) {
			return ctx.response.body = {
				code: 500,
				list: '请先登录'
			}
		}
		// 删除所有名为 "Jane" 的人 
		var res = await lhl_DBBASE.destroy({
			where: {
				'_id': _id
			}
		});
		if (res) {
			ctx.response.body = {
				code: 200,
				msg: '删除成功'
			}
		} else {
			ctx.response.body = {
				code: 500,
				msg: '删除失败，请稍后再试'
			}
		}

	})

	return router;
}
