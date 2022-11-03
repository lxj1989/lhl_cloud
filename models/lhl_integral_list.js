const db = require('../db')

module.exports = db.defineModel('lhl_integral_list', {
	_id: db.STRING(),
	integral: db.STRING(),
	openid: db.STRING(),
	source: db.STRING(),
	time: db.STRING(),
	type: db.STRING()
})
