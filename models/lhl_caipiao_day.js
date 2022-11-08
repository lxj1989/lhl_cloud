const db = require('../db')

module.exports = db.defineModel('lhl_caipiao_day', {
	_id: db.STRING(),
	date: db.STRING(),
	content: db.TEXT(),
	
})
