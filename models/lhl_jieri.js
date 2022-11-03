const db = require('../db')

module.exports = db.defineModel('lhl_jieri', {
	_id: db.STRING(),
	name: db.STRING(),
	show: db.STRING(),
	type: db.STRING(),
})
