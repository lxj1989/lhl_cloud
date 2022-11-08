const db = require('../db')

module.exports = db.defineModel('lhl_notes', {
	_id: db.STRING(),
	date: db.STRING(),
	openid: db.STRING(),
	remark: db.STRING(),
	guanxi: db.STRING(),
	time: db.STRING(),
	title: db.STRING(),
	// type: db.STRING()
	type: {
		type: db.STRING(),
		allowNull: true,
		defaultValue: '', // 默认,没有为0
		comment: '1记事本，2日程，3生日，4纪念日'
	},
})
