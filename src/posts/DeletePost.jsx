import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../client";

export default function DeletePost() {
  const { id } = useParams();
  const navigate = useNavigate();

  async function handleDelete() {
    const { error } = await supabase
      .from("opinions")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete error:", error);
      alert("Error deleting post: " + error.message);
    } else {
      navigate("/");
    }
  }

  return (
    <div>
      <p>Are you sure you want to delete this post?</p>
      <button onClick={handleDelete}>Yes, Delete</button>
      <button onClick={() => navigate("/")}>Cancel</button>
    </div>
  );
}
