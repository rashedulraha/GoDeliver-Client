import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, User, Search, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "How to Send a Parcel in Just 2 Hours with Go Deliver",
    excerpt:
      "Fastest intra-city delivery in Bangladesh. Learn step-by-step how to book a parcel in minutes and get it delivered within hours.",
    author: "Rahim Khan",
    date: "2025-12-05",
    readTime: "5 min read",
    category: "Tips & Tricks",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop",
    slug: "how-to-send-parcel-in-2-hours",
  },
  {
    id: 2,
    title: "Cheapest Way to Send Parcels Outside Dhaka",
    excerpt:
      "Deliver to any district or upazila starting at just ৳80. Discover the most cost-effective shipping methods for rural areas.",
    author: "Ayesha Siddika",
    date: "2025-11-28",
    readTime: "8 min read",
    category: "Guide",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop",
    slug: "cheapest-delivery-outside-dhaka",
  },
  {
    id: 3,
    title: "Earn ৳50,000+ Per Month as a Go Deliver Rider",
    excerpt:
      "Work full-time or part-time — your schedule, your choice. Learn how to join and maximize your daily earnings.",
    author: "Karim Hossain",
    date: "2025-11-20",
    readTime: "6 min read",
    category: "Rider",
    image:
      "https://images.unsplash.com/photo-1556742111-a301076d9d41?w=800&h=500&fit=crop",
    slug: "earn-50k-as-rider",
  },
  {
    id: 4,
    title: "7 Ways to Avoid Parcel Delays During Eid & Festivals",
    excerpt:
      "Ensure your gifts and orders arrive on time during peak seasons. Follow these proven tips used by thousands of smart senders.",
    author: "Fatema Akter",
    date: "2025-11-15",
    readTime: "4 min read",
    category: "Tips & Tricks",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=500&fit=crop",
    slug: "avoid-festival-delivery-delays",
  },
];

const Blog = () => {
  const [search, setSearch] = useState("");

  const filtered = blogPosts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-linear-to-br from-primary/10 via-base-100 to-accent/10">
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
};

export default Blog;
