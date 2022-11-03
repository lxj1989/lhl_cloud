const db = require('../db')

module.exports = db.defineModel('lhl_calendar_day', {
	_id: db.STRING(),
	animalsYear: db.STRING(),
	avoid: db.STRING(),
	date: db.STRING(),
	desc: db.STRING(),
	holiday: db.STRING(),
	lunar: db.STRING(),
	lunarYear: db.STRING(),
	suit: db.STRING(),
	weekday: db.STRING(),
	yearMonth: db.STRING()
})
