import React, { useState } from 'react';

function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      const user = { username };
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    } else {
      console.error('Username and Password are required');
      alert('Please enter both username and password.');
    }
  };

  return (
    <div
      className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://4kwallpapers.com/images/walls/thumbs_3t/16654.jpg')`,
      }}
    >
      <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
        <div className="text-white">
          <div className="mb-8 flex flex-col items-center">
            {/* Replace with your logo */}
            <h1 className="mb-2 text-2xl">Login</h1>
            <span className="text-gray-300">Enter Login Details</span>
          </div>
          <form onSubmit={handleLogin}>
            {/* Username Input */}
            <div className="mb-4 text-lg">
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md w-full"
                placeholder="id@email.com"
                autoComplete="username"
                required
              />
            </div>
            {/* Password Input */}
            <div className="mb-4 text-lg">
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md w-full"
                placeholder="*********"
                autoComplete="current-password"
                required
              />
            </div>
            {/* Forgot Password Link */}
            <div className="mb-6 text-center text-sm">
              <a href="#" className="text-gray-300 hover:underline">
                Forgot Password?
              </a>
            </div>
            {/* Login Button */}
            <div className="mt-8 flex justify-center text-lg">
              <button
                type="submit"
                className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
              >
                Login
              </button>
            </div>
          </form>
          {/* Sign Up Link */}
          <div className="mt-6 text-center text-sm">
            <span className="text-gray-300">Don't have an account? </span>
            <a href="#" className="text-gray-100 hover:underline font-medium">
              Sign up Here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;