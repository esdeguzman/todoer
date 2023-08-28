import { useEffect, useState } from "react";
import TodoHeader from "./components/TodoHeader";
import NewItem from "./components/NewItem";
import Todos from "./components/Todos";
import FloatingPlusIcon from "./components/FloatingPlusIcon";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("todo");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    fetch("/api/todos")
      .then((response) => response.json())
      .then((data) => {
        filterTodos(data);
      })
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  const filterTodos = (data) => {
    setTodos(data);
    setFilteredTodos(
      data.filter((todo) => {
        if (selectedFilter === "todo") {
          return !todo.completed;
        } else if (selectedFilter === "all") {
          return !todo.hidden;
        } else if (selectedFilter === "completed") {
          return todo.completed && !todo.hidden;
        } else if (selectedFilter === "hidden") {
          return todo.hidden;
        }
      }),
    );
  };

  const addTodo = () => {
    const id = crypto.randomUUID();

    fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({
        id: id,
        title: title,
        description: description,
        created_at: Date.now(),
      }),
    })
      .then((response) => response.json())
      .then((data) => filterTodos(data))
      .catch((error) => console.error("Error fetching todos:", error));

    setTitle("");
    setDescription("");
  };

  const completeTodo = (id) => {
    fetch("/api/todos", {
      method: "PATCH",
      body: JSON.stringify({
        id: id,
        columns: ["completed"],
        values: [true],
      }),
    })
      .then((response) => response.json())
      .then((data) => filterTodos(data))
      .catch((error) => console.error("Error fetching todos:", error));
  };

  const hideTodo = (id) => {
    fetch("/api/todos", {
      method: "PATCH",
      body: JSON.stringify({
        id: id,
        columns: ["hidden"],
        values: [todos.filter((todo) => todo.id === id)[0].hidden],
      }),
    })
      .then((response) => response.json())
      .then((data) => filterTodos(data))
      .catch((error) => console.error("Error fetching todos:", error));
  };

  const deleteTodo = (id) => {
    fetch("/api/todos", {
      method: "DELETE",
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => response.json())
      .then((data) => filterTodos(data))
      .catch((error) => console.error("Error fetching todos:", error));
  };

  return (
    <>
      <TodoHeader />

      <div className="container mx-auto p-4">
        <NewItem
          todos={todos}
          title={title}
          description={description}
          setTitle={setTitle}
          setDescription={setDescription}
          addTodo={addTodo}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          setFilteredTodos={setFilteredTodos}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Todos
            filteredTodos={filteredTodos}
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
