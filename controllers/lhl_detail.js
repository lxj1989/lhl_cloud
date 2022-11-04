// const rp = require('request-promise')
// const axios = require('axios')
const lhl_DBBASE = require('../models/lhl_lhl_detail')
const lhl_DBBASE1 = require('../models/lhl_index_detail')
const lhl_DBBASE2 = require('../models/lhl_calendar_day')

const rp = require('request-promise')
var config = require("../utils/config");
var intf = require("../utils/interface");
const db = require('../db')
module.exports = function(router) {
	//老黄历页面
	router.get('/lhl/day/query', async (ctx) => {
		var {
			date
		} = ctx.query;

		//查询数据库是否存在
		let res = await lhl_DBBASE.findOne({
			attributes: {
				//排除之前没有字段
				exclude: ['id', 'createdAt', 'updatedAt', 'version']
			},
			where: {
				gregoriandate: date
			},
		})
		// 如果存在,直接返回
		if (res) {
			ctx.response.body = {
				code: 200,
				data: res
			}
		} else {
			//不存在就请求api，再存入数据库返回
			var data1 = {
				date,
				key: config.tianKey[0]
			}
			var res1 = await intf.get_interface(config.tianUrl[0] + 'lunar/index', data1)
			// console.log('res1--', res1)
			if (res1.code == 200) {
				// console.log('res1--', res1)
				var data = res1.newslist[0]
				const id = db.generateId()
				data._id = id;
				data.id = db.generateId();
				const res3 = await lhl_DBBASE.create(data)
				ctx.response.body = {
					code: 200,
					data: res3
				}
			}
		}
	})


	//首页老黄历页面
	router.get('/lhl/index/query', async (ctx) => {
		var {
			date
		} = ctx.query;

		//查询数据库是否存在
		let res = await lhl_DBBASE1.findOne({
			attributes: {
				//排除之前没有字段
				exclude: ['id', 'createdAt', 'updatedAt', 'version']
			},
			where: {
				yangli: date
			},
		})
		// 如果存在,直接返回
		if (res) {
			ctx.response.body = {
				code: 200,
				data: res
			}
		} else {
			//不存在就请求api，再存入数据库返回
			var data1 = {
				date,
				key: config.juheKey[0]
			}
			// var res1 = await intf.get_interface(config.juheDomain + 'laohuangli/d', data1)
			let res1 = await rp(
				`${config.juheDomain}laohuangli/d?date=${date}&key=${config.juheKey[0]}`)
			let _result = JSON.parse(res1)
			if (_result.error_code == 0) {
				// console.log('res1--', res1)
				var data = _result.result
				const id = db.generateId()
				data._id = id;
				data.id = db.generateId();
				const res3 = await lhl_DBBASE1.create(data)
				ctx.response.body = {
					code: 200,
					data: res3
				}
			}
		}
	})

	//首页万年历
	router.get('/lhl/index/calendarDay', async (ctx) => {
		var {
			date
		} = ctx.query;

		//查询数据库是否存在
		let res = await lhl_DBBASE2.findOne({
			attributes: {
				//排除之前没有字段
				exclude: ['id', 'createdAt', 'updatedAt', 'version']
			},
			where: {
				date: date
			},
		})
		// 如果存在,直接返回
		if (res) {
			ctx.response.body = {
				code: 200,
				data: res
			}
		} else {
			//不存在就请求api，再存入数据库返回
			var data1 = {
				date,
				key: config.juheKey[0]
			}
			// var res1 = await intf.get_interface(config.juheDomain + 'laohuangli/d', data1)
			let res1 = await rp(
				`${config.juheDomain}calendar/day?date=${date}&key=${config.juheKey[1]}`)


			let _result = JSON.parse(res1)
			if (_result.error_code == 0) {
				// console.log('res1--', res1)
				var data = _result.result.data;
				const id = db.generateId()
				data._id = id;
				data.yearMonth = data['year-month']
				data.id = db.generateId();
				const res3 = await lhl_DBBASE2.create(data)
				ctx.response.body = {
					code: 200,
					data: res3
				}
			}
		}
	})


	return router;
}
