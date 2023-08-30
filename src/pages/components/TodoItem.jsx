import React, { useEffect, useState } from "react";
import CongratsSpan from "./CongratsSpan";

function TodoItem({
  id,
  title,
  description,
  completed,
  hidden,
  completeTodo,
  deleteTodo,
  hideTodo,
  setTitle,
  setDescription,
  updateTodo
}) {
  const [recentlyCompleted, setRecentlyCompleted] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [fadeOut, setFadeOut] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setUpdatedTitle(title);
    setUpdatedDescription(description);
  }, [])

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateTodo(id, updatedTitle, updatedDescription)
    setEditing(false);
  }

  const handleClose = () => {
    setEditing(false);
    setUpdatedTitle(title);
    setUpdatedDescription(description);
  };

  const handleComplete = () => {
    if (!completed) {
      completeTodo(id);
      setRecentlyCompleted(true);
    }
  };

  const handleFadeOut = (callback, delay) => {
    setFadeOut("fade-out");
    setTimeout(() => {
      callback(id);
    }, delay);
  };

  const checkCompletedStatus = () => {
    if (recentlyCompleted) {
      return "bg-green-500 p-4 rounded shadow-md bouncing-animation";
    } else if (hidden) {
      return "bg-gray-500 p-4 rounded shadow-md";
    } else if (completed) {
      return "bg-green-500 p-4 rounded shadow-md";
    } else {
      return "bg-white text-gray-700 p-4 rounded shadow-md";
    }
  };

  return (
    <div className={checkCompletedStatus() + " " + fadeOut}>
      {editing ? (
        <>
          <input
            type="text"
            className="border rounded px-2 py-1 mb-2 w-full"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <textarea
            className="border rounded px-2 py-1 mb-2 w-full"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1),)}
          ></textarea>
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 mr-2"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-blue-700 mr-2"
            onClick={(e) => {
              handleSave(e)
            }}
          >
            Save
          </button>
        </>
      ) : (
        <>
          <div
            className={
              completed
                ? "text-xl font-semibold mb-2 text-gray-300 relative"
                : "text-xl font-semibold mb-2"
            }
          >
            {title}
            {completed && (
              <>
                <div className="absolute top-0 right-0">
                  <button
                    className="text-red-500 hover:text-red-700 mr-2"
                    onClick={() => handleFadeOut(hideTodo, 400)}
                  >
                    <i
                      className={
                        "far fa-solid fa-eye" +
                        (hidden ? "" : "-slash") +
                        " text-white hover:text-" +
                        (hidden ? "green-700" : "red-700")
                      }
                    ></i>
                  </button>
                  <button
                    className="text-white hover:text-red-700"
                    onClick={() => handleFadeOut(deleteTodo, 500)}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </div>
              </>
            )}
          </div>
          <p className={completed ? "text-lg text-gray-300" : "text-lg"}>
            {description ? description : "No specified description."}
          </p>
          <div className="flex justify-end mt-4">
            {completed ? (
              <CongratsSpan />
            ) : (
              <>
                <button
                  className="text-blue-500 hover:text-blue-700 mr-2"
                  onClick={handleEditClick}
                >
                  <i className="far fa-edit"></i>
                </button>
                <button
                  className="text-green-500 hover:text-green-700 mr-2"
                  onClick={handleComplete}
                >
                  <i className="far fa-check-circle"></i>
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleFadeOut(deleteTodo, 500)}
                >
                  <i className="far fa-trash-alt"></i>
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default TodoItem;
