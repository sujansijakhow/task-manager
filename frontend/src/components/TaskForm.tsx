
interface Props {
  title: string;
  priority: "low" | "medium" | "high";
  setTitle: (value: string) => void;
  setPriority: (value: "low" | "medium" | "high") => void;
  onAdd: () => void;
}

const TaskForm = ({
  title,
  priority,
  setTitle,
  setPriority,
  onAdd,
}: Props) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow mb-8 flex gap-3">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as any)}
        className="border rounded-lg px-3 py-2"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button
        onClick={onAdd}
        className="bg-primary text-white px-6 rounded-lg hover:scale-105 transition"
      >
        Add
      </button>
    </div>
  );
};

export default TaskForm;