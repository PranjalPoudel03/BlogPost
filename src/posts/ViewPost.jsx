// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { supabase } from "../client";
// import VoteButton from "../components/VoteButton";
// import Loader from "../components/Loader";
// import CommentList from "../components/CommentList";
// import { formatDistanceToNow } from "date-fns";
// import "./ViewPost.css";

// export default function ViewPost() {
//   const { id } = useParams();
//   const [opinion, setOpinion] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchOpinion();
//   }, [id]);

//   // ✅ Real-time upvote updates
//   useEffect(() => {
//     const channel = supabase
//       .channel("opinion-updates")
//       .on(
//         "postgres_changes",
//         { event: "UPDATE", schema: "public", table: "opinions", filter: `id=eq.${id}` },
//         (payload) => {
//           setOpinion((prev) => ({ ...prev, upvotes: payload.new.upvotes }));
//         }
//       )
//       .subscribe();

//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, [id]);

//   async function fetchOpinion() {
//     setLoading(true);
//     const { data, error } = await supabase
//       .from("opinions")
//       .select("id, title, category, body, created_at, upvotes, image_url") // ✅ include image_url
//       .eq("id", id)
//       .single();

//     if (error) {
//       console.error("Error fetching opinion:", error);
//     } else {
//       setOpinion(data);
//     }
//     setLoading(false);
//   }

//   if (loading) return <Loader />;
//   if (!opinion) return <p>Opinion not found.</p>;

//   return (
//     <div className="viewpost-container">
//       <div className="viewpost-card">
//         <h2 className="viewpost-title">{opinion.title}</h2>
//         <p className="viewpost-meta">
//           {opinion.category} •{" "}
//           {formatDistanceToNow(new Date(opinion.created_at), { addSuffix: true })}
//         </p>

//         <p className="viewpost-body">{opinion.body}</p>

//         {/* ✅ Show image only if it exists */}
//         {opinion.image_url && (
//           <img
//             src={opinion.image_url}
//             alt={opinion.title}
//             className="viewpost-image"
//           />
//         )}

//         <div className="viewpost-vote">
//           <VoteButton opinionId={opinion.id} currentVotes={opinion.upvotes || 0} />
//         </div>

//         <CommentList opinionId={opinion.id} />
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client";
import VoteButton from "../components/VoteButton";
import Loader from "../components/Loader";
import CommentList from "../components/CommentList";
import { formatDistanceToNow } from "date-fns";
import "./ViewPost.css";

export default function ViewPost() {
  const { id } = useParams();
  const [opinion, setOpinion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Add fullscreen override class
    document.body.classList.add("viewpost-open");
    return () => {
      document.body.classList.remove("viewpost-open");
    };
  }, []);

  useEffect(() => {
    fetchOpinion();
  }, [id]);

  useEffect(() => {
    const channel = supabase
      .channel("opinion-updates")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "opinions", filter: `id=eq.${id}` },
        (payload) => {
          setOpinion((prev) => ({ ...prev, upvotes: payload.new.upvotes }));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id]);

  async function fetchOpinion() {
    setLoading(true);
    const { data, error } = await supabase
      .from("opinions")
      .select("id, title, category, body, created_at, upvotes, image_url")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching opinion:", error);
    } else {
      setOpinion(data);
    }
    setLoading(false);
  }

  if (loading) return <Loader />;
  if (!opinion) return <p>Opinion not found.</p>;

  return (
    <div className="viewpost-container">
      <div className="viewpost-card">
        <h2 className="viewpost-title">{opinion.title}</h2>
        <p className="viewpost-meta">
          {opinion.category} •{" "}
          {formatDistanceToNow(new Date(opinion.created_at), { addSuffix: true })}
        </p>

        <p className="viewpost-body">{opinion.body}</p>

        {opinion.image_url && (
          <img
            src={opinion.image_url}
            alt={opinion.title}
            className="viewpost-image"
          />
        )}

        <div className="viewpost-vote">
          <VoteButton opinionId={opinion.id} currentVotes={opinion.upvotes || 0} />
        </div>

        <CommentList opinionId={opinion.id} />
      </div>
    </div>
  );
}
