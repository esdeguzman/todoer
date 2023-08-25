import React, { useState } from "react";
import CongratsSpan from "./CongratsSpan";

function TodoItem({
  id,
  title,
  description,
  completed,
  completeTodo,
  deleteTodo,
  hideTodo,
  setTitle,
  setDescription,
}) {
  const [recentlyCompleted, setRecentlyCompleted] = useState(false);
  const [fadeOut, setFadeOut] = useState("");
  const [editing, setEditing] = useState(false);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleClose = () => {
    setEditing(false);
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="border rounded px-2 py-1 mb-2 w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 mr-2"
            onClick={handleClose}
          >
            Close
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
              <button
                className="absolute top-0 right-0 text-red-500 hover:text-red-700"
                onClick={() => handleFadeOut(hideTodo, 500)}
              >
                <i className="far fa-solid fa-eye-slash text-white hover:text-red-700"></i>
              </button>
            )}
          </div>
          <p className={completed ? "text-lg text-gray-300" : "text-lg"}>
            {description}
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
                  onClick={() => handleFadeOut(
                    deleteTodo, 500
                  )}
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
