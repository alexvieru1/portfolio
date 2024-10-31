'use client';
import React, { useState } from 'react';
import { createUser } from '@/lib/appwriteConfig';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [role, setRole] = useState('ROLE_ADMIN'); // Use "ROLE_ADMIN" for admin or "ROLE_USER" for regular users

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUser(username, password, role);
  };

  return (
    <form onSubmit={handleSignup} className="flex flex-col gap-4 max-w-md mx-auto mt-8">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="p-2 border rounded-md"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border rounded-md"
        required
      />
      <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Sign Up
      </button>
    </form>
  );
};

export default Signup;
