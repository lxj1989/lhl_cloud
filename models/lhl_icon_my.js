const db = require('../db')

module.exports = db.defineModel('lhl_icon_my', {
	_id: db.STRING(),
	icon_id: db.STRING(),
	icon: db.STRING(),
	openid: db.STRING(),
	integral: db.STRING()
})
