import { useEffect, useState } from "react";
import opinionLogo from "./assets/opinion.png";
import { supabase } from "./client";
import OpinionCard from "./components/OpinionCard";
import Loader from "./components/Loader.jsx";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [opinions, setOpinions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortRecent, setSortRecent] = useState(false);

  useEffect(() => {
    fetchOpinions();
  }, [sortRecent]);

  // ✅ Real-time updates for upvotes & new posts
  useEffect(() => {
    const channel = supabase
      .channel("opinions-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "opinions" },
        () => {
          fetchOpinions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchOpinions() {
    setLoading(true);

    let query = supabase
      .from("opinions")
      .select(`
        id,
        title,
        category,
        body,
        created_at,
        upvotes
      `)
      .order("created_at", { ascending: !sortRecent }); // ✅ Works both ways now

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching opinions:", error);
    } else {
      setOpinions(data);
    }

    setLoading(false);
  }

  // ✅ Filter by search term (case-insensitive)
  const filteredOpinions = opinions.filter((op) =>
    op.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loader />;

  return (
    <div className="homepage-container">
      <div className="logo-section">
        <div className="logo-header">
          <img
            src={opinionLogo}
            alt="Unpopular Opinions Logo"
            className="logo-img"
          />
          <h1>Unpopular Opinions</h1>
        </div>

        <div className="top-bar">
          {/* Post Opinion Button */}
          <Link to="/add" className="post-btn">
            Post New Opinion
          </Link>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          {/* Sort Toggle */}
          <button
            className="recent-btn"
            onClick={() => setSortRecent(!sortRecent)}
          >
            {sortRecent ? "Oldest First" : "Most Recent"}
          </button>
        </div>
      </div>

      {/* Opinions Grid */}
      {filteredOpinions.length === 0 ? (
        <p>No opinions found.</p>
      ) : (
        <div className="opinions-grid">
          {filteredOpinions.map((opinion) => (
            <OpinionCard key={opinion.id} opinion={opinion} />
          ))}
        </div>
      )}
    </div>
  );
}
