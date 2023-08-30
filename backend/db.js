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
          resolve(res.rows);
        }
        this.disconnect();
      });
    });
  }

  //INSERT DATA
  async insertOne(data) {
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
          try {
            resolve({
              status: 1,
              message: `Successfully inserted ${res.rowCount} row.`,
            });
          } catch (error) {
            reject(error);
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
  async updateOne(data) {
    const jsonData = JSON.parse(data);
    const id = jsonData.id;
    const columns = jsonData.columns;
    const values = jsonData.values;

    let updateColumns;
    let updateValues;

    if (Array.isArray(columns)) {
      if (!Array.isArray(values) || columns.length !== values.length) {
        throw new Error(
          "Invalid column or value arrays OR column count does not match value count",
        );
      }

      if (id === undefined) {
        throw new Error("ID is required to update an item.");
      }

      updateColumns = columns
        .map((col, index) => `${col} = $${index + 1}`)
        .join(", ");
      updateValues = values;
    } else {
      updateColumns = `${columns} = $1`;
      updateValues = [values];
    }

    const updateStatement = `UPDATE ${
      this.tableName
    } SET ${updateColumns} WHERE id = $${updateValues.length + 1}`;

    return new Promise((resolve, reject) => {
      this.connect();
      this.client.query(
        updateStatement,
        [...updateValues, id],
        async (err, res) => {
          if (err) {
            reject(err);
          } else {
            try {
              resolve({
                status: 1,
                message: `Successfully updated ${res.rowCount} row.`,
              });
            } catch (error) {
              reject(error);
            }
          }
          this.disconnect();
        },
      );
    });
  }

  //DELETE DATA
  async deleteOne(id) {
    const deleteQuery = `DELETE FROM ${this.tableName} WHERE id = '${id}'`;

    return new Promise((resolve, reject) => {
      this.connect();
      this.client.query(deleteQuery, async (err, res) => {
        if (err) {
          reject(err);
        } else {
          try {
            resolve({
              status: 1,
              message: `Successfully deleted ${res.rowCount} row.`,
            });
          } catch (error) {
            reject(error);
          }
        }
        this.disconnect();
      });
    });
  }
}

module.exports = db;
