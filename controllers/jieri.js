// const rp = require('request-promise')
// const axios = require('axios')
const lhl_DBBASE = require('../models/lhl_jieri')
const lhl_DBBASE1 = require('../models/lhl_jiejia')
const lhl_DBBASE2 = require('../models/lhl_jieri_detail')
const db = require('../db')
const {
	Op
} = require("sequelize");
module.exports = function(router) {
	/**
	 * @api {GET} /lhl/jieri/query 节日
	 * @apiDescription 节日
	 * @apiName 节日接口
	 * @apiGroup JIERI
	 * @apiParam {String} show 显示1
	 * @apiSuccess {json} result
	 * @apiSuccessExample {json} Success-Response:
	 *  {
	 * 		"code":200,
	 * 		"data":[
	 *			{
	 *				date: "2022-04-02"
	 *				status: "2"
	 *				_id: "d2fe6f20624d52f105329d665b846e99"
	 *			}
	 *		]
	 *	}
	 *  @apiSuccessExample {json} Error-Response:
	 *  {
	 *      "code" : 1,
	 *      "msg" : '获取失败'
	 *  }
	 * @apiSampleRequest http://localhost:3301/lhl/jieri/query?show=1
	 * @apiVersion 1.0.0
	 * 
	 *
	 */
	router.get('/jieri/query', async (ctx) => { // 首页

		var {
			show
		} = ctx.query;
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
				show
			},
		})

		ctx.rest(res)
	})

	/**
	 * @api {GET} /lhl/jiejia/query 节假日
	 * @apiDescription 节假日
	 * @apiName 节假日接口
	 * @apiGroup JIERI
	 * @apiSuccess {json} result
	 * @apiSuccessExample {json} Success-Response:
	 *  {
	 * 		"code":200,
	 * 		"data":[
	 *			{
	 *				date: "2022-04-02"
	 *				status: "2"
	 *				_id: "d2fe6f20624d52f105329d665b846e99"
	 *			}
	 *		]
	 *	}
	 *  @apiSuccessExample {json} Error-Response:
	 *  {
	 *      "code" : 1,
	 *      "msg" : '获取失败'
	 *  }
	 * @apiSampleRequest http://localhost:3301/lhl/jiejia/query
	 * @apiVersion 1.0.0
	 * 
	 *
	 */
	router.get('/jiejia/query', async (ctx) => { // 首页

		// var year = new Date().getFullYear();
		var page = 1;
		var limit = 1000;
		let res = await lhl_DBBASE1.findAll({
			limit: limit,
			attributes: {
				//排除之前没有字段
				exclude: ['id', 'createdAt', 'updatedAt', 'version']
			},
			offset: (Number(page) - 1) * limit,
			// where: {
			// 	date: {
			// 		[Op.like]: `%${year}%`
			// 	}
			// },
		})

		ctx.response.body = {
			code: 200,
			data: res
		}
	})


	router.post('/jiejia/setting', async (ctx) => { // 首页
		var {
			date,
			status
		} = ctx.request.body;

		if (status == 3) {
			var res2 = await lhl_DBBASE1.destroy({
				where: {
					date: date
				}
			})
			ctx.rest(res2)
			return
		}

		let res = await lhl_DBBASE1.findOne({
			attributes: {
				//排除之前没有字段
				exclude: ['id', 'createdAt', 'updatedAt', 'version']
			},
			where: {
				date: date
			},
		})
		var res2 = null
		var data = {
			date: date,
			status: status
		}
		if (res) {
			res2 = await lhl_DBBASE1.update(data, {
				where: {
					date: date
				}
			})
		} else {
			data._id = db.generateId();
			data.id = db.generateId();
			res2 = await lhl_DBBASE1.create(data)
		}
		ctx.rest(res2)
	})


	router.get('/jieri/queryInfo', async (ctx) => {
		var {
			pid
		} = ctx.query;
		let res = await lhl_DBBASE2.findOne({
			attributes: {
				//排除之前没有字段
				exclude: ['id', 'createdAt', 'updatedAt', 'version']
			},
			where: {
				pid
			},
		})
		ctx.response.body = {
			code: 200,
			data: res
		}
	})


	return router;
}
