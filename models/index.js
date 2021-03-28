// Sequelize Index

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env]; // 여기서 env는 config의 ["development"] 가져옴
const database = {};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
);

database.sequelize = sequelize;
database.Sequelize = Sequelize;

database.User = require('./user.js')(sequelize, Sequelize);
database.Todo = require('./todo.js')(sequelize, Sequelize);

// 관계 정의
database.User.hasMany(database.Todo);
database.Todo.belongsTo(database.User);  // TodoModel에 userid 컬럼 추가 (user.userid가 아닌 user.id가 들어옴)


module.exports = database;