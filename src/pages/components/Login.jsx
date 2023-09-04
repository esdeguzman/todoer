import React, { useState } from 'react';

function Login({setLoggedIn, filterTodos}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const customFont = {
    fontFamily: "'Rubik', sans-serif",
  };

  const login = (e) => {
    e.preventDefault()

    fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        action: "login"
      })
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.message == 'Invalid credentials') {
        alert('Invalid credentials')
      } else {
        localStorage.setItem("todoer.token", data.token);
        localStorage.setItem("todoer.user", JSON.stringify({
          id: data.id,
          name: data.name,
          email: data.email,
          token: data.token
        }));

        fetch("/api/todos?user=" + data.id)
        .then((response) => response.json())
        .then((data) => {
          filterTodos(data);
        })
        .catch((error) => console.error("Error fetching todos:", error));

        setLoggedIn(true);
      }
    })
    .catch((error) => console.error("Error fetching users:", error));
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 login-container">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md sm:p-12">
        <h2 className="text-3xl font-semibold text-center">Todoer</h2>
        <span
          style={customFont}
          className="mb-10 text-center text-sm font-normal block mt-1 uppercase"
        >
          Making little accomplishments count
        </span>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="w-full py-2 text-white rounded-lg bg-blue-500 hover:from-blue-600 disabled:bg-gray-300"
            onClick={(e) => login(e)}
            disabled={email.length === 0 || password.length === 0}
          >
            Log In
          </button>
        </form>
        {/* <p className="text-sm text-center mt-4">
          Don't have an account? <a href="#" className="text-blue-500 hover:underline">Sign Up</a>
        </p> */}
      </div>
    </div>
  );
}

export default Login;
