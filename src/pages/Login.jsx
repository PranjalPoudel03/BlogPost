import { useState } from "react";
import { supabase } from "../client";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
    } else {
      navigate("/");
    }
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {/* Title */}
      <h1>Unpopular Opinions</h1>

      {/* Login Form */}
      <form onSubmit={handleLogin} style={{ marginTop: "20px" }}>
        <input
          type="email"
          placeholder="Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      {/* Signup Link */}
      <p style={{ marginTop: "10px" }}>
        Don’t have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
}
