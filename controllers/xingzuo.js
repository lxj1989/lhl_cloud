// const rp = require('request-promise')
// const axios = require('axios')
const lhl_DBBASE = require('../models/lhl_xingzuo')

const rp = require('request-promise')
var config = require("../utils/config");
// var intf = require("../utils/interface");
const db = require('../db')
module.exports = function(router) {
	//星座
	/**
	 * @api {GET} /lhl/index/xingzuo 星座
	 * @apiDescription 星座
	 * @apiName 星座接口
	 * @apiGroup XINGZUO
	 * @apiParam {String} consName 星座名称
	 * @apiParam {String} type 星座类型today,tomorrow,week,month,year
	 * @apiSuccess {json} result
	 * @apiSuccessExample {json} Success-Response:
	 *  {
	 * 		"code":200,
	 * 		"data":{
	 *			addTime: "20221207"
	 *			consName: "射手座"
	 *			content: "{"name":"射手座","date":"2022年","year":2022,"mima":{"info":"影响力逐渐增大","text":["进入2022年，你整体的重心和关注点会有所调整，你将会扩大自己的交际范围，并且注重在生活当中的沟通，也会更加的积极主动，去跟别人分享自己的一些想法，包括自己的一些社会价值观等等。因此，你的影响力会在今年逐渐增大，对于自媒体行业的小伙伴而言，你们爆红的几率也较大。射手座2022年可佩戴一个宙斯木星双环扣吉宏项链作为全年的幸运护身符饰物；项链由两个纯银的平安扣相互紧扣，项链上有“Zeus”字母，代表射手座的守护神众神之王宙斯，环扣上由射手座符号和守护星“木星”图案组成，一环扣一环的双环平安扣紧密相依，象征着坚韧不催的毅力和勇气，激励和守护着射手们在2022年里勇往直前、顺风顺水。"]},"career":["射手座们今年的运势尚可，已经工作了的射手们能够在人脉资源方面取得进展，而还在读书的小伙伴们也能较好推进手里的项目。但是在项目进展过程当中，还是会发生一些意外和挫折，在事业学业上的表现容易忽高忽低。不要担心，只要稳定好心态，一切都能水到渠成。"],"love":["今年对于射手座们而言是非常不错的一年，单身的朋友能够比较轻松地寻觅到属于自己的幸福缘分，而已经有伴的小伙伴们则需要平衡好感情与其他事务，凡事多考虑一下对方的感受，这样才能让你们之间的感情更稳固。"],"health":["一些射手座会遇到痤疮、痘痘等皮肤方面的问题，大家平时可以多多关注一下护肤，保持皮肤的健康。"],"finance":["射手们的财运在今年缓慢回升中。你们的眼光非常可靠，如果能够勇敢地尝试一下投资、理财的话，往往可以取得不错的成就。但在水逆期间的投资需要多加谨慎一些，否则行情的大起大落也是有可能的。射手座今年可佩戴一串金虎眼石独角兽宝懿手链来提升金钱指数，此手链由射手座今年的财富主石金虎眼石构成；其中男款宝石为彩曜石与金虎眼组合而成，女款宝石则为草莓晶与金虎眼组成；而独角兽乃高贵纯洁的象征，带来幸运和守护，使得射手们2022年能稳守财富，财气延绵。"],"luckeyStone":"摩根石","future":"","resultcode":"200","error_code":0}"
	 *			date: "2022年"
	 *			id: "de983dc1-75d0-11ed-b647-a9ea55619280"
	 *			types: "year"
	 *			id: "de983dc0-75d0-11ed-b647-a9ea55619280"
	 *		}
	 *	}
	 *  @apiSuccessExample {json} Error-Response:
	 *  {
	 *      "code" : 1,
	 *      "msg" : '获取失败'
	 *  }
	 * @apiSampleRequest http://localhost:3301/lhl/index/xingzuo?consName=%E5%B0%84%E6%89%8B%E5%BA%A7&type=year
	 * @apiVersion 1.0.0
	 * 
	 *
	 */
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
