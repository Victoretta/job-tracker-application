import { Routes, Route, Navigate } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import BrowseJobs from "./pages/BrowseJobs";
import MyApplications from "./pages/MyApplications";
import JobDetails from "./pages/JobDetails";
import ManageApplications from "./pages/ManageApplications";
import EditJob from "./pages/EditJob";
import Profile from "./pages/Profile";
import Jobs from "./pages/Jobs";
import CreateJob from "./pages/CreateJob";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AdminApplications from "./pages/AdminApplications";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminUsers from "./pages/AdminUsers";
function App() {
  return (
    
    <Routes>
      
      {/* Redirect Home */}
      <Route path="/" element={<Home />} />

      {/* Public Routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="/reset-password/:token"
        element={<ResetPassword />}
      />

      {/* User Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin Dashboard */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
        
      />
        {/*publicjob route*/}
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <BrowseJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-applications"
          element={
            <ProtectedRoute>
              <MyApplications />
            </ProtectedRoute>
          }
/>
<Route
  path="/jobs/:id"
  element={
    <ProtectedRoute>
      <JobDetails />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/jobs/:jobId/applications"
  element={
    <AdminRoute>
      <ManageApplications />
    </AdminRoute>
  }
/>
<Route
  path="/admin/jobs"
  element={
    <AdminRoute>
      <Jobs />
    </AdminRoute>
  }
/>

<Route
  path="/admin/jobs/create"
  element={
    <AdminRoute>
      <CreateJob />
    </AdminRoute>
  }
/>

<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/jobs/edit/:id"
  element={
    <AdminRoute>
      <EditJob />
    </AdminRoute>
  }
/>
{/* <Route path="/profile" element={<Profile />} /> */}

<Route
  path="/admin/applications"
  element={
    <AdminRoute>
      <AdminApplications />
    </AdminRoute>
  }
/>

<Route
  path="/admin/analytics"
  element={
    <AdminRoute>
      <AdminAnalytics />
    </AdminRoute>
  }
/>

<Route
  path="/admin/users"
  element={
    <AdminRoute>
      <AdminUsers />
    </AdminRoute>
  }
/>

<Route path="/about" element={<About />} />
<Route path="/contact" element={<Contact />} />




      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;