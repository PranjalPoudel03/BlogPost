import { useEffect, useState } from "react";
import { supabase } from "../client";
import OpinionCard from "../components/OpinionCard";
import Loader from "../components/Loader";

export default function HomePage() {
  const [opinions, setOpinions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOpinions();
  }, []);

  async function fetchOpinions() {
    setLoading(true);
    const { data, error } = await supabase
      .from("opinions")
      .select("id, title, category, body, created_at, votes(vote_type)")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setOpinions(data);
    }
    setLoading(false);
  }

  if (loading) return <Loader />;

  return (
    <div>
      <h1>Unpopular Opinions</h1>
      {opinions.map((opinion) => (
        <OpinionCard key={opinion.id} opinion={opinion} />
      ))}
    </div>
  );
}
