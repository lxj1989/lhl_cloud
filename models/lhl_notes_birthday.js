const db = require('../db')

module.exports = db.defineModel('AtUser', {
	userId: {
		type: db.ID,
		references: {
			model: 'UserRegister',
			key: 'userId'
		}
	},

})
