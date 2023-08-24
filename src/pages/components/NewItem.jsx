function NewItem({ title, description, setTitle, setDescription, addTodo }) {
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
              .join(" ")
          )
        }
      />
      <textarea
        className="mt-2 w-full p-2 border rounded text-gray-700 font-semibold"
        placeholder="Add a description (Optional)"
        onChange={(e) =>
          setDescription(
            e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
          )
        }
        value={description}
      />
      <button
        className="add-btn mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        onClick={() => addTodo(title)}
      >
        Add Todo Item
      </button>
    </div>
  );
}

export default NewItem;
