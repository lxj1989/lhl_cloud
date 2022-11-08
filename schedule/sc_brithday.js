const schedule = require('node-schedule');
const lhl_DBBASE = require('../models/lhl_notes')
// var intf = require("../utils/interface");
const db = require('../db')
const request = require('request')
const {
	handleGetToken
} = require('./access_token')
const {
	getTime
} = require('../utils/wxTools')

module.exports = async function() {

	let rule = new schedule.RecurrenceRule();
	// rule.date = [1];//每月1号
	// rule.dayOfWeek = [1,3,5];每周一、周三、周五
	rule.hour = [8]; // 每天12点开始推送
	rule.minute = [38]; // 每隔 5 分钟执行一次
	// rule.second = 0;//每分钟的0秒执行

	// 每秒执行就是rule.second =[0,1,2,3......59]
	// 每分钟0秒执行就是rule.second =0
	// 每小时30分执行就是rule.minute =30;rule.second =0;
	// 每天0点执行就是rule.hour =0;rule.minute =0;rule.second =0;
	// ....
	// 每月1号的10点就是rule.date =1;rule.hour =10;rule.minute =0;rule.second =0;
	// 每周1，3，5的0点和12点就是rule.dayOfWeek =[1,3,5];rule.hour =[0,12];rule.minute =0;rule.second =0;





	// console.log('res1--', res1)
	// 启动任务
	let job = schedule.scheduleJob(rule, () => {
		handleSendMsg()
	});
}

async function handleSendMsg() {
	let res2 = await lhl_DBBASE.findAll({
		attributes: {
			//排除之前没有字段
			exclude: ['id', 'createdAt', 'updatedAt', 'version']
		},
		limit: 1000,
		// offset: (Number(page) - 1) * limit,
		where: {
			type: 3,
			time: db.serverDate()
			// time: '2022-08-03T05:48:18.213Z'
		},
	})
	var aToken = await handleGetToken();
	var url =
		`https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=${aToken.access_token}`
	var data1 = {}
	for (let i = 0; i < res2.length; i++) {
		var v = res2[i];

		data1 = {
			"touser": v.openid,
			"template_id": "Er6_r0kt--pr64hBHOkmK_60wWsx2TdVrMOEb5htZ10",
			"page": "/pages/index/index",
			"miniprogram_state": "formal", //developer为开发版；trial为体验版；formal为正式版
			"lang": "zh_CN",
			"data": {
				thing7: {
					value: v.title //生日主题
				},
				name1: {
					value: v.guanxi //称呼
				},
				thing6: {
					value: getTime(v.time) //公历日期
				},
				thing8: {
					value: '生日提醒' //类型
				},
				thing5: {
					value: v.remark //温馨提示
				}
			}
		}
		// 发送信息模板
		let sendRes = await new Promise((resolve, reject) => {
			return request({
				url: url,
				method: "POST",
				json: true,
				headers: {
					"content-type": "application/json",
				},
				body: data1
			}, (error, response, body) => {
				resolve(body)
			})
		})

	}
}
