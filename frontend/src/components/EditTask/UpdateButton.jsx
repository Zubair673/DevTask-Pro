function UpdateButton({ loading }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`w-full mt-8 py-3 rounded-lg text-white font-medium transition cursor-pointer ${
        loading
          ? "bg-gray-500 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {loading ? "Updating..." : "Update Task"}
    </button>
  );
}

export default UpdateButton;