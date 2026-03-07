interface Task {
  id: string;
  title: string;
  status: string;
  priority: "low" | "medium" | "high";
}

interface Props {
  task: Task;
  onToggle: (id: string, status: string) => void;
  onDelete: (id: string) => void;
  priorityStyle: {
    high: string;
    medium: string;
    low: string;
  };
}

const TaskItem = ({ task, onToggle, onDelete, priorityStyle }: Props) => {
  return (
    <li className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow flex justify-between items-center hover:shadow-lg transition">

      <div className="flex items-center gap-4">

        <div
          onClick={() => onToggle(task.id, task.status)}
          className={`w-4 h-4 flex items-center justify-center rounded-full border-2 cursor-pointer ${
            task.status === "completed"
              ? "bg-green-500 border-green-500"
              : "border-gray-400 dark:border-gray-500"
          }`}
        >
          {task.status === "completed" && (
            <span className="text-white text-sm">✓</span>
          )}
        </div>

        <span
          className={`text-lg text-gray-900 dark:text-gray-100 ${
            task.status === "completed"
              ? "line-through text-gray-400 dark:text-gray-500"
              : ""
          }`}
        >
          {task.title}
        </span>

        <span
          className={`px-3 py-1 text-xs rounded-full font-semibold ${
            priorityStyle[task.priority]
          }`}
        >
          {task.priority}
        </span>

      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition"
      >
        Delete
      </button>

    </li>
  );
};

export default TaskItem;