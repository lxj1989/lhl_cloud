const rp = require('request-promise')
// const axios = require('axios')
const lhl_DBBASE = require('../models/lhl_user')
const db = require('../db')
const config = require('../utils/config')

module.exports = function(router) {

	router.get('/user/getopenid1', async (ctx) => {
		var url =
			`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.APPID}&secret=${config.secret}`
		let res2 = await rp(url)
		let _r = JSON.parse(res2)
		ctx.response.body = {
			code: 200,
			data: _r
		}
	})
	return router;
}
