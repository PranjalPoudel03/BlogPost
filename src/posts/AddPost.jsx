// import { useState } from "react";
// import { supabase } from "../client";
// import { useNavigate } from "react-router-dom";
// import "./AddPost.css"; 

// export default function AddPost() {
//   const navigate = useNavigate();
//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState("");
//   const [body, setBody] = useState("");

//   async function createOpinion(e) {
//     e.preventDefault();

//     const { data: { user } } = await supabase.auth.getUser();
//     if (!user) {
//       alert("Please log in to post.");
//       return;
//     }

//     const { error } = await supabase
//       .from("opinions")
//       .insert([{ title, category, body, user_id: user.id }]);

//     if (error) {
//       console.error(error);
//       alert("Error posting opinion");
//     } else {
//       navigate("/");
//     }
//   }

//   return (
//     <div className="add-post-container">
//       <div className="add-post-card">
//         <h2>📝 Share Your Unpopular Opinion</h2>
//         <form onSubmit={createOpinion}>
//           <input
//             type="text"
//             placeholder="Title..."
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Category..."
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           />
//           <textarea
//             placeholder="Your opinion..."
//             value={body}
//             onChange={(e) => setBody(e.target.value)}
//           />
//           <button type="submit" className="submit-btn">Post</button>
//         </form>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { supabase } from "../client";
import { useNavigate } from "react-router-dom";
import "./AddPost.css";

export default function AddPost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [body, setBody] = useState("");
  const [imageFile, setImageFile] = useState(null);

  async function createOpinion(e) {
    e.preventDefault();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert("Please log in to post.");
      return;
    }

    let imageUrl = null;

    // ✅ Upload image if selected
    if (imageFile) {
      const fileName = `${Date.now()}-${imageFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from("post-images") // storage bucket name
        .upload(fileName, imageFile);

      if (uploadError) {
        console.error("Image upload failed:", uploadError);
        alert("Image upload failed");
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("post-images")
        .getPublicUrl(fileName);

      imageUrl = publicUrlData.publicUrl;
    }

    // ✅ Insert opinion with optional image
    const { error } = await supabase
      .from("opinions")
      .insert([{ 
        title, 
        category, 
        body, 
        user_id: user.id,
        image_url: imageUrl 
      }]);

    if (error) {
      console.error(error);
      alert("Error posting opinion");
    } else {
      navigate("/");
    }
  }

  return (
    <div className="add-post-container">
      <div className="add-post-card">
        <h2>📝 Share Your Unpopular Opinion</h2>
        <form onSubmit={createOpinion}>
          <input
            type="text"
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Category..."
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <textarea
            placeholder="Your opinion..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          {/* ✅ File input for image */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          <button type="submit" className="submit-btn">Post</button>
        </form>
      </div>
    </div>
  );
}
