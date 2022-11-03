const db = require('../db')

module.exports = db.defineModel('lhl_jieri_detail', {
	_id: db.STRING(),
	health: db.TEXT(),
	image: db.TEXT(),
	introduce: db.TEXT(),
	name: db.STRING(),
	origin: db.TEXT(),
	pid: db.STRING(),
	sanhou: db.TEXT(),
	tedian: db.TEXT(),
	times: db.STRING(),
	xisu: db.TEXT(),
	yangsheng: db.TEXT(),
	yinshi: db.TEXT(),
	yuyi: db.TEXT(),
})
