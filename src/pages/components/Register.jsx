import React from 'react';

function Register () {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-6 text-center">Create an Account</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your full name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 focus:outline-none"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account? <a href="#" className="text-blue-500 hover:underline">Log In</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
