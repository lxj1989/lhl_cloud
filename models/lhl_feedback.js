const db = require('../db')

module.exports = db.defineModel('lhl_feedback', {
	_id: db.STRING(),
	message: db.STRING(),
	nickName: db.STRING(),
	openid: db.STRING(),
	time: db.STRING(),
	userid: db.STRING()
})
