import { Client } from "pg";

class db {
  constructor(tableName, config) {
    this.config = config;
    this.client = null;
    this.tableName = tableName;
    this.statementString = "";
  }

  connect() {
    this.client = new Client(this.config);
    this.client.connect();
  }

  disconnect() {
    this.client.end();
  }

  buildQuery(query, sortColumn, sortOrder) {
    const ORDER_CLAUSE = `ORDER BY ${sortColumn} ${sortOrder}`;

    if (sortColumn !== null) {
      this.statementString = `${query} ${ORDER_CLAUSE}`;
    } else {
      this.statementString = query;
    }
  }

  async query(query) {
    const regex = new RegExp(
      `\\b(?:FROM|UPDATE|INSERT)\\s+${this.tableName}\\b`,
      "i",
    );

    return new Promise((resolve, reject) => {
      this.connect();
      regex.test(query) === false &&
        reject(`You are only allowed to query ${this.tableName} table.`);

      this.client.query(query, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.rows[0]);
        }
        this.disconnect();
      });
    });
  }

  //INSERT DATA
  async insertOne(data, fetchAllItems = false) {
    const jsonData = JSON.parse(data);
    const columns = Object.keys(jsonData).join(", ");
    const placeholders = Object.keys(jsonData)
      .map((_, index) => `$${index + 1}`)
      .join(", ");
    const values = Object.values(jsonData);

    const insertQuery = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders})`;

    return new Promise((resolve, reject) => {
      this.connect();
      this.client.query(insertQuery, values, async (err, res) => {
        if (err) {
          reject(err);
        } else {
          const message = `Successfully added ${res.rowCount} row.`;

          if (fetchAllItems) {
            try {
              const allItems = await this.getAll();
              resolve(allItems);
            } catch (error) {
              reject(error);
            }
          } else {
            resolve(message);
          }
        }
        this.disconnect();
      });
    });
  }

  async insertMany(dataArray) {
    const columns = Object.keys(dataArray[0]).join(", ");
    const placeholders = dataArray
      .map(
        (_, rowIndex) =>
          `(${Object.keys(dataArray[0])
            .map((_, colIndex) => `$${rowIndex * 14 + colIndex + 1}`)
            .join(", ")})`,
      )
      .join(", ");

    const allValues = dataArray.map((data) => Object.values(data)).flat();

    const insertQuery = `INSERT INTO ${this.tableName} (${columns}) VALUES ${placeholders}`;

    return new Promise((resolve, reject) => {
      this.connect();
      this.client.query(insertQuery, allValues, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(`Successfully added ${res.rowCount} rows.`);
        }
        this.disconnect();
      });
    });
  }

  //GET DATA
  async getAll(sortColumn = null, sortDirection = "ASC") {
    this.buildQuery(
      `SELECT * FROM ${this.tableName}`,
      sortColumn,
      sortDirection,
    );

    return new Promise((resolve, reject) => {
      this.connect();
      this.client.query(this.statementString, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.rows);
        }
        this.disconnect();
      });
    });
  }

  async getOne(id) {
    return new Promise((resolve, reject) => {
      this.connect();
      this.client.query(
        `SELECT * FROM ${this.tableName} WHERE id = '${id}'`,
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res.rows[0]);
          }

          this.disconnect();
        },
      );
    });
  }

  async where(columnName, value, sortColumn = null, sortDirection = "ASC") {
    this.buildQuery(
      `SELECT * FROM ${this.tableName} WHERE ${columnName} = '${value}'`,
      sortColumn,
      sortDirection,
    );

    return new Promise((resolve, reject) => {
      this.connect();
      this.client.query(this.statementString, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.rows);
        }
        this.disconnect();
      });
    });
  }

  //UPDATE DATA
  async update(id, column, value) {
    let updateColumns;
    let updateValues;

    if (Array.isArray(column)) {
      if (!Array.isArray(value) || column.length !== value.length) {
        throw new Error("Invalid column or value arrays");
      }

      updateColumns = column
        .map((col, index) => `${col} = $${index + 1}`)
        .join(", ");
      updateValues = value;
    } else {
      updateColumns = `${column} = $1`;
      updateValues = [value];
    }

    const updateStatement = `UPDATE ${
      this.tableName
    } SET ${updateColumns} WHERE id = $${updateValues.length + 1} RETURNING *`;

    return new Promise((resolve, reject) => {
      this.connect();
      this.client.query(updateStatement, [...updateValues, id], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.rows);
        }
        this.disconnect();
      });
    });
  }
}

module.exports = db;
