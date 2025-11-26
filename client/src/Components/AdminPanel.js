import React, { useState, useEffect } from "react";

function AdminPanel() {
  const [feedback, setFeedback] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sort, setSort] = useState("newest");

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/feedback");
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
      await fetch(`/api/feedback/${id}`, { method: "DELETE" });
      setFeedback((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      alert("Gagal menghapus data!");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(`/api/feedback/${selected.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(selected) });
    setSelected(null); fetchData();
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

  const downloadCSV = () => {
    const headers = "ID,Name,Email,Division,Event,Rating,Comment,Status,Date\n";
    const rows = filtered.map(f => 
      `${f.id},"${f.name}","${f.email}",${f.division},"${f.eventName}",${f.rating},"${f.comment || ''}",${f.status},${f.createdAt}`
    ).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'feedback_data.csv'; a.click();
  };

  return (
    <div className="space-y-8 animate-softFade">

      <div className="bg-gradient-to-r from-[#0d233d] to-[#0c2038] p-8 rounded-3xl border border-white/10 shadow-[0_0_22px_rgba(0,255,255,0.08)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/20 blur-2xl" />
        <h2 className="text-3xl font-bold text-white">Admin Panel</h2>
        <p className="text-blue-200/80 mt-2">Manage all feedback submissions</p>
      </div>

      <div className="bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-xl shadow-lg flex flex-col lg:flex-row gap-4 justify-between items-center">
        <div className="w-full lg:w-1/3 relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
          <input
            type="text"
            placeholder="Search name or event..."
            className="bg-[#08111f] border border-white/10 text-white py-3 pl-12 pr-4 rounded-xl w-full outline-none focus:border-cyan-400 transition-all placeholder-slate-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}/>
        </div>

        <div className="flex gap-3 w-full md:w-auto justify-end overflow-x-auto pb-1 md:pb-0">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-[#08111f] border border-white/10 text-white px-4 py-3 rounded-xl outline-none focus:border-cyan-400 cursor-pointer">
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in-review">In Review</option>
            <option value="resolved">Resolved</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-[#08111f] border border-white/10 text-white px-4 py-3 rounded-xl outline-none focus:border-cyan-400 cursor-pointer">
            <option value="newest">Newest</option>
            <option value="rating_high">Highest Rating</option>
          </select>
          
          <button
            onClick={downloadCSV}
            className="px-6 py-3 rounded-xl bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30 transition font-bold whitespace-nowrap shadow-[0_0_15px_rgba(74,222,128,0.15)]">
            Export CSV
          </button>

          <button
            onClick={fetchData}
            className="px-6 py-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-300/20 transition font-bold whitespace-nowrap shadow-[0_0_15px_rgba(0,255,255,0.15)]">
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
                <th className="p-6 font-bold text-center">Date</th> {/* 👈 KOLOM BARU */}
                <th className="p-6 font-bold text-center">Status</th>
                <th className="p-6 font-bold text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5 text-sm">
              {loading ? (
                <tr>
                  <td className="p-10 text-center text-slate-400" colSpan="6">
                    <span className="inline-block w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mr-2"></span>
                    Loading data...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td className="p-10 text-center text-slate-500" colSpan="6">
                    No feedback found.
                  </td>
              </tr>
              ) : (
                filtered.map((f) => (
                  <tr key={f.id} className="hover:bg-white/5 transition-colors hover:backdrop-blur-sm">
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

                    <td className="p-6 text-center text-slate-400 font-mono text-xs">
                      {new Date(f.createdAt).toLocaleDateString()}
                    </td>

                    <td className="p-6 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase border tracking-wide ${
                          (f.status || "open") === "open"
                            ? "bg-green-500/10 text-green-400 border-green-500/30"
                            : (f.status || "open") === "in-review"
                            ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
                            : "bg-slate-500/10 text-slate-400 border-slate-500/30"
                        }`}>
                        {f.status || "open"}
                      </span>
                    </td>

                    <td className="p-6 text-center">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => setSelected(f)}
                          className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30 transition text-xs font-bold hover:shadow-[0_0_10px_rgba(59,130,246,0.4)]">
                          View
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteFeedback(f.id);
                          }}
                          className="px-4 py-2 rounded-lg bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30 transition text-xs font-bold hover:shadow-[0_0_10px_rgba(239,68,68,0.4)]">
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
              onClick={() => setSelected(null)}>
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

              <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Update Status</label>
                <select value={selected.status} onChange={(e) => setSelected({...selected, status: e.target.value})} className="w-full bg-[#08111f] border border-white/10 text-white p-2 rounded-lg outline-none focus:border-cyan-400">
                  <option value="open">Open</option>
                  <option value="in-review">In Review</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleUpdate}
              className="mt-8 w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition shadow-lg">
              Save & Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;