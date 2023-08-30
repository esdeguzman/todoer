import React, { useEffect, useState } from 'react';

function TodoHeader({setLoggedIn}) {
  const [user, setUser] = useState({})
  const [showDropdown, setShowDropdown] = useState(false);
  const customFont = {
    fontFamily: "'Rubik', sans-serif",
  };
  
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("todoer.user")))
  }, [])

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const logout = () => {
    fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        id: user.id,
        action: "logout"
      })
    })
    .then((response) => response.json())
    .then((data) => {
      localStorage.removeItem("todoer.token");
      localStorage.removeItem("todoer.user");

      setLoggedIn(false)
    })
    .catch((error) => console.error("Error fetching users:", error));
  }

  return (
    <header className="bg-blue-500 text-white p-4 flex flex-col md:flex-row justify-between">
      <div className="text-lg font-bold uppercase">
        Todoer
        <span
          style={customFont}
          className="text-sm font-normal block md:inline mt-1 md:mt-0 md:ml-2 uppercase sm:mt-5"
        >
          Making little accomplishments count
        </span>
      </div>
      <div className="relative inline-block text-white mt-4 md:mt-0">
        <span className='mr-2 uppercase'>{user.name}</span>
        <button
          className="text-white focus:outline-none"
          onClick={toggleDropdown}
        >
          <i className="fas fa-user-circle text-xl"></i>
        </button>
        {showDropdown && (
          <div className="absolute right-0 mt-2 bg-white text-black shadow-md rounded-lg">
            <button
              className="block px-4 py-2 w-full text-left focus:outline-none"
              onClick={() => logout()}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default TodoHeader;
