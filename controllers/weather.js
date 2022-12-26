// const rp = require('request-promise')
// const axios = require('axios')
const lhl_DBBASE = require('../models/lhl_weather')

var config = require("../utils/config");
var intf = require("../utils/interface");
const db = require('../db')
// const request = require('request')
// const Sequelize = require('sequelize')

// const {
// 	Op
// } = require("sequelize");
module.exports = function(router) {


	router.get('/index/weather/day', async (ctx) => {
		var {
			city
		} = ctx.query;

		const date = new Date()
		const Y = date.getFullYear() // 年
		const M = (date.getMonth() + 1).toString().padStart(2, '0');
		const D = date.getDate().toString().padStart(2, '0');
		var nowDate = `${Y}${M}${D}`
		//查询数据库是否存在
		let res = await lhl_DBBASE.findOne({
			attributes: {
				//排除之前没有字段
				exclude: ['id', 'createdAt', 'updatedAt', 'version']
			},
			where: {
				// date: nowDate,
				date: nowDate,
				city: city,
				type: 1 || ""
			},
		})

		// 如果存在,直接返回
		if (res) {
			ctx.response.body = {
				code: 200,
				now: JSON.parse(res.content)
			}
		} else {
			//不存在就请求api，再存入数据库返回

			// var url =
			// 	`${config.juheUrl[1]}constellation/getAll?consName=${encodeURI(consName)}&type=${type}&key=${config.juheKey[2]}`;
			var url =
				`https://geoapi.qweather.com/v2/city/lookup?location=${encodeURI(city)}&key=${config.HfKey}`

			let res1 = await intf.get_interface(url, {})
			if (res1.code == 200) {
				var url1 =
					`https://devapi.qweather.com/v7/weather/now?location=${res1.location[0].id}&key=${config.HfKey}`
				let res2 = await intf.get_interface(url1, {})
				var data = {
					city: city,
					content: JSON.stringify(res2.now)
				}
				data._id = db.generateId();
				data.id = db.generateId();
				data.date = nowDate;
				data.type = '1d';


				await lhl_DBBASE.create(data)
				ctx.response.body = {
					code: 200,
					now: res2.now
				}
			}

		}
	})

	/**
	 * @api {GET} /index/weather/v7-day 7天天气
	 * @apiDescription 7天天气
	 * @apiName 7天天气接口
	 * @apiGroup WEATHER
	 * @apiParam {String} city 城市
	 * @apiParam {String} location 坐标
	 * @apiParam {String} type 天气类型：3d,7d,10d,15d,30d
	 * @apiSuccess {json} result
	 * @apiSuccessExample {json} Success-Response:
	 *  {
	 *		"code":200,
	 *		"data":{
	 *			integral: "940"
	 *			openid: "oEjYO0Z3ygbp9u95Xtkrm1l3lu0s"
	 *			_id: "efbc6d7162398608011cd7113c384695"
	 *		}
	 *	}
	 *  @apiSuccessExample {json} Error-Response:
	 *  {
	 *      "code" : 1,
	 *      "msg" : '获取失败'
	 *  }
	 * @apiSampleRequest http://localhost:3301/lhl/index/weather/v7-day
	 * @apiVersion 1.0.0
	 * 
	 *
	 */
	router.get('/index/weather/v7-day', async (ctx) => {
		var {
			city,
			location,
			type
		} = ctx.query;

		const date = new Date()
		const Y = date.getFullYear() // 年
		const M = (date.getMonth() + 1).toString().padStart(2, '0');
		const D = date.getDate().toString().padStart(2, '0');
		var nowDate = `${Y}${M}${D}`
		//查询数据库是否存在
		let res = await lhl_DBBASE.findOne({
			attributes: {
				//排除之前没有字段
				exclude: ['id', 'createdAt', 'updatedAt', 'version']
			},
			where: {
				// date: nowDate,
				date: nowDate,
				city: city,
				type: type
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

			// var url = `https://geoapi.qweather.com/v2/city/lookup?location=${encodeURI(city)}&key=${config.HfKey}`
			// let res1 = await intf.get_interface(url, {})
			// if (res1.code == 200) {
			// }
			var url1 =
				`https://devapi.qweather.com/v7/weather/${type}?location=${location}&key=${config.HfKey}`
			let res2 = await intf.get_interface(url1, {})
			var data = {
				city: city,
				content: JSON.stringify(res2)
			}
			data._id = db.generateId();
			data.id = db.generateId4();
			data.date = nowDate;
			data.type = type;


			await lhl_DBBASE.create(data)
			// ctx.response.body = {
			// 	code: 200,
			// 	now: res2.now
			// }
			ctx.rest(data)

		}
	})




	/**
	 * @api {GET} /index/weather/zhishu-day 天气指数
	 * @apiDescription 天气指数
	 * @apiName 天气指数接口
	 * @apiGroup WEATHER
	 * @apiParam {String} location 坐标
	 * @apiParam {String} city 城市
	 * @apiParam {String} type 指数类型：0
	 * @apiSuccess {json} result
	 * @apiSuccessExample {json} Success-Response:
	 *  {
	 *		"code":200,
	 *		"data":{
	 *			integral: "940"
	 *			openid: "oEjYO0Z3ygbp9u95Xtkrm1l3lu0s"
	 *			_id: "efbc6d7162398608011cd7113c384695"
	 *		}
	 *	}
	 *  @apiSuccessExample {json} Error-Response:
	 *  {
	 *      "code" : 1,
	 *      "msg" : '获取失败'
	 *  }
	 * @apiSampleRequest http://localhost:3301/lhl/index/weather/zhishu-day
	 * @apiVersion 1.0.0
	 * 
	 *
	 */
	router.get('/index/weather/zhishu-day', async (ctx) => {
		var {
			city,
			location,
			// type
		} = ctx.query;

		const date = new Date()
		const Y = date.getFullYear() // 年
		const M = (date.getMonth() + 1).toString().padStart(2, '0');
		const D = date.getDate().toString().padStart(2, '0');
		var nowDate = `${Y}${M}${D}`
		//查询数据库是否存在
		let res = await lhl_DBBASE.findOne({
			attributes: {
				//排除之前没有字段
				exclude: ['id', 'createdAt', 'updatedAt', 'version']
			},
			where: {
				// date: nowDate,
				date: nowDate,
				city: city,
				type: 'zhishu'
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

			// var url = `https://geoapi.qweather.com/v2/city/lookup?location=${encodeURI(city)}&key=${config.HfKey}`
			// let res1 = await intf.get_interface(url, {})
			// if (res1.code == 200) {
			// }
			var url1 =
				`https://devapi.qweather.com/v7/indices/1d?location=${location}&key=${config.HfKey}&type=0`
			let res2 = await intf.get_interface(url1, {})
			var data = {
				city: city,
				content: JSON.stringify(res2),
				type: 'zhishu'
			}
			data._id = db.generateId();
			data.id = db.generateId4();
			data.date = nowDate;


			await lhl_DBBASE.create(data)
			// ctx.response.body = {
			// 	code: 200,
			// 	now: res2.now
			// }


			ctx.rest(data)

		}
	})
	return router;
}
