 import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles'
const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Mock fetch users
    setUsers([
      { id: 1, name: 'Admin User', email: 'admin@tourism.com' },
      { id: 2, name: 'Support User', email: 'support@tourism.com' },
    ]);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold">User Management</h2>
      <table className="w-full mt-6 border-collapse table-auto">
        <thead>
          <tr className="bg-blue-800 text-white">
            <th className="py-3 px-6">User ID</th>
            <th className="py-3 px-6">Name</th>
            <th className="py-3 px-6">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-b">
              <td className="py-3 px-6">{user.id}</td>
              <td className="py-3 px-6">{user.name}</td>
              <td className="py-3 px-6">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
 