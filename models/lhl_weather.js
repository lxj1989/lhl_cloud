const db = require('../db')

module.exports = db.defineModel('lhl_weather_day', {
	_id: db.STRING(),
	id: {
		type: db.STRING(50),
		primaryKey: true, //主键
		aotuIncrement: true //自增长
	},
	date: db.STRING(),
	city: db.STRING(),
	type: db.STRING(),
	content: db.TEXT(),
})
