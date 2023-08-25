// pages/api/todos.js
import todos from "../../../backend/database";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const todosFromDB = await todos.getAll();
    res.status(200).json(todosFromDB);
  } else if (req.method === "POST") {
    const todosFromDB = await todos.insertOne(req.body, true);
    res.status(200).json(todosFromDB);
  } else {
    res.status(405).end();
  }
}
