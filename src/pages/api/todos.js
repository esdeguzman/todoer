// pages/api/todos.js
import database from "../../../backend/database";

const {todos} = database;

export default async function handler(req, res) {
  if (req.method === "GET") {
    const todosFromDB = await todos.query(`SELECT * FROM todos where user_id='${req.query.user}'`);

    res.status(200).json(todosFromDB);
  } else if (req.method === "POST") {
    if (JSON.parse(req.body).env === "dev") {
      res.status(200).json([
        {
          id: "1f86d3e9-449a-4f7e-8f2a-9e0eaf1687d5",
          title: "Complete Project Proposal",
          description: "Finish writing the project proposal document.",
          completed: true,
          hidden: false,
          createdAt: 1661587200, // Epoch timestamp for a specific date and time
        },
        {
          id: "6f21e83a-5dc7-45cc-af2d-6c91f7c87e6b",
          title: "Buy Groceries",
          description:
            "Get vegetables, fruits, and bread from the grocery store.",
          completed: true,
          hidden: false,
          createdAt: 1670323200,
        },
        {
          id: "a2498d0a-176d-4bb5-aa9e-8c46d1ea5e94",
          title: "Read Chapter 3",
          description: "Read and take notes on Chapter 3 of the novel.",
          completed: false,
          hidden: false,
          createdAt: 1673452800,
        },
        {
          id: "c4b3b1f5-ae8c-4d7e-9c55-d97c35cc30c8",
          title: "Prepare Presentation",
          description:
            "Gather data and create slides for the upcoming presentation.",
          completed: false,
          hidden: false,
          createdAt: 1675128000,
        },
        {
          id: "e5c349c1-e2a2-4ea9-9135-824cc64208c3",
          title: "Call John",
          description: "Discuss the travel plans for the weekend trip.",
          completed: true,
          hidden: true,
          createdAt: 1676236800,
        },
        {
          id: "fcd6ea7e-4e54-4462-8ea3-dcf10d38ebeb",
          title: "Finish Coding Assignment",
          description: "Complete the remaining tasks in the coding assignment.",
          completed: false,
          hidden: false,
          createdAt: 1677499200,
        },
        {
          id: "9c63f6b5-dc6a-4c21-9e73-6a380a5b1995",
          title: "Go for a Run",
          description: "Run for 30 minutes in the nearby park.",
          completed: true,
          hidden: false,
          createdAt: 1678732800,
        },
        {
          id: "8f3520a6-9d3b-4ff3-91d0-42d2b0d08363",
          title: "Watch New Movie",
          description: "Watch the recently released science fiction movie.",
          completed: true,
          hidden: true,
          createdAt: 1680062400,
        },
        {
          id: "2f8dd05d-d789-4c62-8797-37e7f7999f65",
          title: "Update Resume",
          description: "Add recent projects and experiences to the resume.",
          completed: false,
          hidden: false,
          createdAt: 1681238400,
        },
        {
          id: "7e3e5101-47a9-4a5e-b853-fd0886b7ac0b",
          title: "Plan Birthday Party",
          description: "Organize and plan the upcoming birthday party.",
          completed: false,
          hidden: false,
          createdAt: 1682491200,
        },
      ]);
    } else {
      const TodosResponse = await todos.insertOne(req.body);

      if (TodosResponse.status === 1) {
        const items = await todos.getAll("created_at", "DESC");

        res.status(200).json(items);
      }
    }
  } else if (req.method === "PUT") {
    const jsonData = JSON.parse(req.body);

    const TodosResponse = await todos.updateOne(req.body);

    if (TodosResponse.status === 1) {
      const items = await todos.query(`SELECT * FROM todos where user_id='${jsonData.user_id}'`);

      res.status(200).json(items);
    }
  } else if (req.method === "PATCH") {
    const jsonData = JSON.parse(req.body);

    if (jsonData.columns[0] === "hidden") {
      jsonData.values[0] = !jsonData.values[0];
    }

    const TodosResponse = await todos.updateOne(JSON.stringify(jsonData));

    if (TodosResponse.status === 1) {
      const items = await todos.getAll("created_at", "DESC");

      res.status(200).json(items);
    }
  } else if (req.method === "DELETE") {
    const TodosResponse = await todos.deleteOne(JSON.parse(req.body).id);

    if (TodosResponse.status === 1) {
      const items = await todos.getAll("created_at", "DESC");

      res.status(200).json(items);
    }
  } else {
    res.status(405).end();
  }
}
