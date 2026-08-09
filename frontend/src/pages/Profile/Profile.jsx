import { useEffect, useState } from "react";

import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";

import ProfileCard from "../../components/Profile/ProfileCard";
import UserInfo from "../../components/Profile/UserInfo";
import UserStats from "../../components/Profile/UserStats";
import ProfileCompletion from "../../components/Profile/ProfileCompletion";
import EditProfileButton from "../../components/Profile/EditProfileButton";

function Profile() {

  const [user, setUser] = useState(null);

  // ===============================
  // Load User
  // ===============================
  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {

      setUser(JSON.parse(storedUser));

    }

  }, []);

  // ===============================
  // Update User Without Reload
  // ===============================
  const updateUser = (updatedUser) => {

    setUser(updatedUser);

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

  };

  // ===============================
  // Loading
  // ===============================
  if (!user) {

    return (

      <>
        <DashboardNavbar />

        <section className="min-h-screen flex items-center justify-center bg-gray-100">

          <h2 className="text-2xl font-bold">

            Loading...

          </h2>

        </section>

      </>

    );

  }

  return (

    <>
      <DashboardNavbar />

      <section className="min-h-screen bg-gray-100 py-10 px-5">

        <div className="max-w-5xl mx-auto space-y-6">

          {/* Profile Card */}
          <ProfileCard user={user} />

          {/* User Information */}
          <UserInfo user={user} />

          {/* User Statistics */}
          <UserStats />

          {/* Profile Completion */}
          <ProfileCompletion user={user} />

          {/* Edit Profile */}
          <EditProfileButton
            user={user}
            updateUser={updateUser}
          />

        </div>

      </section>

    </>

  );

}

export default Profile;