const db = require('../db')

module.exports = db.defineModel('lhl_user_setting', {
	_id: db.STRING(),
	openid: db.STRING(),
	content: {
		type: db.TEXT(),
		allowNull: true
	},

})
