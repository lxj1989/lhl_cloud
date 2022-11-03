const db = require('../db')

module.exports = db.defineModel('lhl_user', {
	_id: db.STRING(),
	avatarUrl: db.STRING(),
	city: db.STRING(),
	country: db.STRING(),
	gender: db.STRING(),
	language: db.STRING(),
	nickName: db.STRING(),
	openid: db.STRING(),
	province: db.STRING(),
	time: db.STRING(),
	userid: db.STRING()
})
