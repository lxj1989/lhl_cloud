const db = require('../db')

module.exports = db.defineModel('lhl_icon', {
	_id: db.STRING(),
	icon: db.STRING(),
	integral: db.STRING()
})
