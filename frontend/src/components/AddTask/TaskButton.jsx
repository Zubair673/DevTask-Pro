function TaskButton({ loading }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg transition cursor-pointer"
    >
      {loading ? "Saving Task..." : "Save Task"}
    </button>
  );
}

export default TaskButton;