const db = require("./db.js");
const crypto = require('crypto');

const config = {
	host: "localhost",
	user: "postgres",
	port: 5432,
	password: "password",
	database: "postgres",
};

const todos = new db("todos", config);

export default todos;