import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AlertTriangle, RefreshCw } from "lucide-react";

import API from "../../api/api";
import DeleteModal from "../DeleteModal/DeleteModal";

function TaskList({ search, priorityFilter, statusFilter }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [deleting, setDeleting] = useState(false);

  // ===============================
  // Fetch Tasks
  // ===============================
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await API.get("/tasks");

      setTasks(data.tasks || []);
    } catch (error) {
      console.error("Failed to load tasks:", error);

      const message =
        error.response?.data?.message ||
        "Failed to load tasks. Please try again.";

      setError(message);

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Initial Load
  // ===============================
  useEffect(() => {
    fetchTasks();
  }, []);

  // ===============================
  // Priority Color
  // ===============================
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700";

      case "Medium":
        return "bg-yellow-100 text-yellow-700";

      case "Low":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // ===============================
  // Status Color
  // ===============================
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";

      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "In Progress":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // ===============================
  // Due Date Color
  // ===============================
  const getDueDateColor = (date) => {
    if (!date) return "text-gray-500";

    const today = new Date();
    const due = new Date(date);

    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    if (due < today) {
      return "font-semibold text-red-600";
    }

    if (due.getTime() === today.getTime()) {
      return "font-semibold text-orange-600";
    }

    return "font-semibold text-green-600";
  };

  // ===============================
  // Filter Tasks
  // ===============================
  const filteredTasks = tasks.filter((task) => {
    const searchValue = search?.toLowerCase() || "";

    const matchesSearch =
      task.title?.toLowerCase().includes(searchValue) ||
      task.description?.toLowerCase().includes(searchValue) ||
      task.course?.toLowerCase().includes(searchValue);

    const matchesPriority =
      priorityFilter === "All" ||
      task.priority === priorityFilter;

    const matchesStatus =
      statusFilter === "All" ||
      task.status === statusFilter;

    return (
      matchesSearch &&
      matchesPriority &&
      matchesStatus
    );
  });

  // ===============================
  // Open Delete Modal
  // ===============================
  const openDeleteModal = (task) => {
    setSelectedTask(task);
    setShowDeleteModal(true);
  };

  // ===============================
  // Close Delete Modal
  // ===============================
  const closeDeleteModal = () => {
    if (deleting) return;

    setShowDeleteModal(false);
    setSelectedTask(null);
  };

  // ===============================
  // Delete Task
  // ===============================
  const handleDelete = async () => {
    if (!selectedTask) return;

    try {
      setDeleting(true);

      await API.delete(`/tasks/${selectedTask._id}`);

      toast.success("Task Deleted Successfully");

      setShowDeleteModal(false);
      setSelectedTask(null);

      await fetchTasks();
    } catch (error) {
      console.error("Delete task error:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete task"
      );
    } finally {
      setDeleting(false);
    }
  };

  // ===============================
  // Loading State
  // ===============================
  if (loading) {
    return (
      <div className="mt-8 rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-gray-950/5">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />

        <h2 className="text-lg font-bold text-gray-900">
          Loading Tasks...
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Please wait while your tasks are loading.
        </p>
      </div>
    );
  }

  // ===============================
  // Error State
  // ===============================
  if (error) {
    return (
      <div className="mt-8 rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-red-100">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
          <AlertTriangle
            size={28}
            className="text-red-600"
          />
        </div>

        <h2 className="mt-5 text-lg font-bold text-gray-900">
          Failed to Load Tasks
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
          {error}
        </p>

        <button
          type="button"
          onClick={fetchTasks}
          className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          <RefreshCw size={16} />
          Try Again
        </button>
      </div>
    );
  }

  // ===============================
  // No Tasks At All
  // ===============================
  if (tasks.length === 0) {
    return (
      <div className="mt-8 rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-gray-950/5">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50">
          <span className="text-2xl">📋</span>
        </div>

        <h2 className="mt-5 text-lg font-bold text-gray-900">
          No Tasks Yet
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
          You haven't created any tasks yet. Add your first
          task to start managing your work.
        </p>

        <Link
          to="/add-task"
          className="mt-5 inline-flex cursor-pointer items-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          + Add Your First Task
        </Link>
      </div>
    );
  }

  // ===============================
  // No Matching Tasks
  // ===============================
  if (filteredTasks.length === 0) {
    return (
      <div className="mt-8 rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-gray-950/5">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
          <span className="text-2xl">🔍</span>
        </div>

        <h2 className="mt-5 text-lg font-bold text-gray-900">
          No Matching Tasks
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          No tasks match your current search or filters.
        </p>

        <p className="mt-1 text-xs text-gray-400">
          Try changing the search, priority, or status filter.
        </p>
      </div>
    );
  }

  // ===============================
  // Task Cards
  // ===============================
  return (
    <>
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredTasks.map((task) => (
          <div
            key={task._id}
            className="flex flex-col rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-950/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {/* ===============================
                Task Header
            =============================== */}
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">
                {task.title}
              </h2>

              <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                {task.description ||
                  "No description provided."}
              </p>

              {/* ===============================
                  Task Information
              =============================== */}
              <div className="mt-5 space-y-3 text-sm">

                <p>
                  <span className="font-semibold text-gray-800">
                    📚 Course:
                  </span>{" "}
                  {task.course || "N/A"}
                </p>

                <p>
                  <span className="font-semibold text-gray-800">
                    🏷 Category:
                  </span>{" "}
                  {task.category || "N/A"}
                </p>

                <p>
                  <span className="font-semibold text-gray-800">
                    🔥 Priority:
                  </span>{" "}
                  <span
                    className={`ml-1 inline-block rounded-full px-3 py-1 text-xs font-medium ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority || "N/A"}
                  </span>
                </p>

                <p>
                  <span className="font-semibold text-gray-800">
                    📌 Status:
                  </span>{" "}
                  <span
                    className={`ml-1 inline-block rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(
                      task.status
                    )}`}
                  >
                    {task.status || "N/A"}
                  </span>
                </p>

                <p>
                  <span className="font-semibold text-gray-800">
                    💪 Difficulty:
                  </span>{" "}
                  {task.difficulty || "N/A"}
                </p>

                <p>
                  <span className="font-semibold text-gray-800">
                    ⏰ Estimated Time:
                  </span>{" "}
                  {task.estimatedTime || "N/A"}
                </p>

                <p>
                  <span className="font-semibold text-gray-800">
                    📅 Due Date:
                  </span>{" "}
                  <span
                    className={getDueDateColor(
                      task.dueDate
                    )}
                  >
                    {task.dueDate
                      ? new Date(
                          task.dueDate
                        ).toLocaleDateString()
                      : "N/A"}
                  </span>
                </p>

                <p>
                  <span className="font-semibold text-gray-800">
                    🕒 Created:
                  </span>{" "}
                  {task.createdAt
                    ? new Date(
                        task.createdAt
                      ).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>

            {/* ===============================
                Actions
            =============================== */}
            <div className="mt-6 flex gap-3 border-t border-gray-100 pt-5">

              <Link
                to={`/edit-task/${task._id}`}
                className="flex flex-1 cursor-pointer items-center justify-center rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Edit
              </Link>

              <button
                type="button"
                onClick={() => openDeleteModal(task)}
                className="flex flex-1 cursor-pointer items-center justify-center rounded-lg bg-red-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Delete
              </button>

            </div>
          </div>
        ))}
      </div>

      {/* ===============================
          Delete Confirmation Modal
      =============================== */}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        onDelete={handleDelete}
        deleting={deleting}
      />
    </>
  );
}

export default TaskList;