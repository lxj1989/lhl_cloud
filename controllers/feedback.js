// const rp = require('request-promise')
// const axios = require('axios')
const lhl_DBBASE = require('../models/lhl_feedback')
const db = require('../db')
const {
	Op
} = require("sequelize");
module.exports = function(router) {

	router.post('/feedback/add', async (ctx) => {
		var {
			data
		} = ctx.request.body;

		const id = db.generateId()
		data._id = id;
		data.time = db.serverDate();
		data.id = db.generateId();
		const res = await lhl_DBBASE.create(data)
		ctx.response.body = {
			code: 200,
			data: res
		}
	})


	return router;
}
