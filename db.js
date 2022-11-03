const Sequelize = require('sequelize')
const uuid = require('uuid')
const config = require('./config')


function generateId() {
	return uuid.v1()
}

function serverDate() {
	let time = new Date().toISOString();
	return time;
}


// var sequelize = new Sequelize(config.database, config.username, config.password, {
// 	isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
// 	host: config.host,
// 	dialect: config.dialect,
// 	logging: false, //d打印sql
// 	pool: {
// 		max: 5,
// 		min: 0,
// 		idle: 10000
// 	}
// })


const sequelize = new Sequelize(config.database, config.username, config.password, {
	host: config.host,
	port: config.port,
	pool: {
		max: 50,
		min: 0,
		//建立连接最长时间
		acquire: 30000,
		//空闲最长连接时间
		idle: 10000
	},

	define: {
		//默认创建表有 createAt, updateAt
		timestamps: false,
		//可以给表设置别名
		freezeTableName: true,
		// 字段以下划线（_）来分割（默认是驼峰命名风格）
		underscored: false
	},
	//sequelize v4 必须设置方言
	dialect: 'mysql',
	//默认DECIMAL and NEWDECIMAL 返回 String
	dialectOptions: {
		decimalNumbers: true
	},
	//设置别名，否则不识别$like等关键词($like: Op.like对应关系)
	operatorsAliases: 'object',
	//时间上的统一
	timezone: "+08:00",
	//默认输出执行sql语句
	logging: false, //console.log,
	// logging: function (str) {
	// 	console.log(str)
	// }
})


const ID_TYPE = Sequelize.STRING(50)

function defineModel(name, attributes) {
	var attrs = {}
	for (let key in attributes) {
		let value = attributes[key]
		if (typeof value === 'object' && value['type']) {
			value.allowNull = value.allowNull || false
			attrs[key] = value
		} else {
			attrs[key] = {
				type: value,
				allowNull: false
			}
		}
	}
	// attrs.id = {
	// 	type: ID_TYPE,
	// 	primaryKey: true, //主键
	// 	aotuIncrement: true //自增长
	// }
	// attrs.createdAt = {
	// 	type: Sequelize.BIGINT,
	// 	allowNull: false
	// }
	// attrs.updatedAt = {
	// 	type: Sequelize.BIGINT,
	// 	allowNull: false
	// }
	// attrs.version = {
	// 	type: Sequelize.BIGINT,
	// 	allowNull: false
	// }

	// console.log('model defined for table: ' + name + '\n' + JSON.stringify(attrs, function (k, v) {
	//   if (k === 'type') {
	//     for (let key in Sequelize) {
	//       if (key === 'ABSTRACT' || key === 'NUMBER') {
	//         continue
	//       }
	//       let dbType = Sequelize[key]
	//       if (typeof dbType === 'function') {
	//         if (v instanceof dbType) {
	//           if (v._length) {
	//             return `${dbType.key}(${v._length})`
	//           }
	//           return dbType.key
	//         }
	//         if (v === dbType) {
	//           return dbType.key
	//         }
	//       }
	//     }
	//   }
	//   return v
	// }, '  '))
	return sequelize.define(name, attrs, {
		tableName: name,
		timestamps: false,
		hooks: {
			beforeValidate: function(obj) {
				let now = Date.now()
				if (obj.isNewRecord) {
					console.log(`will create entity...${obj}`)
					if (!obj.id) {
						obj.id = generateId()
					}
					obj.createdAt = now
					obj.updatedAt = now
					obj.version = 0
				} else {
					console.log('will update entity...')
					obj.updatedAt = now
					obj.version++
				}
			}
		}
	})
}

const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN']

var exp = {
	defineModel: defineModel,
	sync: async () => {
		await sequelize.sync({
			// User.sync() - 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
			// User.sync({ force: true }) - 将创建表,如果表已经存在,则将其首先删除
			// User.sync({ alter: true }) - 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使
			// force: true
			alter: true
		})
		console.log("所有表模型模型均已成功同步.");
		// if (process.env.NODE_ENV !== 'production') {

		// } else {
		// 	throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.')
		// }
	}
}

for (let type of TYPES) {
	exp[type] = Sequelize[type]
}

exp.ID = ID_TYPE
exp.generateId = generateId
exp.serverDate = serverDate
exp.sequelize = sequelize

module.exports = exp




// const {
// 	Sequelize,
// 	DataTypes
// } = require("sequelize");

// // 从环境变量中读取数据库配置
// // const {
// // 	MYSQL_USERNAME,
// // 	MYSQL_PASSWORD,
// // 	MYSQL_ADDRESS = "",
// // 	NODE_ENV
// // } = process.env;
// // const [host, port] = MYSQL_ADDRESS.split(":");
// const MYSQL_USERNAME = "root";
// const MYSQL_ADDRESS = "localhost:3306";
// const MYSQL_PASSWORD = "123456";

// const [host, port] = MYSQL_ADDRESS.split(":");

// const sequelize = new Sequelize("lhl", MYSQL_USERNAME, MYSQL_PASSWORD, {
// 	host,
// 	port,
// 	define: {
// 		//默认创建表有 createAt, updateAt
// 		timestamps: false,
// 		//可以给表设置别名
// 		freezeTableName: true,
// 		// 字段以下划线（_）来分割（默认是驼峰命名风格）
// 		underscored: false
// 	},
// 	dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */ ,
// });
// // 定义数据模型
// const Counter = sequelize.define("Counter", {
// 	count: {
// 		type: DataTypes.INTEGER,
// 		allowNull: false,
// 		defaultValue: 1,
// 	},
// });

// //生日
// const lhl_notesBirthday = sequelize.define("lhl_notes_birthday", {
// 	id: {
// 		type: DataTypes.STRING,
// 		allowNull: false,
// 		primaryKey: true,
// 		defaultValue: '',
// 	},
// 	openid: {
// 		type: DataTypes.STRING,
// 		allowNull: false,
// 		defaultValue: '',
// 	},
// });




// // 数据库初始化方法
// async function init() {
// 	await Counter.sync({
// 		alter: true
// 	});
// 	await lhl_notesBirthday.sync({
// 		// alter: true
// 	});

// }

// // 导出初始化方法和模型
// module.exports = {
// 	init,
// 	Counter,
// };

// // git commit -m 'update' && git push -u origin master
