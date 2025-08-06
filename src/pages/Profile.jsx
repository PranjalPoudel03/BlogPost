import { useEffect, useState } from "react";
import { supabase } from "../client";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [opinions, setOpinions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = supabase.auth.getUser();
    currentUser.then(({ data }) => {
      setUser(data.user);
      if (data.user) fetchOpinions(data.user.id);
    });
  }, []);

  async function fetchOpinions(userId) {
    const { data, error } = await supabase
      .from("opinions")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (!error) setOpinions(data);
  }

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const { error } = await supabase.from("opinions").delete().eq("id", id);
      if (!error) {
        setOpinions(opinions.filter((op) => op.id !== id));
      }
    }
  }

  if (!user)
    return <p className="login-message">Please log in to view your profile.</p>;

  return (
    <div className="profile-container">
      <h2 className="profile-email">{user.email}</h2>
      <h3 className="section-title">Your Opinions</h3>

      <div className="profile-opinions-grid">
        {opinions.length > 0 ? (
          opinions.map((op) => (
            <div key={op.id} className="profile-opinion-card">
              <h4 className="profile-opinion-title">{op.title}</h4>
              <p className="profile-opinion-body">{op.body}</p>

              <div className="card-actions">
                <Link to={`/edit/${op.id}`} className="edit-btn">
                  Edit
                </Link>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(op.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-opinions">
            You haven't posted any opinions yet.
          </p>
        )}
      </div>
    </div>
  );
}
