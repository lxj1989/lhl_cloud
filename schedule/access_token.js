const schedule = require('node-schedule');
const config = require('../utils/config')
const rp = require('request-promise')
const fs = require('fs')
var url =
	`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.APPID}&secret=${config.secret}`


async function handleSetToken() {
	let res2 = await rp(url)
	let _r = JSON.parse(res2)
	_r.time = +new Date()
	if (_r.access_token) {
		return new Promise((reject, resolve) => {
			// 保存文件
			fs.writeFile('./schedule/json/wxConfig.json', JSON.stringify(_r), (err) => {
				if (!err) {

					fs.readFile('./schedule/json/wxConfig.json', 'utf-8', (error, data) => {
						// console.log('wxConfig文件写入成功：', data)
						resolve(data)
					})
				} else {
					// console.log('wxConfig文件写入失败：', err)
					reject(err)
				}
			})
		}).catch(() => {})
	}
}



async function handleGetToken() {
	return new Promise((resolve, reject) => {
		fs.readFile('./schedule/json/wxConfig.json', 'utf-8', (error, data) => {
			data = JSON.parse(data)
			// console.log('wxConfig文件读取成功：', data)
			resolve(data)
			// 判断是access_token否过期 2个小时过期
			if ((+new Date() - data.time) / 1000 / 3600 >= 1.8) {
				handleSetToken(url).then(res => {
					resolve(res)
				})
			}

		})
	}).catch(() => {})
}

module.exports = {
	// let rule = new schedule.RecurrenceRule();
	// rule.date = [1];//每月1号
	// rule.dayOfWeek = [1,3,5];每周一、周三、周五
	// rule.hour = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22]; // 每天12点开始推送
	// rule.minute = [0,5,10,15,20,25,30,35,40,45,50,55]; // 每隔 5 分钟执行一次
	// rule.second = 0;//每分钟的0秒执行

	// 每秒执行就是rule.second =[0,1,2,3......59]
	// 每分钟0秒执行就是rule.second =0
	// 每小时30分执行就是rule.minute =30;rule.second =0;
	// 每天0点执行就是rule.hour =0;rule.minute =0;rule.second =0;
	// ....
	// 每月1号的10点就是rule.date =1;rule.hour =10;rule.minute =0;rule.second =0;
	// 每周1，3，5的0点和12点就是rule.dayOfWeek =[1,3,5];rule.hour =[0,12];rule.minute =0;rule.second =0;

	// await handleSetToken();

	// 启动任务
	// let job = schedule.scheduleJob(rule, async () => {
	// 	await handleGetToken();
	// });

	handleSetToken,
	handleGetToken
}
