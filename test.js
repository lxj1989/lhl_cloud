const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');

//子路由
let home = new Router();
home.get('/jspang', async (ctx) => {
	ctx.body = "Home JSPang";
}).get('/todo', async (ctx) => {
	ctx.body = 'Home ToDo';
})

//子路由
let page = new Router();
page.get('/jspang', async (ctx) => {
	ctx.body = "Page JSPang";
}).get('/todo', async (ctx) => {
	ctx.body = 'Page ToDo';
})

//总路由装载所有子路由
let router = new Router();
router.use('/home', home.routes(), home.allowedMethods());
router.use('/page', page.routes(), page.allowedMethods());

//加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
	console.log('[demo] server is starting at port 3000');
});
