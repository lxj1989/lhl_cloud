const db = require('../db')

module.exports = db.defineModel('lhl_dujitang', {
	_id: db.STRING(),
	content: db.STRING()
})
