function TaskCard({
  title,
  course,
  category,
  priority,
  dueDate,
  status,
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border hover:shadow-lg transition">

      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-xl font-bold text-gray-800">
            {title}
          </h2>

          <p className="text-gray-500 mt-1">
            {course}
          </p>

        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium
            ${
              priority === "High"
                ? "bg-red-100 text-red-600"
                : priority === "Medium"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-600"
            }`}
        >
          {priority}
        </span>

      </div>

      <div className="mt-5 grid md:grid-cols-3 gap-4">

        <div>

          <p className="text-gray-500 text-sm">
            Category
          </p>

          <p className="font-medium">
            {category}
          </p>

        </div>

        <div>

          <p className="text-gray-500 text-sm">
            Due Date
          </p>

          <p className="font-medium">
            {dueDate}
          </p>

        </div>

        <div>

          <p className="text-gray-500 text-sm">
            Status
          </p>

          <p className="font-medium">
            {status}
          </p>

        </div>

      </div>

      <div className="flex gap-3 mt-6">

        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition cursor-pointer">
          Edit
        </button>

        <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition cursor-pointer">
          Delete
        </button>

      </div>

    </div>
  );
}

export default TaskCard;