import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client";
import VoteButton from "../components/VoteButton";
import CommentList from "../components/CommentList";
import Loader from "../components/Loader";
import { timeAgo } from "../utils/formatDate";

export default function ViewPost() {
  const { id } = useParams();
  const [opinion, setOpinion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOpinion();
  }, []);

  async function fetchOpinion() {
    setLoading(true);
    const { data, error } = await supabase
      .from("opinions")
      .select("id, title, category, body, created_at, votes(vote_type)")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
    } else {
      setOpinion(data);
    }
    setLoading(false);
  }

  if (loading) return <Loader />;

  if (!opinion) return <p>Opinion not found</p>;

  const totalVotes = opinion.votes
    ? opinion.votes.reduce((a, b) => a + b.vote_type, 0)
    : 0;

  return (
    <div>
      <h2>{opinion.title}</h2>
      <small>{opinion.category} • {timeAgo(opinion.created_at)}</small>
      <p>{opinion.body}</p>
      <VoteButton opinionId={opinion.id} currentVotes={totalVotes} />
      <CommentList opinionId={opinion.id} />
    </div>
  );
}
