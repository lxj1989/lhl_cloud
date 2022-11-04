const fs = require('fs')
const db = require('./db')
const path = require('path')
let files = fs.readdirSync(path.join(__dirname, '/models'))
let jsFiles = files.filter(f => {
	return f.endsWith('.js')
})

module.exports = {}

for (let f of jsFiles) {
	let name = f.substring(0, f.length - 3)
	// module.exports[name] = require(path.join(__dirname, '/models/', f))
	module.exports['lhl_feedback'] = require(path.join(__dirname, '/models/', 'lhl_feedback.js'))

}

module.exports.sync = () => {
	db.sync()
}
