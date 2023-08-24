import { useState } from "react";
import TodoHeader from "./components/TodoHeader";
import NewItem from "./components/NewItem";
import Todos from "./components/Todos";
import FloatingPlusIcon from "./components/FloatingPlusIcon";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([
    {
      id: crypto.randomUUID(),
      title: "Learn React",
      description: "Learn the basics of React",
      completed: false,
    },
    {
      id: crypto.randomUUID(),
      title: "List Possible Talk Titles",
      description:
        "Come up with possible titles for the 51st Enablement Seminar.",
      completed: false,
    },
    {
      id: crypto.randomUUID(),
      title: "Feed the Cats and Dogs",
      description: "",
      completed: true,
    },
    {
      id: crypto.randomUUID(),
      title: "Start chapter 5 of your story",
      description: "",
      completed: false,
    },
  ]);

  const addTodo = () => {
    setTodos([
      ...todos,
      { id: crypto.randomUUID(), title, description, completed: false },
    ]);

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
          />
        </div>
      </div>

      <FloatingPlusIcon />
    </>
  );
}
