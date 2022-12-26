// const log4js = require('./logs.js')
const {
	logger,
	accessLogger,
	getLogger
} = require('./logs');
// const loggers = logger.getLogger();
module.exports = {
	APIError: function(code, message) {
		this.code = code || 'internal:unknown_error'
		this.message = message || ''
	},
	restify: (pathPrefix) => {
		pathPrefix = pathPrefix || '/lhl/'

		return async (ctx, next) => {

			if (ctx.request.path.startsWith(pathPrefix)) {
				ctx.rest = (data, code = 200) => {
					ctx.response.type = 'application/json'
					// console.log(ctx.request.method )
					// console.log(`请求接口--${ctx.request.method},请求类型--${ctx.request.method },req的值是:${JSON.stringify(data)}`)
					// getLogger('access').info(
					// 	`请求接口--${ctx.request.url},请求类型--${ctx.request.method },请求值--${JSON.stringify(ctx.query) || JSON.stringify(ctx.request.body)},req的值是:${JSON.stringify(data)}`
					// );
					ctx.response.body = {
						code: code,
						data
					}
				}
				try {
					await next()
				} catch (e) {
					logger.error(e);
					ctx.response.status = 200
					ctx.response.type = 'application/json'
					ctx.response.body = {
						code: e.code || 'internal:unknown_error',
						message: e.message || ''
					}
				}
			} else {
				await next()
			}
		}
	}
}
