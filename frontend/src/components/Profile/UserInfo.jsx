function UserInfo({ user }) {

  return (

    <div className="bg-white rounded-xl shadow-lg p-8 mt-6">

      <h2 className="text-2xl font-bold mb-6">
        Personal Information
      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        <div>

          <p className="text-gray-500">
            Email
          </p>

          <p className="font-medium">
            {user.email}
          </p>

        </div>

        <div>

          <p className="text-gray-500">
            Phone
          </p>

          <p className="font-medium">
            {user.phone || "Not Added"}
          </p>

        </div>

        <div>

          <p className="text-gray-500">
            University
          </p>

          <p className="font-medium">
            {user.university || "Not Added"}
          </p>

        </div>

        <div>

          <p className="text-gray-500">
            Semester
          </p>

          <p className="font-medium">
            {user.semester || "Not Added"}
          </p>

        </div>

        <div>

          <p className="text-gray-500">
            Location
          </p>

          <p className="font-medium">
            {user.location || "Not Added"}
          </p>

        </div>

      </div>

    </div>

  );

}

export default UserInfo;