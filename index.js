const Koa = require("koa");
const cors = require('koa2-cors')
const Router = require("koa-router");
const logger = require("koa-logger");
const bodyParser = require("koa-bodyparser");
const fs = require("fs");
const path = require("path");
const app = new Koa();
//配置 cors 的中间件 
app.use(
	cors({
		origin: function(ctx) { //设置允许来自指定域名请求
			return 'http://localhost:8080'; //只允许http://localhost:8080这个域名的请求
		},
		maxAge: 5, //指定本次预检请求的有效期，单位为秒。
		credentials: true, //是否允许发送Cookie
		allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
		allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'x-api-token'], //设置服务器支持的所有头信息字段
		exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
	})
)
const static = require('koa-static-router');
const restify = require('./utils/rest').restify
app.use(restify())
const controller = require('./controller')
const schedule = require('./schedule/index')
schedule()

//前缀
const router = new Router({
	prefix: '/lhl'
});

const homePage = fs.readFileSync(path.join(__dirname, "index.html"), "utf-8");
// 首页
router.get("/", async (ctx) => {
	ctx.body = homePage;
});
// 具体参数我们在后面进行解释



//这里可以记录请求接口
// app.use(async (ctx, next) => {
// 	console.log(`请求接口--${ctx.request.url},请求类型--${ctx.request.method },请求值--${JSON.stringify(ctx.query) || JSON.stringify(ctx.request.body)}`)
// 	await next()
// })

// // 小程序调用，获取微信 Open ID
// router.all("/api/wx_openid", async (ctx) => {
// 	if (ctx.request.headers["x-wx-source"]) {
// 		ctx.body = ctx.request.headers["x-wx-openid"];
// 	}
// });


//加载所有路由
controller(router);


//总路由装载所有子路由 //目的是加前缀，结果有更简单的
// let router1 = new Router();
// router1.use('/lhl', router.routes(), router.allowedMethods());
// 使用 koa-logger 中间件
app.use(logger((str, args) => {
	// 请求方法、请求原始url、请求状态码、请求响应时间、响应内容大小
	//str= GET /lhl/images/img.png 200 17ms 92.8kb
	// console.log(str);
	// console.log(args);
}))
app
	.use(bodyParser())
	.use(router.routes())
	.use(router.allowedMethods())

// 单个路由
app.use(static({
	dir: './public',
	router: '/lhl/' //路由长度 =1
}))
// //多个路由
// app.use(static([
//     {
//         dir:'public',    //静态资源目录对于相对入口文件index.js的路径
//         router:'/public/image/'   //路由命名   路由长度 =2
//     },{
//         dir:'static',   //静态资源目录对于相对入口文件index.js的路径
//         router:'/static/image/'    //路由命名  路由长度 =2
//     }
// ]))

// app.on('error', err => {
// 	logger.error(err);
// });

const port = process.env.PORT || 3301;
async function bootstrap() {
	// await initDB();
	app.listen(port, () => {
		console.log("启动成功", port);
	});
}

bootstrap();
