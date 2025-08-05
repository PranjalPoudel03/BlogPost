import VoteButton from "./VoteButton";
import { Link } from "react-router-dom";

export default function OpinionCard({ opinion }) {
  const totalVotes = opinion.votes ? opinion.votes.reduce((a, b) => a + b.vote_type, 0) : 0;

  return (
    <div>
      <Link to={`/view/${opinion.id}`}>
        <h3>{opinion.title}</h3>
      </Link>
      <p>{opinion.body}</p>
      <small>{opinion.category}</small>
      <VoteButton opinionId={opinion.id} currentVotes={totalVotes} />
    </div>
  );
}
