const db = require('../db')

module.exports = db.defineModel('lhl_notes', {
	_id: db.STRING(),
	date: db.STRING(),
	openid: db.STRING(),
	remark: db.STRING(),
	time: db.STRING(),
	title: db.STRING(),
	type: db.STRING()
})
