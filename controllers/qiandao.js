// const rp = require('request-promise')
// const axios = require('axios')
const lhl_DBBASE = require('../models/lhl_qiandao')
const lhl_DBBASE1 = require('../models/lhl_integral_list')
const lhl_DBBASE2 = require('../models/lhl_integral')

const db = require('../db')
const {
	Op
} = require("sequelize");
module.exports = function(router) {
	router.get('/user/qiandao/list', async (ctx) => { // 首页
		var openid = ctx.request.headers["x-wx-openid"];
		var limit = 1000;
		var page = 1;
		var sdata = {
			openid: openid,
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
	router.get('/user/qiandao/add', async (ctx) => {


		var {
			date,
		} = ctx.query;
		var openid = ctx.request.headers["x-wx-openid"];
		if (!openid) {
			return ctx.response.body = {
				code: 500,
				list: '请先登录'
			}
		} else {


			try {

				const result = await db.sequelize.transaction(async (t) => {

					var sdata = {
						openid: openid,
						date: date
					}
					const id = db.generateId()
					var data = {
						openid,
						date,
						_id: id,
						id: db.generateId(),
						time: db.serverDate()
					}
					const [user, created1] = await lhl_DBBASE.findOrCreate({
						attributes: {
							//排除之前没有字段
							exclude: ['id', 'createdAt', 'updatedAt', 'version']
						},
						where: sdata,
						defaults: data
					});
					if (!created1) {
						return ctx.response.body = {
							code: 500,
							list: '今日已签到'
						}
					}

					let integral = 5;
					var d1 = {
						_id: db.generateId(),
						id: db.generateId(),
						time: db.serverDate(),
						openid,
						integral,
						type: 1, //1添加，2减少,
						source: 1 //1签到
					}
					await lhl_DBBASE1.create(d1)
					// console.log('1---------------')
					var d2 = {
						openid,
						integral,
						id: db.generateId(),
						_id: db.generateId()
					}
					const [r2, created2] = await lhl_DBBASE2.findOrCreate({
						attributes: {
							//排除之前没有字段
							exclude: ['id', 'createdAt', 'updatedAt', 'version']
						},
						where: {
							openid: openid
						},
						defaults: d2
					});
					await lhl_DBBASE2.increment({
						integral: integral
					}, {
						where: {
							openid: openid
						}
					})


					ctx.response.body = {
						code: 200,
						list: '签到成功'
					}

				});


				// 如果执行到此行,则表示事务已成功提交,`result`是事务返回的结果
				// `result` 就是从事务回调中返回的结果(在这种情况下为 `user`)

			} catch (error) {
				ctx.response.body = {
					code: 500,
					list: error
				}
				// 如果执行到此,则发生错误.
				// 该事务已由 Sequelize 自动回滚！

			}


			// return
			// //查询今日是否签到
			// let res = await lhl_DBBASE.findOne({
			// 	attributes: {
			// 		//排除之前没有字段
			// 		exclude: ['id', 'createdAt', 'updatedAt', 'version']
			// 	},
			// 	where: {
			// 		// date: nowDate,
			// 		openid: openid,
			// 		date: date
			// 	},
			// })
			// //今日未签到
			// if (!res) {
			// 	const id = db.generateId()
			// 	var data = {
			// 		openid,
			// 		date,
			// 		_id: id,
			// 		id: db.generateId(),
			// 		time: db.serverDate()
			// 	}
			// 	const res1 = await lhl_DBBASE.create(data)
			// 	let integral = 5;
			// 	var d1 = {
			// 		_id: db.generateId(),
			// 		id: db.generateId(),
			// 		time: db.serverDate(),
			// 		openid,
			// 		integral,
			// 		type: 1, //1添加，2减少,
			// 		source: 1 //1签到
			// 	}
			// 	await lhl_DBBASE1.create(d1)

			// 	//获取总积分
			// 	let res3 = await lhl_DBBASE2.findOne({
			// 		attributes: {
			// 			//排除之前没有字段
			// 			exclude: ['id', 'createdAt', 'updatedAt', 'version']
			// 		},
			// 		where: {
			// 			openid: openid,
			// 		},
			// 	})
			// 	if (res3)
			// 		await lhl_DBBASE2.increment({
			// 			integral: integral
			// 		}, {
			// 			where: {
			// 				openid: openid
			// 			}
			// 		})
			// 	else
			// 		var d2 = {
			// 			openid,
			// 			integral,
			// 			id: db.generateId(),
			// 			_id: db.generateId()
			// 		}
			// 	await lhl_DBBASE2.create(d1)

			// 	ctx.response.body = {
			// 		code: 200,
			// 		list: '签到成功'
			// 	}
			// } else { //今日已签到
			// 	ctx.response.body = {
			// 		code: 200,
			// 		list: '今日已签到'
			// 	}
			// }
		}
	})


	return router;
}
