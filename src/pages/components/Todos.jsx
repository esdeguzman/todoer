import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

function Todos({
  filteredTodos,
  completeTodo,
  deleteTodo,
  hideTodo,
  setTitle,
  setDescription,
  updateTodo
}) {
  return (
    <>
      { filteredTodos?.length ? (
        filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            description={todo.description}
            completed={todo.completed}
            hidden={todo.hidden}
            completeTodo={completeTodo}
            deleteTodo={deleteTodo}
            hideTodo={hideTodo}
            setTitle={setTitle}
            setDescription={setDescription}
            updateTodo={updateTodo}
          />
        ))
      ) : (
        <div className="no-todos">
          <div className="text-xl font-semibold">💭 No Todos yet 💭</div>
          <div className="text-xl font-semibold">
            🔥 Use the form above and start your productive day! 🔥
          </div>
        </div>
      )}
    </>
  );
}

export default Todos;
