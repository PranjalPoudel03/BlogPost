// import { useEffect, useState } from "react";
// import { supabase } from "../client";

// export default function CommentList({ opinionId }) {
//   const [comments, setComments] = useState([]);
//   const [body, setBody] = useState("");

//   useEffect(() => {
//     fetchComments();
//   }, [opinionId]);

//   async function fetchComments() {
//     const { data, error } = await supabase
//       .from("comments")
//       .select("body, created_at")
//       .eq("opinion_id", opinionId)
//       .order("created_at", { ascending: true });

//     if (error) {
//       console.error("Error fetching comments:", error);
//     } else {
//       setComments(data);
//     }
//   }

//   async function addComment(e) {
//     e.preventDefault();

//     const { data: { user }, error: userError } = await supabase.auth.getUser();
//     if (userError || !user) {
//       console.error("User not logged in");
//       return;
//     }

//     const { error } = await supabase
//       .from("comments")
//       .insert([{ opinion_id: opinionId, body, user_id: user.id }]);

//     if (error) {
//       console.error("Error adding comment:", error);
//     } else {
//       setBody("");
//       fetchComments();
//     }
//   }

//   return (
//     <div>
//       <h3>Comments</h3>
//       {comments.length === 0 ? (
//         <p>No comments yet.</p>
//       ) : (
//         comments.map((c, idx) => <p key={idx}>{c.body}</p>)
//       )}

//       <form onSubmit={addComment}>
//         <input
//           value={body}
//           onChange={(e) => setBody(e.target.value)}
//           placeholder="Add comment..."
//           required
//         />
//         <button type="submit">Post</button>
//       </form>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { supabase } from "../client";
import "./CommentList.css"; // ✅ Import styles

export default function CommentList({ opinionId }) {
  const [comments, setComments] = useState([]);
  const [body, setBody] = useState("");

  useEffect(() => {
    fetchComments();
  }, [opinionId]);

  async function fetchComments() {
    const { data, error } = await supabase
      .from("comments")
      .select("body, created_at")
      .eq("opinion_id", opinionId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching comments:", error);
    } else {
      setComments(data);
    }
  }

  async function addComment(e) {
    e.preventDefault();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error("User not logged in");
      return;
    }

    const { error } = await supabase
      .from("comments")
      .insert([{ opinion_id: opinionId, body, user_id: user.id }]);

    if (error) {
      console.error("Error adding comment:", error);
    } else {
      setBody("");
      fetchComments();
    }
  }

  return (
    <div className="comments-container">
      <h3 className="comments-title">Comments</h3>

      {comments.length === 0 ? (
        <p className="no-comments">No comments yet.</p>
      ) : (
        comments.map((c, idx) => (
          <div key={idx} className="comment-item">
            {c.body}
          </div>
        ))
      )}

      <form onSubmit={addComment} className="comment-form">
        <input
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Leave a comment..."
          required
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}
