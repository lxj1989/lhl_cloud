const {
	Sequelize,
	DataTypes
} = require("sequelize");

// 从环境变量中读取数据库配置
const {
	MYSQL_USERNAME,
	MYSQL_PASSWORD,
	MYSQL_ADDRESS = "",
	NODE_ENV
} = process.env;
// const MYSQL_USERNAME = "root";
// const MYSQL_ADDRESS = "sh-cynosdbmysql-grp-m65y4qky.sql.tencentcdb.com:22165";
// const MYSQL_PASSWORD = "tPrH62fv";
const [host, port] = MYSQL_ADDRESS.split(":");

const sequelize = new Sequelize("lhl", MYSQL_USERNAME, MYSQL_PASSWORD, {
	host,
	port,
	define: {
		//默认创建表有 createAt, updateAt
		// timestamps: false,
		//可以给表设置别名
		freezeTableName: true,
		// 字段以下划线（_）来分割（默认是驼峰命名风格）
		// underscored: false
	},
	dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */ ,
});
// 定义数据模型
const Counter = sequelize.define("Counter", {
	count: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 1,
	},
});

const lhl_notesBirthday = sequelize.define("lhl_notes_birthday", {
	id: {
		type: DataTypes.STRING,
		allowNull: false,
		primaryKey: true,
		defaultValue: '',
	},
	openid: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: '',
	},
});




// 数据库初始化方法
async function init() {
	await Counter.sync({
		alter: true
	});
	await lhl_notesBirthday.sync({
		// alter: true
	});

}

// 导出初始化方法和模型
module.exports = {
	init,
	Counter,
};

// git commit -m 'update' && git push -u origin master
