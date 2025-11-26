import React, { useState } from "react";

const FeedbackForm = () => {
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
      await fetch("/api/feedback", {
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
          className="px-8 py-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-300/30 shadow-[0_0_10px_rgba(0,255,255,0.2)] transition-all">
          Isi Form Lagi
        </button>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-slideFade">
      <div className="bg-gradient-to-r from-[#0d233d] to-[#0c2038] p-8 rounded-t-3xl border border-white/10 shadow-[0_0_25px_rgba(0,255,255,0.10)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/20 blur-2xl -mr-10 -mt-10" />
        <h2 className="text-3xl font-bold">Event Feedback Form</h2>
        <p className="text-blue-200/80 mt-2">
          Please share your feedback about the event.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
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
                placeholder="Enter full name"/>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Email Address</label>
              <input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#08111f] border border-white/10 text-white p-4 rounded-xl focus:border-cyan-400 outline-none"
                placeholder="Enter email"/>
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Division</label>
            <select
              required
              value={formData.division}
              onChange={(e) => setFormData({ ...formData, division: e.target.value })}
              className="w-full bg-[#08111f] border border-white/10 text-white p-4 rounded-xl outline-none focus:border-cyan-400">
              <option value="" disabled>Select your division</option>
              <option value="LnT">Learning & Training (LnT)</option>
              <option value="EEO">EEO</option>
              <option value="PR">Public Relations</option>
              <option value="HRD">HRD</option>
              <option value="RnD">Research & Development</option>
            </select>
          </div>
        </div>

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
              placeholder="e.g. React Workshop"/>
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
                  className="transition-all hover:scale-150 active:scale-125 animate-[softScale_0.25s_ease-out]">
                  <span className={`text-5xl transition-all ${star <= (hoverStar || formData.rating) ? "text-yellow-400 drop-shadow-[0_0_10px_rgba(255,255,150,0.4)]" : "text-slate-700"}`}>
                    ★
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

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
              className="w-full bg-[#08111f] border border-white/10 text-white p-4 rounded-xl h-32 outline-none focus:border-cyan-400 resize-none"/>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Suggestions</label>
            <textarea
              value={formData.suggestion}
              onChange={(e) => setFormData({ ...formData, suggestion: e.target.value })}
              placeholder="How can we improve?"
              className="w-full bg-[#08111f] border border-white/10 text-white p-4 rounded-xl h-32 outline-none focus:border-cyan-400 resize-none"/>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-cyan-500/30 to-blue-600/30 hover:from-cyan-500/40 hover:to-blue-600/40 border border-cyan-300/20 py-5 rounded-2xl text-lg font-bold text-white backdrop-blur-sm shadow-[0_0_20px_rgba(0,255,255,0.15)] active:scale-95 transition-all flex justify-center items-center gap-3">
          {loading ? (
            <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          ) : (
            "Submit Feedback 🚀"
          )}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;