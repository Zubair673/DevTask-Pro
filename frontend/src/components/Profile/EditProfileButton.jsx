import { useState } from "react";
import EditProfileModal from "./EditProfileModal";

function EditProfileButton({ user, updateUser }) {

  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition cursor-pointer"
      >
        Edit Profile
      </button>

      <EditProfileModal
        isOpen={open}
        onClose={() => setOpen(false)}
        user={user}
        updateUser={updateUser}
      />
    </>
  );

}

export default EditProfileButton;