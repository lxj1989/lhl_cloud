const db = require('../db')

module.exports = db.defineModel('lhl_qiandao', {
	_id: db.STRING(),
	date: db.STRING(),
	openid: db.STRING(),
	time: db.STRING(),
})
