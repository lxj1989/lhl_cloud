const db = require('../db')

module.exports = db.defineModel('lhl_jiejia', {
	_id: db.STRING(),
	date: db.STRING(),
	status: db.STRING()
})
