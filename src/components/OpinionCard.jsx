// import { Link } from "react-router-dom";
// import VoteButton from "./VoteButton";
// import { formatDistanceToNow } from "date-fns";

// export default function OpinionCard({ opinion }) {
//   const totalVotes = opinion.votes
//     ? opinion.votes.reduce((a, b) => a + b.vote_type, 0)
//     : 0;

//   return (
//     <div className="opinion-card">
//       {/* Title clickable to view post */}
//       <Link to={`/view/${opinion.id}`}>
//         <h3>{opinion.title}</h3>
//       </Link>

//       {/* Category + Time */}
//       <small>
//         {opinion.category} •{" "}
//         {opinion.created_at &&
//           formatDistanceToNow(new Date(opinion.created_at), {
//             addSuffix: true,
//           })}
//       </small>

//       {/* Body */}
//       <p className="opinion-body">{opinion.body}</p>
// {/* 
//       <VoteButton opinionId={opinion.id} currentVotes={totalVotes} /> */}
//       <VoteButton opinionId={opinion.id} currentVotes={opinion.upvotes || 0} />

//     </div>
//   );
// }

import { Link } from "react-router-dom";
import VoteButton from "./VoteButton";
import { formatDistanceToNow } from "date-fns";

export default function OpinionCard({ opinion }) {
  return (
    <div className="opinion-card">
      {/* ✅ Show Image if available */}
      {opinion.image_url && (
        <Link to={`/view/${opinion.id}`}>
          <img
            src={opinion.image_url}
            alt={opinion.title}
            className="card-image"
          />
        </Link>
      )}

      {/* Title clickable to view post */}
      <Link to={`/view/${opinion.id}`}>
        <h3>{opinion.title}</h3>
      </Link>

      {/* Category + Time */}
      <small>
        {opinion.category} •{" "}
        {opinion.created_at &&
          formatDistanceToNow(new Date(opinion.created_at), {
            addSuffix: true,
          })}
      </small>

      {/* Body */}
      <p className="opinion-body">{opinion.body}</p>

      {/* Upvote Button */}
      <VoteButton opinionId={opinion.id} currentVotes={opinion.upvotes || 0} />
    </div>
  );
}
