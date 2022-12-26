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
	/**
	 * @api {GET} /lhl/lhl/day/query 黄历信息
	 * @apiDescription 黄历信息
	 * @apiName 黄历信息接口
	 * @apiGroup HUANGLI
	 * @apiSuccess {json} result
	 * @apiSuccessExample {json} Success-Response:
	 *  {
	 *		"code":200,
	 *		"data":{
	 *			chongsha: "马日冲(戊子)鼠"
				festival: ""
				fitness: "日值月破 大事不宜"
				gregoriandate: "2022-12-07"
				id: "fb0ed311-75d5-11ed-b60d-b1950a3c59db"
				jianshen: "破"
				jieqi: "大雪"
				lmonthname: "仲冬"
				lubarmonth: "十一月"
				lunar_festival: ""
				lunardate: "2022-11-14"
				lunarday: "十四"
				pengzu: "甲不开仓 午不苫盖"
				shengxiao: "虎"
				shenwei: "喜神：东北 福神：正北 财神：东北阳贵：西南 阴贵：东北 "
				suisha: "岁煞北"
				taboo: "日值月破 大事不宜"
				taishen: "占在门,碓须忌,厨灶莫相干胎神在房内北停留5天"
				tiangandizhiday: "甲午"
				tiangandizhimonth: "壬子"
				tiangandizhiyear: "壬寅"
				wuxingjiazi: "金"
				wuxingnamonth: "桑松木"
				wuxingnayear: "金箔金"
				xingsu: "西方参水猿-凶"
				_id: "fb0ed310-75d5-11ed-b60d-b1950a3c59db"
	 *		}
	 *	}
	 *  @apiSuccessExample {json} Error-Response:
	 *  {
	 *      "code" : 1,
	 *      "msg" : '获取失败'
	 *  }
	 * @apiSampleRequest http://localhost:3301/lhl/lhl/day/query?date=2022-12-07
	 * @apiVersion 1.0.0
	 * 
	 *
	 */
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
