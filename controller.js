const fs = require('fs')
const path = require('path')


function addControllers(router, dir) {
	var files = fs.readdirSync(path.join(__dirname, dir))
	var jsFile = files.filter(f => {
		return f.endsWith('.js')
	})

	for (let f of jsFile) {
		let mapping = require(path.join(__dirname, dir, f))
		mapping(router)
	}
}



module.exports = function(router) {
	let controllersDir = 'controllers'
	// let router = require('koa-router')()
	addControllers(router, controllersDir)
	return router.routes()
}
