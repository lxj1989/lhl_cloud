const db = require('../db')

module.exports = db.defineModel('lhl_xingzuo', {
	_id: db.STRING(),
	date: db.STRING(),
	types: db.STRING(),
	addTime: db.STRING(),
	consName: db.STRING(),
	content: {
		type: db.TEXT(),
		allowNull: true
	},

	// QFriend: {
	// 	type: db.STRING(),
	// 	allowNull: true
	// },
	// all: {
	// 	type: db.STRING(),
	// 	allowNull: true,
	// 	defaultValue: '', // 默认,没有为0
	// 	comment: '全部'
	// },
	// color: db.STRING(),
	// date: db.STRING(),
	// datetime: db.STRING(),
	// health: {
	// 	type: db.STRING(),
	// 	allowNull: true,
	// 	defaultValue: '', // 默认,没有为0
	// 	comment: '健康'
	// },
	// love: {
	// 	type: db.STRING(),
	// 	allowNull: true,
	// 	defaultValue: '', // 默认,没有为0
	// 	comment: '爱情'
	// },
	// money: {
	// 	type: db.STRING(),
	// 	allowNull: true,
	// 	defaultValue: '', // 默认,没有为0
	// 	comment: '财运'
	// },
	// summary: {
	// 	type: db.STRING(),
	// 	allowNull: true
	// },
	// work: {
	// 	type: db.STRING(),
	// 	allowNull: true
	// },
	// name: db.STRING(),
	// number: db.STRING(),
	// addTime: db.STRING(),
	// type: db.STRING(),
	// luckeyStone: {
	// 	type: db.STRING(),
	// 	allowNull: true,
	// 	defaultValue: '', // 默认,没有为0
	// 	comment: '幸运石'
	// },
	// mima: {
	// 	type: db.STRING(),
	// 	allowNull: false,
	// 	defaultValue: '', // 默认,没有为0
	// 	comment: '密码'
	// },
	// future: {
	// 	type: db.STRING(),
	// 	allowNull: false
	// },
	// finance: {
	// 	type: db.STRING(),
	// 	allowNull: false
	// },
	// career: {
	// 	type: db.STRING(),
	// 	allowNull: false
	// }


})
