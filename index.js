const Koa = require("koa");
const Router = require("koa-router");
const logger = require("koa-logger");
const bodyParser = require("koa-bodyparser");
const fs = require("fs");
const path = require("path");
const app = new Koa();
const static = require('koa-static-router');

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


// 小程序调用，获取微信 Open ID
router.get("/api/wx_openid", async (ctx) => {
	if (ctx.request.headers["x-wx-source"]) {
		ctx.body = ctx.request.headers["x-wx-openid"];
	}
});

//加载所有路由
controller(router);


//总路由装载所有子路由 //目的是加前缀，结果有更简单的
// let router1 = new Router();
// router1.use('/lhl', router.routes(), router.allowedMethods());

app
	.use(logger())
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


const port = process.env.PORT || 3301;
async function bootstrap() {
	// await initDB();
	app.listen(port, () => {
		console.log("启动成功", port);
	});
}

bootstrap();
