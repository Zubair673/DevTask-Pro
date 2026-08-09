import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import API from "../../api/api";
import { FaCamera, FaTimes, FaPlus } from "react-icons/fa";

function EditProfileModal({ isOpen, onClose, user, updateUser }) {
  const [loading, setLoading] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    phone: "",
    university: "",
    semester: "",
    location: "",
    github: "",
    linkedin: "",
    profileImage: null,
    skills: [],
  });

  useEffect(() => {
    if (!user) return;
    setFormData({
      name: user.name || "",
      bio: user.bio || "",
      phone: user.phone || "",
      university: user.university || "",
      semester: user.semester || "",
      location: user.location || "",
      github: user.github || "",
      linkedin: user.linkedin || "",
      profileImage: null,
      skills: user.skills || [],
    });
    setImagePreview(user.profileImage || "");
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData({ ...formData, profileImage: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const addSkill = () => {
    const skill = skillInput.trim();
    if (!skill) return;
    if (formData.skills.includes(skill)) {
      toast.error("Skill already exists");
      return;
    }
    setFormData({ ...formData, skills: [...formData.skills, skill] });
    setSkillInput("");
  };

  const removeSkill = (skill) => {
    setFormData({ ...formData, skills: formData.skills.filter((item) => item !== skill) });
  };

  const handleSkillKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();
      
      // Append all text fields
      submitData.append("name", formData.name);
      submitData.append("bio", formData.bio);
      submitData.append("phone", formData.phone);
      submitData.append("university", formData.university);
      submitData.append("semester", formData.semester);
      submitData.append("location", formData.location);
      submitData.append("github", formData.github);
      submitData.append("linkedin", formData.linkedin);
      submitData.append("skills", JSON.stringify(formData.skills));

      // Append image if selected
      if (formData.profileImage) {
        submitData.append("profileImage", formData.profileImage);
      }

      const { data } = await API.put("/auth/profile", submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data && data.user) {
        updateUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success(data.message || "Profile Updated Successfully");
        onClose();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center p-5">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Edit Profile</h2>
          <button type="button" onClick={onClose} className="text-3xl hover:text-red-500 transition">×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <img src={imagePreview || "https://i.pravatar.cc/250"} alt="Profile" className="w-36 h-36 rounded-full object-cover border-4 border-blue-600" />
              <label htmlFor="profileImage" className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full cursor-pointer transition">
                <FaCamera />
              </label>
              <input id="profileImage" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} />
            <InputField label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
            <InputField label="University" name="university" value={formData.university} onChange={handleChange} />
            <InputField label="Semester" name="semester" value={formData.semester} onChange={handleChange} />
            <InputField label="Location" name="location" value={formData.location} onChange={handleChange} />
            <InputField label="GitHub" name="github" value={formData.github} onChange={handleChange} />
            <InputField label="LinkedIn" name="linkedin" value={formData.linkedin} onChange={handleChange} />
          </div>

          <div className="mt-6">
            <label className="block mb-2 font-medium">Bio</label>
            <textarea rows="4" name="bio" value={formData.bio} onChange={handleChange} className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="mt-8">
            <label className="block mb-3 font-medium">Skills</label>
            <div className="flex gap-3">
              <input type="text" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={handleSkillKey} placeholder="Add skill and press Enter" className="flex-1 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
              <button type="button" onClick={addSkill} className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-lg flex items-center gap-2">
                <FaPlus /> Add
              </button>
            </div>
            <div className="flex flex-wrap gap-3 mt-5">
              {formData.skills.map((skill, index) => (
                <div key={index} className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full flex items-center gap-2">
                  {skill}
                  <button type="button" onClick={() => removeSkill(skill)} className="text-red-500 hover:text-red-700">
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-10">
            <button type="button" onClick={onClose} className="px-6 py-3 border rounded-lg hover:bg-gray-100 transition">Cancel</button>
            <button type="submit" disabled={loading} className={`px-8 py-3 rounded-lg text-white ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function InputField({ label, name, value, onChange }) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-700">{label}</label>
      <input type="text" name={name} value={value} onChange={onChange} className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
    </div>
  );
}

export default EditProfileModal;