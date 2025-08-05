import { useState } from "react";
import { supabase } from "../client";
import { useNavigate } from "react-router-dom";

export default function AddPost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [body, setBody] = useState("");

  async function createOpinion(e) {
    e.preventDefault();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert("Please log in to post.");
      return;
    }

    const { error } = await supabase
      .from("opinions")
      .insert([{ title, category, body, user_id: user.id }]);

    if (error) {
      console.error(error);
      alert("Error posting opinion");
    } else {
      navigate("/");
    }
  }

  return (
    <div>
      <h2>Share Your Unpopular Opinion</h2>
      <form onSubmit={createOpinion}>
        <input
          type="text"
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category..."
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <textarea
          placeholder="Your opinion..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}
