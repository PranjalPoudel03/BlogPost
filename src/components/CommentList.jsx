import { useEffect, useState } from "react";
import { supabase } from "../client";

export default function CommentList({ opinionId }) {
  const [comments, setComments] = useState([]);
  const [body, setBody] = useState("");

  useEffect(() => {
    fetchComments();
  }, []);

  async function fetchComments() {
    const { data, error } = await supabase
      .from("comments")
      .select("body, created_at")
      .eq("opinion_id", opinionId)
      .order("created_at", { ascending: true });

    if (!error) setComments(data);
  }

  async function addComment(e) {
    e.preventDefault();
    const { error } = await supabase
      .from("comments")
      .insert([{ opinion_id: opinionId, body }]);
    if (!error) {
      setBody("");
      fetchComments();
    }
  }

  return (
    <div>
      <h4>Comments</h4>
      {comments.map((c, idx) => (
        <p key={idx}>{c.body}</p>
      ))}
      <form onSubmit={addComment}>
        <input
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Add comment..."
          required
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}
