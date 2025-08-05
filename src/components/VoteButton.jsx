import { supabase } from "../client";
import { useState } from "react";

export default function VoteButton({ opinionId, currentVotes }) {
  const [votes, setVotes] = useState(currentVotes);

  async function handleVote() {
    const { error } = await supabase
      .from("votes")
      .insert([{ opinion_id: opinionId, vote_type: 1 }]);
    if (!error) setVotes(votes + 1);
  }

  return <button onClick={handleVote}>👍 {votes}</button>;
}
