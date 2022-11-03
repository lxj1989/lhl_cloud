// const rp = require('request-promise')
// const axios = require('axios')
const lhl_DBBASE = require('../models/lhl_dujitang')

var config = require("../utils/config");
var intf = require("../utils/interface");
const db = require('../db')
const Sequelize = require('sequelize')
const {
	Op
} = require("sequelize");
module.exports = function(router) {
	//老黄历页面
	router.get('/index/dujitang', async (ctx) => {
		// var {
		// 	date
		// } = ctx.query;

		//先调用接口查询
		var data1 = {
			key: config.tianKey[0]
		}
		var res1 = await intf.get_interface(config.tianUrl[0] + 'dujitang/index', data1);
		//查到了 查询数据库是否存在，不存在存入数据库
		if (res1.code == 200) {
			var data = res1.newslist[0]
			// var data = {
			// 	content: "我发现我挺能哄女孩睡觉的，只要我一发信息，女孩就说我要睡觉了。"
			// }
			const id = db.generateId()
			data._id = id;
			data.id = db.generateId();


			var str = data.content.substring(0, 6);
			let res = await lhl_DBBASE.findOne({
				attributes: {
					//排除之前没有字段
					exclude: ['id', 'createdAt', 'updatedAt', 'version']
				},
				where: {
					content: {
						[Op.like]: `%${str}%`
					}
				},
			})
			if (!res) {
				const res3 = await lhl_DBBASE.create(data)
			}

			ctx.response.body = {
				code: 200,
				data: data
			}
		} else {

			let res = await lhl_DBBASE.findOne({
				attributes: {
					//排除之前没有字段
					exclude: ['id', 'createdAt', 'updatedAt', 'version']
				},
				order: [Sequelize.literal('rand()')]
			})
			ctx.response.body = {
				code: 200,
				data: res
			}
		}
	})

	return router;
}
