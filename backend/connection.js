const { Client } = require("pg");

class connection {
	constructor (config) {
		if (connection.instance) {
            return connection.instance; // Return the existing instance
        }

		this.client = new Client(config);

		connection.instance = this;
	}

	getClient () {
		return this.client;
	}
}

module.exports = connection;
