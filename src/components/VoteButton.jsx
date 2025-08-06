import { useState, useEffect } from "react";
import { supabase } from "../client";

export default function VoteButton({ opinionId, currentVotes }) {
  const [votes, setVotes] = useState(currentVotes);

  // ✅ Sync with parent prop if it changes (real-time updates)
  useEffect(() => {
    setVotes(currentVotes);
  }, [currentVotes]);

  async function handleVote() {
    const { data, error } = await supabase
      .from("opinions")
      .update({ upvotes: votes + 1 })
      .eq("id", opinionId);

    if (!error) {
      setVotes(votes + 1);
    } else {
      console.error("Vote update error:", error);
    }
  }

  return (
    <button className="vote-btn" onClick={handleVote}>
      👍 {votes}
    </button>
  );
}
