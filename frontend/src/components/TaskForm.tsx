import React from "react";
import Spinner from "./Spinner";

interface Props {
  title: string;
  priority: "low" | "medium" | "high";
  setTitle: (value: string) => void;
  setPriority: (value: "low" | "medium" | "high") => void;
  onAdd: () => void;
  isAdding?: boolean;
}

const TaskForm = ({
  title,
  priority,
  setTitle,
  setPriority,
  onAdd,
  isAdding = false,
}: Props) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdding && title.trim()) {
      onAdd();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-8 flex flex-col sm:flex-row gap-3"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done? (Press Enter to add)"
        disabled={isAdding}
        className="flex-1 border border-gray-300 dark:border-gray-600 
        bg-white dark:bg-gray-900 
        text-gray-900 dark:text-gray-100 
        placeholder-gray-400 dark:placeholder-gray-500
        rounded-lg px-4 py-2 
        focus:ring-2 focus:ring-primary outline-none disabled:opacity-50"
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
        disabled={isAdding}
        className="border border-gray-300 dark:border-gray-600
        bg-white dark:bg-gray-900
        text-gray-900 dark:text-gray-100
        rounded-lg px-3 py-2 disabled:opacity-50 cursor-pointer"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button
        type="submit"
        disabled={isAdding || !title.trim()}
        className="bg-primary text-white px-6 py-2 rounded-lg 
        hover:opacity-90 transition flex items-center justify-center gap-2 
        disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer min-w-[100px]"
      >
        {isAdding ? (
          <>
            <Spinner size="sm" className="text-white" />
            <span>Adding...</span>
          </>
        ) : (
          <span>Add</span>
        )}
      </button>
    </form>
  );
};

export default TaskForm;