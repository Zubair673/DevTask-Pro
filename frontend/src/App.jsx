import { Routes, Route } from "react-router-dom";

// Home
import Home from "./pages/Home/Home";

// Authentication
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";

// Dashboard
import Dashboard from "./pages/Dashboard/Dashboard";

// Tasks
import AddTask from "./pages/AddTask/AddTask";
import EditTask from "./pages/EditTask/EditTask";

// Profile
import Profile from "./pages/Profile/Profile";

// projects
import Projects from "./pages/Projects/Projects";
// Protected Route
import ProtectedRoute from "./components/ProtectedRoute";

// Guest Route
import GuestRoute from "./components/GuestRoute";

// Not Found
import NotFound from "./pages/NotFound/NotFound";

function App() {

  return (

    <Routes>

      {/* ================= Home ================= */}

      <Route
        path="/"
        element={
          <GuestRoute>
            <Home />
          </GuestRoute>
        }
      />

      {/* ================= Login ================= */}

      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />

      {/* ================= Register ================= */}

      <Route
        path="/register"
        element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        }
      />

      {/* ================= Forgot Password ================= */}

      <Route
        path="/forgot-password"
        element={
          <GuestRoute>
            <ForgotPassword />
          </GuestRoute>
        }
      />

      {/* ================= Dashboard ================= */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

<Route
  path="/projects"
  element={
    <ProtectedRoute>
      <Projects />
    </ProtectedRoute>
  }
/>
      {/* ================= Add Task ================= */}

      <Route
        path="/add-task"
        element={
          <ProtectedRoute>
            <AddTask />
          </ProtectedRoute>
        }
      />

      {/* ================= Edit Task ================= */}

      <Route
        path="/edit-task/:id"
        element={
          <ProtectedRoute>
            <EditTask />
          </ProtectedRoute>
        }
      />

      {/* ================= Profile ================= */}

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* ================= 404 ================= */}

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>

  );

}

export default App;