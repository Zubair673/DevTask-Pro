function DeleteModal({

  isOpen,
  onClose,
  onDelete,

}) {

  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl shadow-xl p-8 w-[90%] max-w-md">

        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Delete Task
        </h2>

        <p className="text-gray-600">
          Are you sure you want to delete this task?
        </p>

        <p className="text-gray-500 mt-2">
          This action cannot be undone.
        </p>

        <div className="flex gap-4 mt-8">

          <button
            onClick={onClose}
            className="flex-1 border border-gray-400 py-3 rounded-lg hover:bg-gray-100 transition cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition cursor-pointer"
          >
            Delete
          </button>

        </div>

      </div>

    </div>

  );

}

export default DeleteModal;