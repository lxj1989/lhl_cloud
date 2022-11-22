// const rp = require('request-promise')
// const axios = require('axios')
const db = require('../db')
const lhl_DBBASE = require('../models/lhl_icon')
const lhl_DBBASE1 = require('../models/lhl_icon_my')

const lhl_DBBASE3 = require('../models/lhl_integral_list')
const lhl_DBBASE2 = require('../models/lhl_integral')

module.exports = function(router) {
	router.get('/pifu/icon-list/query', async (ctx) => { // 首页

		// var {
		// 	show
		// } = ctx.query;
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
				// show
			},
		})

		ctx.response.body = {
			code: 200,
			data: res
		}
	})

	//兑换
	router.post('/pifu/user/add', async (ctx) => {
		var {
			_id
		} = ctx.request.body;
		var openid = ctx.request.headers["x-wx-openid"];
		//查询图标
		let res = await lhl_DBBASE.findOne({
			attributes: {
				//排除之前没有字段
				exclude: ['id', 'createdAt', 'updatedAt', 'version']
			},
			where: {
				_id
			},
		})
		if (!res) {
			return ctx.response.body = {
				code: 500,
				data: '解锁失败，请重试！',
			}
		}
		//查询个人总积分
		let res2 = await lhl_DBBASE2.findOne({
			attributes: {
				//排除之前没有字段
				exclude: ['id', 'createdAt', 'updatedAt', 'version']
			},
			where: {
				openid
			},
		})
		//如果总积分小于消费金额
		if (res2.integral < res.integral) {
			return ctx.response.body = {
				code: 500,
				data: '积分不足，请坚持签到获取',
			}
		}
		try {
			const result = await db.sequelize.transaction(async (t) => {
				var sdata = {
					openid: openid,
					_id: db.generateId4(),
					id: db.generateId4(),
					icon: res.icon,
					icon_id: _id,
					integral: res.integral
				}
				//创建个人购买记录
				const [res1, created] = await lhl_DBBASE1.findOrCreate({
					attributes: {
						//排除之前没有字段
						exclude: ['id', 'createdAt', 'updatedAt', 'version']
					},
					where: {
						icon_id: _id,
						openid: openid
					},
					defaults: sdata
				});
				if (!created) {
					return ctx.response.body = {
						code: 500,
						data: '已解锁',
					}
				}


				//修改总积分
				// decrement 递减
				// increment 递增
				await lhl_DBBASE2.decrement({
					integral: res.integral
				}, {
					where: {
						openid: openid
					}
				})
				//添加积分修改记录
				var d1 = {
					_id: db.generateId(),
					id: db.generateId(),
					time: db.serverDate(),
					openid,
					integral: -res.integral,
					type: 2, //1添加，2减少,
					source: 1 //1签到
				}
				await lhl_DBBASE3.create(d1)


				ctx.response.body = {
					code: 200,
					data: res,
					created: created
				}
			});
		} catch (e) {
			console.log('333333333', e)
			//TODO handle the exception
		}
	})

	//获取已兑换
	router.get('/pifu/icon-list/yiduihuan', async (ctx) => { // 首页
		var openid = ctx.request.headers["x-wx-openid"];
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
				openid
			},
		})

		ctx.response.body = {
			code: 200,
			data: res
		}
	})
	return router;
}
