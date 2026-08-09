function LogoutModal({ isOpen, onClose, onLogout }) {

  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-5">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">

        <h2 className="text-2xl font-bold">

          Logout

        </h2>

        <p className="text-gray-600 mt-3">

          Are you sure you want to logout?

        </p>

        <div className="flex gap-3 mt-8">

          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={onLogout}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition cursor-pointer"
          >
            Logout
          </button>

        </div>

      </div>

    </div>

  );

}

export default LogoutModal;