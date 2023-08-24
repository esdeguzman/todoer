import TodoItem from "./TodoItem";

function Todos({ todos, completeTodo, deleteTodo, setTitle, setDescription }) {
  return todos
    .slice()
    .reverse()
    .map((todo) => (
      <TodoItem
        key={todo.id}
        id={todo.id}
        title={todo.title}
        description={todo.description}
        completed={todo.completed}
        completeTodo={completeTodo}
        deleteTodo={deleteTodo}
        setTitle={setTitle}
        setDescription={setDescription}
      />
    ));
}

export default Todos;
