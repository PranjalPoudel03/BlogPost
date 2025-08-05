import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../client";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    fetchOpinion();
  }, []);

  async function fetchOpinion() {
    const { data, error } = await supabase
      .from("opinions")
      .select("*")
      .eq("id", id)
      .single();
    if (!error) {
      setTitle(data.title);
      setCategory(data.category);
      setBody(data.body);
    }
  }

  async function updateOpinion(e) {
    e.preventDefault();
    const { error } = await supabase
      .from("opinions")
      .update({ title, category, body })
      .eq("id", id);
    if (!error) navigate("/");
  }

  return (
    <form onSubmit={updateOpinion}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <input value={category} onChange={(e) => setCategory(e.target.value)} />
      <textarea value={body} onChange={(e) => setBody(e.target.value)} />
      <button type="submit">Update</button>
    </form>
  );
}
