import { useState } from "react";
import { FaGithub, FaLinkedin, FaMapMarkerAlt, FaUniversity, FaSearchPlus } from "react-icons/fa";
import ImagePreviewModal from "./ImagePreviewModal";

function ProfileCard({ user }) {
  const [previewOpen, setPreviewOpen] = useState(false);

  // Safe skill parsing logic
  const getSkills = () => {
    if (!user.skills) return [];
    try {
      // Agar skills string hai (JSON.stringify), to parse karo, nahi to array return karo
      return typeof user.skills === "string" ? JSON.parse(user.skills) : user.skills;
    } catch (e) {
      return [];
    }
  };

  const skills = getSkills();

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Profile Image */}
          <div className="relative group">
            <img
              src={user.profileImage || "https://i.pravatar.cc/250"}
              alt="Profile"
              onClick={() => setPreviewOpen(true)}
              className="w-40 h-40 rounded-full object-cover border-4 border-blue-600 cursor-pointer transition duration-300 group-hover:scale-105"
            />
            <div
              onClick={() => setPreviewOpen(true)}
              className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center cursor-pointer"
            >
              <FaSearchPlus className="text-white text-3xl" />
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1">
            <h2 className="text-4xl font-bold">{user.name}</h2>
            <p className="text-gray-600 mt-3">{user.bio || "No bio added yet."}</p>
            
            <div className="flex flex-wrap gap-6 mt-5 text-gray-600">
              {user.university && (
                <div className="flex items-center gap-2">
                  <FaUniversity className="text-blue-600" />
                  {user.university}
                </div>
              )}
              {user.location && (
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-500" />
                  {user.location}
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-4 mt-6">
              {user.github && (
                <a href={user.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-gray-900 text-white px-5 py-3 rounded-lg hover:bg-black transition">
                  <FaGithub /> GitHub
                </a>
              )}
              {user.linkedin && (
                <a href={user.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition">
                  <FaLinkedin /> LinkedIn
                </a>
              )}
            </div>

            {/* Skills */}
            <div className="mt-10">
              <h3 className="text-xl font-bold mb-4">Skills</h3>
              {skills.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, index) => (
                    <span key={index} className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No skills added yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <ImagePreviewModal
        image={user.profileImage || "https://i.pravatar.cc/250"}
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
      />
    </>
  );
}

export default ProfileCard;