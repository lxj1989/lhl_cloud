const Koa = require("koa");
const Router = require("koa-router");
const logger = require("koa-logger");
const bodyParser = require("koa-bodyparser");
const fs = require("fs");
const path = require("path");
const app = new Koa();
// const {
// 	init: initDB,
// 	Counter
// } = require("./db");
const controller = require('./controller')

const router = new Router();

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

//总路由装载所有子路由
let router1 = new Router();
router1.use('/lhl', router.routes(), router.allowedMethods());

app
	.use(logger())
	.use(bodyParser())
	.use(router1.routes())
	.use(router1.allowedMethods())

const port = process.env.PORT || 3301;
async function bootstrap() {
	// await initDB();
	app.listen(port, () => {
		console.log("启动成功", port);
	});
}
bootstrap();
