import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  fetchTasks,
  addTask,
  deleteTask,
  updateTask,
  reset,
} from "../features/task/taskSlice";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiMoreVertical } from "react-icons/fi";

import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import TaskSkeleton from "../components/TaskSkeleton";
import ThemeToggle from "../components/ThemeToggle";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { tasks, loading } = useAppSelector((state) => state.tasks);
  const { email } = useAppSelector((state) => state.auth);

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [sort, setSort] = useState<"latest" | "oldest" | "priority">("latest");

  const [open, setOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(fetchTasks())
      .unwrap()
      .catch(() => {
        console.log("Backend unavailable. Using local data.");
      });
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
      if (
        sortRef.current &&
        !sortRef.current.contains(event.target as Node)
      ) {
        setSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAdd = useCallback(() => {
    if (title.trim()) {
      dispatch(addTask({ title, priority, projectId: "default" }));
      setTitle("");
      setPriority("low");
    }
  }, [title, priority, dispatch]);

  const toggleStatus = useCallback(
    (id: string, status: string) => {
      dispatch(
        updateTask({
          id,
          status: status === "pending" ? "completed" : "pending",
        })
      );
    },
    [dispatch]
  );

  const handleDelete = useCallback(
    (id: string) => {
      dispatch(deleteTask(id));
    },
    [dispatch]
  );

  const handleLogout = useCallback(() => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  }, [dispatch, navigate]);

  const priorityOrder = { high: 3, medium: 2, low: 1 };

  const processedTasks = useMemo(() => {
    return [...tasks]
      .filter((task) => (filter === "all" ? true : task.status === filter))
      .sort((a, b) => {
        if (sort === "latest")
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        if (sort === "oldest")
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        if (sort === "priority")
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        return 0;
      });
  }, [tasks, filter, sort]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const pendingTasks = totalTasks - completedTasks;

  const emailInitial = email ? email.charAt(0).toUpperCase() : "U";

  const priorityStyle = {
    high: "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300",
    medium: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300",
    low: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950 p-10 text-gray-900 dark:text-gray-100">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold">Welcome</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Manage your tasks efficiently
            </p>
          </div>

          <div className="flex items-center gap-4">

            {/* THEME BUTTON */}
            <ThemeToggle />

            <div className="relative" ref={dropdownRef}>
              <div
                onClick={() => setOpen(!open)}
                className="w-12 h-12 bg-primary text-white flex items-center justify-center rounded-full text-lg font-bold cursor-pointer shadow"
              >
                {emailInitial}
              </div>

              {open && (
                <div className="absolute right-0 mt-3 w-60 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 z-50">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Signed in as
                  </p>

                  <p className="font-medium break-all mb-4">{email}</p>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-500 hover:text-red-700 transition"
                  >
                    <FiLogOut size={14} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
            <p className="text-gray-500 dark:text-gray-400 text-sm">Total Tasks</p>
            <h2 className="text-2xl font-bold">{totalTasks}</h2>
          </div>

          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
            <p className="text-gray-500 dark:text-gray-400 text-sm">Completed</p>
            <h2 className="text-2xl font-bold text-green-600">{completedTasks}</h2>
          </div>

          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
            <p className="text-gray-500 dark:text-gray-400 text-sm">Pending</p>
            <h2 className="text-2xl font-bold text-yellow-600">{pendingTasks}</h2>
          </div>
        </div>

        <TaskForm
          title={title}
          priority={priority}
          setTitle={setTitle}
          setPriority={setPriority}
          onAdd={handleAdd}
        />

        {/* FILTERS */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-3">
            {(["all", "pending", "completed"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1 rounded-full text-sm font-medium ${
                  filter === f
                    ? "bg-primary text-white"
                    : "bg-white dark:bg-gray-800 shadow text-gray-600 dark:text-gray-300"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* SORT */}
          <div className="relative" ref={sortRef}>
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="p-2 bg-white dark:bg-gray-800 rounded-full shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <FiMoreVertical size={18} />
            </button>

            {sortOpen && (
              <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 shadow-xl rounded-xl w-48 overflow-hidden z-50">
                <div className="px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Sort By
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700"></div>

                {[
                  { label: "Priority", value: "priority" },
                  { label: "Latest", value: "latest" },
                  { label: "Oldest", value: "oldest" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSort(option.value as any);
                      setSortOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm transition ${
                      sort === option.value
                        ? "bg-primary text-white"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <TaskSkeleton count={5} />
        ) : (
          <TaskList
            tasks={processedTasks}
            onToggle={toggleStatus}
            onDelete={handleDelete}
            priorityStyle={priorityStyle}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;