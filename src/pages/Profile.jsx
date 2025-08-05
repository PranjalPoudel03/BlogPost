import { useEffect, useState } from "react";
import { supabase } from "../client";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [opinions, setOpinions] = useState([]);

  useEffect(() => {
    const currentUser = supabase.auth.getUser();
    currentUser.then(({ data }) => {
      setUser(data.user);
      if (data.user) fetchOpinions(data.user.id);
    });
  }, []);

  async function fetchOpinions(userId) {
    const { data, error } = await supabase
      .from("opinions")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (!error) setOpinions(data);
  }

  if (!user) return <p>Please log in to view your profile.</p>;

  return (
    <div>
      <h2>{user.email}</h2>
      <h3>Your Opinions</h3>
      {opinions.map((op) => (
        <div key={op.id}>
          <h4>{op.title}</h4>
          <p>{op.body}</p>
        </div>
      ))}
    </div>
  );
}
