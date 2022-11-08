const fs = require('fs')
const path = require('path')
const {
	handleSetToken
} = require('./access_token')

async function addSchedule(dir) {
	var files = fs.readdirSync(path.join(__dirname, dir))
	var jsFile = files.filter(f => {
		return f.startsWith('sc_') && f.endsWith('.js')
	})
	for (let f of jsFile) {
		let mapping = require(path.join(__dirname, dir, f))
		await mapping()
	}
}




module.exports = async function() {
	let controllersDir = '../schedule/'
	await handleSetToken();
	addSchedule(controllersDir);
}
