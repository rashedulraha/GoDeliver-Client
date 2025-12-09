import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, User, Search, ArrowRight } from "lucide-react";
import useRole from "../../Hooks/useRole";

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [search, setSearch] = useState("");
  const { role } = useRole();
  console.log(role);

  useEffect(() => {
    fetch("/blogPosts.json")
      .then((res) => res.json())
      .then((data) => setBlogPosts(data))
      .catch((err) => console.error("Failed to load blog posts:", err));
  }, []);

  const filtered = blogPosts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Hero */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-black mb-4">
            Go Deliver <span className="text-primary">Blog</span>
          </h1>
          <p className="text-lg text-base-content/70 mb-10">
            Tips, guides, rider stories, and the latest updates
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full py-2 pl-12 pr-4 rounded-full border border-base-300 shadow-md"
            />
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50" />
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filtered.length === 0 ? (
            <p className="text-center text-lg text-base-content/60">
              No posts found.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="rounded-xl overflow-hidden bg-base-200 shadow-lg hover:-translate-y-2 hover:shadow-2xl transition group">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition duration-500"
                  />

                  <div className="p-6 space-y-3">
                    <span className="badge badge-primary">{post.category}</span>

                    <h2 className="text-xl font-bold group-hover:text-primary transition line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-base-content/70 text-sm line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex justify-between text-sm text-base-content/60">
                      <p className="flex items-center gap-1">
                        <User className="w-4 h-4" /> {post.author}
                      </p>
                      <p className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />{" "}
                        {new Date(post.date).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center text-primary font-semibold">
                      Read More
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
