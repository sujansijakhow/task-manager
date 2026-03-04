import TaskItem from "./TaskItem";

interface Props {
  tasks: any[];
  onToggle: (id: string, status: string) => void;
  onDelete: (id: string) => void;
  priorityStyle: {
    high: string;
    medium: string;
    low: string;
  };
}

const TaskList = ({ tasks, onToggle, onDelete, priorityStyle }: Props) => {
  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          priorityStyle={priorityStyle}
        />
      ))}
    </ul>
  );
};

export default TaskList;