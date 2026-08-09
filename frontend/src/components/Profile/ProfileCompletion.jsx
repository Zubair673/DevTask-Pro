function ProfileCompletion({ user }) {

  const fields = [
    user.name,
    user.email,
    user.phone,
    user.bio,
    user.university,
    user.semester,
    user.location,
    user.github,
    user.linkedin,
    user.profileImage,
    user.skills?.length > 0,
  ];

  const completed = fields.filter(Boolean).length;

  const percentage = Math.round(
    (completed / fields.length) * 100
  );

  return (

    <div className="bg-white rounded-xl shadow-lg p-8 mt-6">

      <h2 className="text-2xl font-bold mb-6">

        Profile Completion

      </h2>

      <div className="w-full bg-gray-200 rounded-full h-4">

        <div
          className="bg-blue-600 h-4 rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

      <p className="mt-3 text-gray-700 font-medium">

        {percentage}% Completed

      </p>

      <div className="grid md:grid-cols-2 gap-3 mt-6">

        <Status label="Name" done={!!user.name} />
        <Status label="Email" done={!!user.email} />
        <Status label="Phone" done={!!user.phone} />
        <Status label="Bio" done={!!user.bio} />
        <Status label="University" done={!!user.university} />
        <Status label="Semester" done={!!user.semester} />
        <Status label="Location" done={!!user.location} />
        <Status label="GitHub" done={!!user.github} />
        <Status label="LinkedIn" done={!!user.linkedin} />
        <Status label="Profile Photo" done={!!user.profileImage} />
        <Status
          label="Skills"
          done={user.skills?.length > 0}
        />

      </div>

    </div>

  );

}

function Status({ label, done }) {

  return (

    <div className="flex items-center gap-3">

      <span className="text-xl">

        {done ? "✅" : "❌"}

      </span>

      <span className="font-medium">

        {label}

      </span>

    </div>

  );

}

export default ProfileCompletion;