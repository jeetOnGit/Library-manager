import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/Appcontext";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const { token, backendUrl } = useContext(AppContext)
  useEffect(() => {
    // Fetch users from backend
    fetch(`${backendUrl}/api/users/all-users`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUsers(data);
        } else if (Array.isArray(data.users)) {
          setUsers(data.users);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredUsers = users.filter((user) => {
    const name = user.name || "";
    const email = user.email || "";
    const matchesSearch =
      name.toLowerCase().includes(search.toLowerCase()) ||
      email.toLowerCase().includes(search.toLowerCase());
    const matchesRole =
      roleFilter === "All" || (user.role && user.role.toLowerCase() === roleFilter.toLowerCase());

    return matchesSearch && matchesRole;
  });


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>

      {/* Search and Filters */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="All">All Roles</option>
          <option value="admin">Admin</option>
          <option value="librarian">Librarian</option>
          <option value="student">Student</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Role</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Joined</th>
              <th className="py-2 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 text-center">
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.role}</td>
                  <td className="py-2 px-4 border-b">
                    {user.isBanned ? "Banned" : "Active"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b text-center space-x-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">
                      Delete
                    </button>
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600">
                      {user.isBanned ? "Unban" : "Ban"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-4 text-gray-500 italic"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
