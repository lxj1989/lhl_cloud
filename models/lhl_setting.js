const db = require('../db')

module.exports = db.defineModel('lhl_setting', {
	bazi: db.STRING(),
})
