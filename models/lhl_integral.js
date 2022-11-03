const db = require('../db')

module.exports = db.defineModel('lhl_integral_total', {
	_id: db.STRING(),
	integral: db.STRING(),
	openid: db.STRING(),
})
