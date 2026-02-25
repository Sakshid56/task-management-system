import React, { useEffect, useState } from "react";
import { getUsers, addUser, deleteUser } from "./services/userService";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    getUsers().then((res) => setUsers(res.data));
  };

  const handleAddUser = () => {
    if (!name || !email || !role) return;

    addUser({
      name,
      email,
      role,
      status: "Active"
    }).then(() => {
      setName("");
      setEmail("");
      setRole("");
      loadUsers();
    });
  };

  const handleDelete = (id) => {
    deleteUser(id).then(() => loadUsers());
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>User Management System</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginLeft: "10px" }}
      />

      <input
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={{ marginLeft: "10px" }}
      />

      <button onClick={handleAddUser} style={{ marginLeft: "10px" }}>
        Add User
      </button>

      <hr />

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <button onClick={() => handleDelete(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;