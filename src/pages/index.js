import { useEffect, useState } from "react";
import TodoHeader from "./components/TodoHeader";
import NewItem from "./components/NewItem";
import Todos from "./components/Todos";
import FloatingPlusIcon from "./components/FloatingPlusIcon";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("/api/todos")
    .then((response) => response.json())
    .then((data) => setTodos(data))
    .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  const addTodo = () => {
    const id = crypto.randomUUID()

    fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({
        id: id, title: title, description: description
      }),
    })
    .then((response) => response.json())
    .then((data) => setTodos(data))
    .catch((error) => console.error("Error fetching todos:", error));

    setTitle("");
    setDescription("");
  };

  const completeTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: true } : todo
      )
    );
  };

  const hideTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <TodoHeader />

      <div className="container mx-auto p-4">
        <NewItem
          title={title}
          description={description}
          setTitle={setTitle}
          setDescription={setDescription}
          addTodo={addTodo}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Todos
            todos={todos}
            completeTodo={completeTodo}
            deleteTodo={deleteTodo}
            setTitle={setTitle}
            setDescription={setDescription}
            hideTodo={hideTodo}
          />
        </div>
      </div>

      <FloatingPlusIcon />
    </>
  );
}
