import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../client";
import "./EditPost.css";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    fetchOpinion();
  }, []);

  async function fetchOpinion() {
    const { data, error } = await supabase
      .from("opinions")
      .select("*")
      .eq("id", id)
      .single();

    if (!error && data) {
      setTitle(data.title);
      setCategory(data.category);
      setBody(data.body);
    }
  }

  async function updateOpinion(e) {
    e.preventDefault();

    const { error } = await supabase
      .from("opinions")
      .update({ title, category, body })
      .eq("id", id);

    if (!error) navigate("/profile");
  }

  return (
    <div className="edit-post-container">
      <div className="edit-post-card">
        <h2>Edit Your Opinion</h2>
        <form onSubmit={updateOpinion} className="edit-post-form">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Your opinion..."
          />
          <button type="submit" className="update-btn">Update</button>
        </form>
      </div>
    </div>
  );
}
