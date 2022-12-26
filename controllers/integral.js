// const rp = require('request-promise')
// const axios = require('axios')
const lhl_DBBASE = require('../models/lhl_integral')
// const db = require('../db')
module.exports = function(router) {
	/**
	 * @api {GET} /lhl/integral/total 用户积分总数
	 * @apiDescription 用户积分总数
	 * @apiName 用户积分总数接口
	 * @apiGroup INTEGRAL
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
	 * @apiSampleRequest http://localhost:3301/lhl/integral/total
	 * @apiVersion 1.0.0
	 * 
	 *
	 */
	router.get('/integral/total', async (ctx) => {
		var openid = ctx.request.headers["x-wx-openid"];
		let res = await lhl_DBBASE.findOne({
			attributes: {
				//排除之前没有字段
				exclude: ['id', 'createdAt', 'updatedAt', 'version']
			},
			where: {
				openid
			}
		})
		// ctx.response.body = {
		// 	code: 200,
		// 	data: res
		// }
		ctx.rest({
			data: res
		})
	})
	return router;
}
