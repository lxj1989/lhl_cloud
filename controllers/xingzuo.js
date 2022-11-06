// const rp = require('request-promise')
// const axios = require('axios')
const lhl_DBBASE = require('../models/lhl_xingzuo')

const rp = require('request-promise')
var config = require("../utils/config");
var intf = require("../utils/interface");
const db = require('../db')
module.exports = function(router) {
	//星座
	router.get('/index/xingzuo', async (ctx) => {
		var {
			consName,
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
				addTime: nowDate,
				types: type,
				consName: consName
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

			var url =
				`${config.juheUrl[1]}constellation/getAll?consName=${encodeURI(consName)}&type=${type}&key=${config.juheKey[2]}`;
			let res1 = await rp(url)
			let _result = JSON.parse(res1)


			if (_result.error_code == 0) {
				// console.log('res1--', res1)
				var data = {
					content: res1,
					consName: consName
				}
				const id = db.generateId()
				data._id = id;
				data.id = db.generateId();
				data.addTime = nowDate;
				data.types = type;
				data.date = _result.date;


				const res3 = await lhl_DBBASE.create(data)
				ctx.response.body = {
					code: 200,
					data: res3
				}
			}
		}
	})





	return router;
}
