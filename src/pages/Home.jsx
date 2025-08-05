import { useEffect, useState } from "react";
import { supabase } from "./client";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [opinions, setOpinions] = useState([]);

  useEffect(() => {
    fetchOpinions();
  }, []);

  async function fetchOpinions() {
    const { data, error } = await supabase
      .from("opinions")
      .select("id, title, category, created_at")
      .order("created_at", { ascending: false });

    if (error) console.error(error);
    else setOpinions(data);
  }

  return (
    <div>
      <h1>Unpopular Opinions</h1>
      <Link to="/add">Post New Opinion</Link>
      {opinions.map((opinion) => (
        <div key={opinion.id}>
          <Link to={`/view/${opinion.id}`}>
            <h3>{opinion.title}</h3>
          </Link>
          <p>Category: {opinion.category}</p>
          <small>{new Date(opinion.created_at).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}
