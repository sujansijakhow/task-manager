// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks"; 
import { fetchTasks, addTask, deleteTask } from "../features/task/taskSlice";

const Dashboard = () => {
  const email = localStorage.getItem("userEmail");
  const dispatch = useAppDispatch(); 
  const { tasks, loading } = useAppSelector((state) => state.tasks); 

  const [title, setTitle] = useState("");

  
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAdd = () => {
    if (title.trim()) {
      dispatch(addTask(title));
      setTitle("");
    }
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold text-primary mb-4">
        Welcome, {email || "User"}!
      </h1>
      <p className="mb-6 text-gray-500">Manage your tasks efficiently below:</p>

      <div className="flex gap-2 mb-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task"
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleAdd}
          className="bg-primary text-white px-4 rounded hover:bg-purple-700 transition-colors"
        >
          Add
        </button>
      </div>

      {/* Task List */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <span>{task.title}</span>
              <button
                onClick={() => handleDelete(task.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;