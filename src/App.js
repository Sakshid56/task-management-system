import React, { useEffect, useState } from "react";
import {
  getTasks,
  addTask,
  deleteTask,
  updateTask
} from "./services/taskService";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [filter, setFilter] = useState("All");
  const [editingId, setEditingId] = useState(null);

  // READ tasks
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    getTasks().then((res) => setTasks(res.data));
  };

  // CREATE or UPDATE task
  const handleSave = () => {
    if (!title || !assignedTo) return;

    const taskData = {
      title,
      assignedTo,
      priority,
      status: "Pending",
      createdAt: new Date().toLocaleString()
    };

    if (editingId) {
      updateTask(editingId, taskData).then(() => resetForm());
    } else {
      addTask(taskData).then(() => resetForm());
    }
  };

  const resetForm = () => {
    setTitle("");
    setAssignedTo("");
    setPriority("Medium");
    setEditingId(null);
    loadTasks();
  };

  // DELETE
  const handleDelete = (id) => {
    deleteTask(id).then(() => loadTasks());
  };

  // MARK COMPLETED
  const handleComplete = (task) => {
    updateTask(task.id, { ...task, status: "Completed" })
      .then(() => loadTasks());
  };

  // FILTER
  const filteredTasks = tasks.filter(task =>
    filter === "All" ? true : task.status === filter
  );

  return (
    <div style={{ padding: "30px" }}>
      <h2>Task Management System</h2>

      {/* FORM */}
      <input
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Assigned To"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>

      <button onClick={handleSave}>
        {editingId ? "Update Task" : "Add Task"}
      </button>

      <hr />

      {/* FILTER BUTTONS */}
      <button onClick={() => setFilter("All")}>All</button>
      <button onClick={() => setFilter("Pending")}>Pending</button>
      <button onClick={() => setFilter("Completed")}>Completed</button>

      {/* TABLE */}
      <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Assigned To</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.assignedTo}</td>
              <td>{task.priority}</td>
              <td>{task.status}</td>
              <td>{task.createdAt}</td>
              <td>
                <button
                  onClick={() => {
                    setEditingId(task.id);
                    setTitle(task.title);
                    setAssignedTo(task.assignedTo);
                    setPriority(task.priority);
                  }}
                >
                  Edit
                </button>

                <button onClick={() => handleComplete(task)}>
                  Complete
                </button>

                <button onClick={() => handleDelete(task.id)}>
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
