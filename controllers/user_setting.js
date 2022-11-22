const lhl_DBBASE = require('../models/lhl_user_setting')
const db = require('../db')
module.exports = function(router) {
	router.post('/user/setting/add', async (ctx) => {
		var data = ctx.request.body;
		var openid = ctx.request.headers["x-wx-openid"];
		var sdata = {
			openid
		}
		data.openid = openid;
		data._id = db.generateId4();
		data.id = db.generateId4();

		const [user, created] = await lhl_DBBASE.findOrCreate({
			attributes: {
				//排除之前没有字段
				exclude: ['id', 'createdAt', 'updatedAt', 'version']
			},
			where: sdata,
			defaults: data
		});
		if (created) {
			return ctx.response.body = {
				code: 200,
				data: user,
				created: created
			}
		}
		const user2 = await lhl_DBBASE.update(data, {
			'where': sdata
		})
		return ctx.response.body = {
			code: 200,
			data: user2,
		}

	})
	router.post('/user/setting/query', async (ctx) => {
		var openid = ctx.request.headers["x-wx-openid"];
		if (!openid) {
			return ctx.response.body = {
				code: 500,
				data: '用户未授权',
			}
		}
		let res2 = await lhl_DBBASE.findOne({
			attributes: {
				//排除之前没有字段
				exclude: ['id', 'createdAt', 'updatedAt', 'version']
			},
			where: {
				openid
			},
		})
		return ctx.response.body = {
			code: 200,
			data: res2,
		}

	})
	return router;
}
