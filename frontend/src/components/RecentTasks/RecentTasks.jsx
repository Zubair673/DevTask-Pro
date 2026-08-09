import { Link } from "react-router-dom";

function RecentTasks() {
  return (
    <div className="bg-white rounded-xl shadow p-6 mt-8">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          Recent Tasks
        </h2>

        <Link
          to="/add-task"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Task
        </Link>

      </div>

      <div className="border-b py-4 flex justify-between">
        <span>React Assignment</span>
        <span className="text-red-500 font-medium">High</span>
      </div>

      <div className="border-b py-4 flex justify-between">
        <span>Database Project</span>
        <span className="text-yellow-500 font-medium">Medium</span>
      </div>

      <div className="py-4 flex justify-between">
        <span>DSA Practice</span>
        <span className="text-green-600 font-medium">Low</span>
      </div>

    </div>
  );
}

export default RecentTasks;