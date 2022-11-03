const rp = require('request-promise')
// const axios = require('axios')
const lhl_DBBASE = require('../models/lhl_caipiao_day')
const db = require('../db')
var config = require("../utils/config");
// var intf = require("../utils/interface");
module.exports = function(router) {
	router.get('/caipiao/types/list', async (ctx) => {
		var {
			date
		} = ctx.query;
		if (!date) {
			const dates = new Date()
			const Y = dates.getFullYear() // 年
			const M = (dates.getMonth() + 1).toString().padStart(2, '0');
			const D = dates.getDate().toString().padStart(2, '0');
			date = `${Y}-${M}-${D}`

		}

		let res = await lhl_DBBASE.findOne({
			attributes: {
				//排除之前没有字段
				exclude: ['id', 'createdAt', 'updatedAt', 'version']
			},
			where: {
				date
			}
		})
		if (res) {
			ctx.response.body = {
				code: 200,
				data: res
			}
		} else {
			var url =
				`${config.juheUrl[0]}lottery/types?key=${config.juheKey[4]}`;
			let res1 = await rp(url)
			let _result = JSON.parse(res1)
			if (_result.error_code == 0) {
				let [...lists] = _result.result;

				// lists.forEach(async r => {
				// 	var url =
				// 		`${config.juheUrl[0]}lottery/query?key=${config.juheKey[4]}&lottery_id=${r.lottery_id}`;
				// 	let res2 = await rp(url)
				// 	let _r = JSON.parse(res2)
				// 	r.info = _r.result;
				// })


				function fnList(list) {
					return new Promise(async (resolve, reject) => {
						let newData = [];
						for (let i = 0; i < list.length; i++) {
							var o = list[i];
							var url =
								`${config.juheUrl[0]}lottery/query?key=${config.juheKey[4]}&lottery_id=${o.lottery_id}`;
							let res2 = await rp(url)
							let _r = JSON.parse(res2)
							o.info = _r.result;
							newData.push(o)
						}

						resolve(newData)
					})
				}
				var s = await fnList(lists)
				var data = {
					date,
					_id: db.generateId(),
					id: db.generateId(),
					content: JSON.stringify(s)
				}
				const res3 = await lhl_DBBASE.create(data)

				ctx.response.body = {
					code: 200,
					data: res3
					// data: {
					// 	date,
					// 	data: res3
					// }
				}
			} else {
				ctx.response.body = {
					code: 500,
					msg: '请稍后再试'
				}
			}

		}

	})
	router.get('/caipiao/lottery/history', async (ctx) => {
		var {
			lottery_id,
			page_size = 50,
			page
		} = ctx.query;

		var url =
			`${config.juheUrl[0]}lottery/history?key=${config.juheKey[4]}&lottery_id=${lottery_id}&page_size=${page_size}&${page}`;
		let res1 = await rp(url)
		let _result = JSON.parse(res1)
		if (_result.error_code == 0) {
			ctx.response.body = {
				code: 200,
				data: _result.result.lotteryResList
			}
		} else {
			ctx.response.body = {
				code: 200,
				data: '请稍后再试！'
			}
		}

	})

	return router;
}
