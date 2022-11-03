const db = require('../db')

module.exports = db.defineModel('lhl_index_detail', {
	_id: db.STRING(),
	baiji: db.STRING(),
	ji: db.STRING(),
	chongsha: db.STRING(),
	jishen: db.STRING(),
	wuxing: db.STRING(),
	xiongshen: db.STRING(),
	yangli: db.STRING(),
	yi: db.STRING(),
	yinli: db.STRING()
})
