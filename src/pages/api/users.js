import { v4 as uuidv4 } from "uuid";
import database from "../../../backend/database";
const { users } = database;

export default async function handler(req, res) {
  const { action } = JSON.parse(req.body);

  if (req.method === "POST") {
    if (action === "login") {
      const { email, password } = JSON.parse(req.body);

      const checkUser = await users.where("email", email);

      if (checkUser.length > 0) {
        if (checkUser[0].password === password) {
          const token = uuidv4();

          await users.updateOne(
            JSON.stringify({
              id: checkUser[0].id,
              columns: ["session_token"],
              values: [token],
            }),
            true,
          );

          await users.getOne(checkUser[0].id).then((data) => {
            res.status(200).json(data);
          });
        }
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else if (action === "logout") {
      const { id } = JSON.parse(req.body);

      const logoutUser = await users
        .updateOne(
          JSON.stringify({
            id: id,
            columns: ["session_token"],
            values: [null],
          }),
        )
        .then((data) => {
          res.status(200).json({ message: "User logged out!" });
        })
        .catch((error) => {
          res.status(500).json({ message: "Something went wrong!" });
        });
    }
  }
}
