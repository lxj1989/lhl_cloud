const db = require('../db')

module.exports = db.defineModel('lhl_lhl_detail', {
	_id: db.STRING(),
	chongsha: db.STRING(),
	festival: db.STRING(),
	gregoriandate: db.STRING(),
	jianshen: db.STRING(),
	jieqi: db.STRING(),
	lmonthname: db.STRING(),
	lubarmonth: db.STRING(),
	lunar_festival: db.STRING(),
	lunardate: db.STRING(),
	lunarday: db.STRING(),
	pengzu: db.STRING(),
	shengxiao: db.STRING(),
	shenwei: db.STRING(),
	suisha: db.STRING(),
	taboo: db.STRING(),
	taishen: db.STRING(),
	tiangandizhiday: db.STRING(),
	tiangandizhimonth: db.STRING(),
	tiangandizhiyear: db.STRING(),
	wuxingjiazi: db.STRING(),
	wuxingnamonth: db.STRING(),
	wuxingnayear: db.STRING(),
	fitness: db.STRING(),

	xingsu: db.STRING()
})
