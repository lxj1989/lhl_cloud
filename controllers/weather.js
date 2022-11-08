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
	//老黄历页面
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
				city: city
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


				await lhl_DBBASE.create(data)
				ctx.response.body = {
					code: 200,
					now: res2.now
				}
			}

		}
	})

	return router;
}
