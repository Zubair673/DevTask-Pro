import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import WelcomeCard from "../../components/WelcomeCard/WelcomeCard";
import StatsCards from "../../components/StatsCards/StatsCards";
import SearchBar from "../../components/Dashboard/SearchBar";
import FilterBar from "../../components/Dashboard/FilterBar";
import TaskList from "../../components/Dashboard/TaskList";

function Dashboard() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authError, setAuthError] = useState("");

  // ===============================
  // Authentication Check
  // ===============================
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      setAuthError("");
    } catch (error) {
      console.error("Authentication check failed:", error);

      setAuthError(
        "Unable to verify your login session. Please login again."
      );
    } finally {
      setCheckingAuth(false);
    }
  }, [navigate]);

  // ===============================
  // Authentication Loading
  // ===============================
  if (checkingAuth) {
    return (
      <>
        <DashboardNavbar />

        <main className="min-h-screen bg-gray-100 px-5 py-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex min-h-[60vh] items-center justify-center">
              <div className="rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-gray-950/5">
                <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />

                <h2 className="text-lg font-bold text-gray-900">
                  Loading Dashboard...
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Checking your login session.
                </p>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  // ===============================
  // Authentication Error
  // ===============================
  if (authError) {
    return (
      <>
        <DashboardNavbar />

        <main className="min-h-screen bg-gray-100 px-5 py-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex min-h-[60vh] items-center justify-center">
              <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-red-100">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                  <span className="text-2xl">!</span>
                </div>

                <h2 className="mt-5 text-xl font-bold text-gray-900">
                  Session Error
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {authError}
                </p>

                <button
                  type="button"
                  onClick={() => navigate("/login", { replace: true })}
                  className="mt-6 cursor-pointer rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
                >
                  Go to Login
                </button>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  // ===============================
  // Dashboard
  // ===============================
  return (
    <>
      <DashboardNavbar />

      <main className="min-h-screen bg-gray-100 px-5 py-8">
        <div className="mx-auto max-w-7xl">

          {/* Welcome */}
          <WelcomeCard />

          {/* Statistics */}
          <StatsCards />

          {/* Search */}
          <SearchBar
            search={search}
            setSearch={setSearch}
          />

          {/* Filters */}
          <FilterBar
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />

          {/* Tasks */}
          <TaskList
            search={search}
            priorityFilter={priorityFilter}
            statusFilter={statusFilter}
          />

        </div>
      </main>
    </>
  );
}

export default Dashboard;