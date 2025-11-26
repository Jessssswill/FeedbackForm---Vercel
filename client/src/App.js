import React, { useState, useEffect } from "react";

const NeonBackground = () => (
  <>
    <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />
    <div className="pointer-events-none fixed top-[10%] left-[5%] w-[420px] h-[420px] bg-cyan-500/20 blur-[140px] animate-glow" />
    <div className="pointer-events-none fixed bottom-[10%] right-[5%] w-[420px] h-[420px] bg-purple-500/20 blur-[140px] animate-glow delay-500" />
  </>
);

function App() {
  const [view, setView] = useState("form");
  const [pageAnimation, setPageAnimation] = useState("softFade");

  return (
    <div className="min-h-screen bg-[#0d1525] text-gray-200 font-sans relative overflow-hidden">
      <NeonBackground />

      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0d1525]/80 backdrop-blur-xl shadow-[0_0_30px_rgba(0,255,255,0.08)] transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,255,255,0.15)]">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center max-w-6xl">

          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setView("form")}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xl font-bold text-white shadow-[0_0_15px_rgba(0,255,255,0.5)] group-hover:scale-110 transition-transform animate-softBounce">
              B
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight">
                Feedback <span className="text-cyan-400">System</span>
              </h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest">
                Internal RnD Division
              </p>
            </div>
          </div>

          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 backdrop-blur-md shadow-inner">
            {["form", "admin"].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setPageAnimation(tab === "admin" ? "smoothDrop" : "softFade");
                  setView(tab);
                }}
                className={`px-6 py-2 rounded-lg text-sm font-bold capitalize transition-all duration-300
                  ${
                    view === tab
                      ? "bg-cyan-500/20 text-cyan-400 border border-cyan-400/30 shadow-[0_0_12px_rgba(0,255,255,0.25)]"
                      : "text-slate-400 hover:bg-white/10 hover:text-white"
                  }`}
              >
                {tab === "form" ? "Formulir" : "Admin Panel"}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className={`container mx-auto max-w-6xl p-6 md:p-10 relative z-10 animate-${pageAnimation}`}>
        {view === "form" ? <FeedbackForm /> : <AdminPanel />}
      </div>

      <footer className="text-center text-slate-500 text-sm py-10 border-t border-white/10">
        © 2025 BNCC Research & Development
        <span className="text-cyan-500/50"> | </span>
        Semi-Neon Glass UI
      </footer>
    </div>
  );
}

function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    eventName: "",
    division: "",
    rating: 0,
    comment: "",
    suggestion: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hoverStar, setHoverStar] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.rating === 0) return alert("Mohon berikan rating ⭐");

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));

    try {
      await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setSubmitted(true);
    } catch (err) {
      alert("Gagal koneksi ke server backend!");
    } finally {
      setLoading(false);
    }
  };

  if (submitted)
    return (
      <div className="bg-white/5 p-12 rounded-3xl shadow-[0_0_20px_rgba(0,255,255,0.15)] backdrop-blur-xl border border-white/10 text-center max-w-lg mx-auto mt-10 animate-scaleUp">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center mx-auto text-5xl text-white shadow-[0_0_20px_rgba(0,255,150,0.4)]">
          ✓
        </div>
        <h2 className="text-3xl font-bold mt-6">Terima Kasih!</h2>
        <p className="text-slate-400 mt-3 mb-8">
          Masukan Anda telah berhasil disimpan.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: "",
              email: "",
              eventName: "",
              division: "",
              rating: 0,
              comment: "",
              suggestion: "",
            });
          }}
          className="px-8 py-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-300/30 shadow-[0_0_10px_rgba(0,255,255,0.2)] transition-all"
        >
          Isi Form Lagi
        </button>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-slideFade">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#0d233d] to-[#0c2038] p-8 rounded-t-3xl border border-white/10 shadow-[0_0_25px_rgba(0,255,255,0.10)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/20 blur-2xl -mr-10 -mt-10" />
        <h2 className="text-3xl font-bold">Event Feedback Form</h2>
        <p className="text-blue-200/80 mt-2">
          Please share your feedback about the event.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* SECTION 1 */}
        <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.55)] transition-all duration-500 hover:scale-[1.01]">
          <h3 className="text-xl font-bold flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
            <span className="w-8 h-8 rounded-md bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-400/30">
              1
            </span>
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Full Name</label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#08111f] border border-white/10 text-white p-4 rounded-xl focus:border-cyan-400 focus:shadow-[0_0_12px_rgba(0,255,255,0.4)] transition-all outline-none"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Email Address</label>
              <input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#08111f] border border-white/10 text-white p-4 rounded-xl focus:border-cyan-400 outline-none"
                placeholder="Enter email"
              />
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Division</label>
            <select
              required
              value={formData.division}
              onChange={(e) => setFormData({ ...formData, division: e.target.value })}
              className="w-full bg-[#08111f] border border-white/10 text-white p-4 rounded-xl outline-none focus:border-cyan-400"
            >
              <option value="" disabled>Select your division</option>
              <option value="LnT">Learning & Training (LnT)</option>
              <option value="EEO">EEO</option>
              <option value="PR">Public Relations</option>
              <option value="HRD">HRD</option>
              <option value="RnD">Research & Development</option>
            </select>
          </div>
        </div>

        {/* SECTION 2 */}
        <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-[0_0_18px_rgba(0,255,255,0.08)]">
          <h3 className="text-xl font-bold flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
            <span className="w-8 h-8 rounded-md bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-400/30">
              2
            </span>
            Event Information
          </h3>
          <div className="mb-8">
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Event Name</label>
            <input
              required
              type="text"
              value={formData.eventName}
              onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
              className="w-full bg-[#08111f] border border-white/10 text-white p-4 rounded-xl focus:border-cyan-400 outline-none"
              placeholder="e.g. React Workshop"
            />
          </div>
          <div className="bg-[#0a1728] p-6 rounded-2xl border border-white/10 text-center">
            <label className="block text-sm font-bold text-slate-400 mb-4 uppercase tracking-widest">Overall Rating</label>
            <div className="flex justify-center gap-5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  onMouseEnter={() => setHoverStar(star)}
                  onMouseLeave={() => setHoverStar(0)}
                  className="transition-all hover:scale-150 active:scale-125 animate-[softScale_0.25s_ease-out]"
                >
                  <span className={`text-5xl transition-all ${star <= (hoverStar || formData.rating) ? "text-yellow-400 drop-shadow-[0_0_10px_rgba(255,255,150,0.4)]" : "text-slate-700"}`}>
                    ★
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 3 */}
        <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-[0_0_18px_rgba(0,255,255,0.08)]">
          <h3 className="text-xl font-bold flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
            <span className="w-8 h-8 rounded-md bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-400/30">
              3
            </span>
            Your Feedback
          </h3>
          <div className="mb-6">
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Comments</label>
            <textarea
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              placeholder="Share your thoughts..."
              className="w-full bg-[#08111f] border border-white/10 text-white p-4 rounded-xl h-32 outline-none focus:border-cyan-400 resize-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Suggestions</label>
            <textarea
              value={formData.suggestion}
              onChange={(e) => setFormData({ ...formData, suggestion: e.target.value })}
              placeholder="How can we improve?"
              className="w-full bg-[#08111f] border border-white/10 text-white p-4 rounded-xl h-32 outline-none focus:border-cyan-400 resize-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-cyan-500/30 to-blue-600/30 hover:from-cyan-500/40 hover:to-blue-600/40 border border-cyan-300/20 py-5 rounded-2xl text-lg font-bold text-white backdrop-blur-sm shadow-[0_0_20px_rgba(0,255,255,0.15)] active:scale-95 transition-all flex justify-center items-center gap-3"
        >
          {loading ? (
            <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          ) : (
            "Submit Feedback 🚀"
          )}
        </button>
      </form>
    </div>
  );
}

function AdminPanel() {
  const [feedback, setFeedback] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sort, setSort] = useState("newest");

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/feedback");
      const data = await res.json();
      setFeedback(data);
    } catch (err) {
      console.error("Error fetching feedback:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteFeedback = async (id) => {
    if (!window.confirm("Yakin ingin menghapus data ini?")) return;
    try {
      await fetch(`http://localhost:5000/api/feedback/${id}`, { method: "DELETE" });
      setFeedback((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      alert("Gagal menghapus data!");
    }
  };

  const filtered = feedback
    .filter((f) => {
      const term = search.toLowerCase();
      return (
        f.name.toLowerCase().includes(term) ||
        f.eventName.toLowerCase().includes(term)
      );
    })
    .filter((f) => {
      if (filterStatus === "all") return true;
      return (f.status || "open") === filterStatus;
    })
    .sort((a, b) => {
      if (sort === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sort === "rating_high") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="space-y-8 animate-softFade">

      {/* HEADER DASHBOARD */}
      <div className="bg-gradient-to-r from-[#0d233d] to-[#0c2038] p-8 rounded-3xl border border-white/10 shadow-[0_0_22px_rgba(0,255,255,0.08)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/20 blur-2xl" />
        <h2 className="text-3xl font-bold text-white">Admin Panel</h2>
        <p className="text-blue-200/80 mt-2">Manage all feedback submissions</p>
      </div>

      <div className="bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-xl shadow-lg flex flex-col md:flex-row gap-4 justify-between items-center">
        
        {/* LEFT: SEARCH */}
        <div className="w-full md:w-1/2 relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
          <input
            type="text"
            placeholder="Search name or event..."
            className="bg-[#08111f] border border-white/10 text-white py-3 pl-12 pr-4 rounded-xl w-full outline-none focus:border-cyan-400 transition-all placeholder-slate-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-3 w-full md:w-auto justify-end overflow-x-auto pb-1 md:pb-0">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-[#08111f] border border-white/10 text-white px-4 py-3 rounded-xl outline-none focus:border-cyan-400 cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in-review">In Review</option>
            <option value="resolved">Resolved</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-[#08111f] border border-white/10 text-white px-4 py-3 rounded-xl outline-none focus:border-cyan-400 cursor-pointer"
          >
            <option value="newest">Newest</option>
            <option value="rating_high">Highest Rating</option>
          </select>

          <button
            onClick={fetchData}
            className="px-6 py-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-300/20 transition font-bold whitespace-nowrap shadow-[0_0_15px_rgba(0,255,255,0.15)]"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 shadow-[0_0_20px_rgba(0,255,255,0.1)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white/10 border-b border-white/10 text-xs uppercase tracking-wider text-slate-300">
              <tr>
                <th className="p-6 font-bold">Name</th>
                <th className="p-6 font-bold">Division</th>
                <th className="p-6 font-bold text-center">Rating</th>
                <th className="p-6 font-bold text-center">Status</th>
                <th className="p-6 font-bold text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5 text-sm">
              {loading ? (
                <tr>
                  <td className="p-10 text-center text-slate-400" colSpan="5">
                    <span className="inline-block w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mr-2"></span>
                    Loading data...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td className="p-10 text-center text-slate-500" colSpan="5">
                    No feedback found.
                  </td>
              </tr>
              ) : (
                filtered.map((f) => (
                  <tr
                    key={f.id}
                    className="hover:bg-white/5 transition-colors hover:backdrop-blur-sm"
                  >
                    <td className="p-6 font-medium text-white">
                      {f.name}
                      <div className="text-xs text-slate-500 mt-1">{f.email}</div>
                    </td>

                    <td className="p-6 text-cyan-300 font-medium">
                      {f.division}
                      <div className="text-xs text-slate-500 mt-1 line-clamp-1 w-32">{f.eventName}</div>
                    </td>

                    <td className="p-6 text-center">
                      <span className="text-yellow-400 font-bold text-base">
                        {f.rating}
                      </span> 
                      <span className="text-yellow-400/50 ml-1">★</span>
                    </td>

                    <td className="p-6 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase border tracking-wide ${
                          (f.status || "open") === "open"
                            ? "bg-green-500/10 text-green-400 border-green-500/30"
                            : (f.status || "open") === "in-review"
                            ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
                            : "bg-slate-500/10 text-slate-400 border-slate-500/30"
                        }`}
                      >
                        {f.status || "open"}
                      </span>
                    </td>

                    <td className="p-6 text-center">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => setSelected(f)}
                          className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30 transition text-xs font-bold hover:shadow-[0_0_10px_rgba(59,130,246,0.4)]"
                        >
                          View
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteFeedback(f.id);
                          }}
                          className="px-4 py-2 rounded-lg bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30 transition text-xs font-bold hover:shadow-[0_0_10px_rgba(239,68,68,0.4)]"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 animate-softFade p-4">
          <div className="bg-[#0f1b2d] p-8 rounded-3xl w-full max-w-md border border-cyan-300/20 shadow-[0_0_50px_rgba(0,255,255,0.15)] animate-softScale relative">
            <button
              className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors"
              onClick={() => setSelected(null)}
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold mb-6 text-white border-b border-white/10 pb-4">
              Feedback Detail
            </h3>

            <div className="space-y-4 text-slate-300 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold">Name</p>
                  <p className="text-white">{selected.name}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold">Division</p>
                  <p className="text-cyan-300">{selected.division}</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-500 uppercase font-bold">Event</p>
                <p className="text-white">{selected.eventName}</p>
              </div>

              <div>
                <p className="text-xs text-slate-500 uppercase font-bold">Rating</p>
                <p className="text-yellow-400 flex items-center gap-1">
                  {selected.rating} ★
                </p>
              </div>

              <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                <p className="text-xs text-slate-500 uppercase font-bold mb-1">Comment</p>
                <p className="italic text-slate-300">"{selected.comment || "No comment"}"</p>
              </div>

              {selected.suggestion && (
                <div className="bg-blue-900/20 p-4 rounded-xl border border-blue-500/20">
                  <p className="text-xs text-blue-400 uppercase font-bold mb-1">Suggestion</p>
                  <p className="text-blue-200">{selected.suggestion}</p>
                </div>
              )}
            </div>

            <button
              onClick={() => setSelected(null)}
              className="mt-8 w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition shadow-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;