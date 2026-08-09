import { Link } from "react-router-dom";

function EmptyState() {

  return (

    <div className="bg-white rounded-xl shadow-md p-10 text-center">

      <h2 className="text-2xl font-bold text-gray-800">
        No Tasks Yet
      </h2>

      <p className="text-gray-500 mt-3">
        You haven't added any tasks yet.
      </p>

      <Link
        to="/add-task"
        className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
      >
        Add Your First Task
      </Link>

    </div>

  );

}

export default EmptyState;