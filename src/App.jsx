import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./client";
import HomePage from "./HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddPost from "./posts/AddPost";
import ViewPost from "./posts/ViewPost";
import Profile from "./pages/Profile";
import Loader from "./components/Loader";
import Navbar from "./components/NavBar";
import EditPost from "./posts/EditPost";   // ✅ Added
import DeletePost from "./posts/DeletePost"; // ✅ Added
import "./App.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current user
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    // Listen to auth changes
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  if (loading) return <Loader />;

  return (
    <Router>
      {user && <Navbar />}
      <Routes>
        {/* If logged in, show HomePage, else redirect to login */}
        <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add" element={user ? <AddPost /> : <Navigate to="/login" />} />
        <Route path="/view/:id" element={user ? <ViewPost /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />

        {/* ✅ Edit/Delete routes */}
        <Route path="/edit/:id" element={user ? <EditPost /> : <Navigate to="/login" />} />
        <Route path="/delete/:id" element={user ? <DeletePost /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
