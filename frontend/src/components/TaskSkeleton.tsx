interface Props {
  count?: number;
}

const TaskSkeleton = ({ count = 5 }: Props) => {
  return (
    <ul className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <li
          key={index}
          className="bg-white p-5 rounded-xl shadow flex justify-between items-center animate-pulse"
        >
          <div className="flex items-center gap-4 w-full">
            <div className="w-4 h-4 rounded-full bg-gray-300"></div>

            <div className="h-5 bg-gray-300 rounded w-1/3"></div>

            <div className="h-5 w-16 bg-gray-300 rounded-full"></div>
          </div>

          <div className="h-5 w-16 bg-gray-300 rounded"></div>
        </li>
      ))}
    </ul>
  );
};

export default TaskSkeleton;