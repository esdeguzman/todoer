function NewItem({ todos, title, description, setTitle, setDescription, addTodo, selectedFilter, setSelectedFilter, setFilteredTodos }) {

  const handleFilterChange = (e) => {
    setSelectedFilter(e);

    setFilteredTodos(todos.filter(todo => {
      if (e === "todo") {
        return !todo.completed;
      } else if (e === "all") {
        return !todo.hidden;
      } else if (e === "completed") {
        return todo.completed && !todo.hidden;
      } else if (e === "hidden") {
        return todo.hidden;
      }
    }));
  }

  return (
    <div className="mb-4">
      <input
        className="w-full p-2 border rounded text-gray-700 font-semibold"
        type="text"
        placeholder="Task title"
        id="title"
        value={title}
        onChange={(e) =>
          setTitle(
            e.target.value
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" "),
          )
        }
      />
      <textarea
        className="mt-2 w-full p-2 border rounded text-gray-700 font-semibold"
        placeholder="Add a description (Optional)"
        onChange={(e) =>
          setDescription(
            e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1),
          )
        }
        value={description}
      />
      <div className="relative">
        <button
          className="add-btn mt-2 bg-blue-500 hover:from-blue-600 disabled:bg-gray-300 text-white py-2 px-4 rounded"
          onClick={() => addTodo(title)}
          disabled={title.length === 0}
        >
          Add Todo Item
        </button>
        <div className="absolute top-2 right-0">
          <label htmlFor="todoFilter" className="md:mr-2 text-xl font-semibold hidden sm:inline-block">
            Showing:
          </label>
          <select name="todoFilter" value={selectedFilter} onChange={(e) => handleFilterChange(e.target.value)} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
            <option value="todo">
              Not Completed
            </option>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="hidden">Hidden</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default NewItem;
