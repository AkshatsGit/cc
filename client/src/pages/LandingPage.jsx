import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Search,
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  CheckCircle2,
  ChevronDown,
  Star,
  Users,
  Briefcase,
  DollarSign
} from 'lucide-react';
import { VerificationBadge } from '../components/common/Badge';

export default function LandingPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openFaq, setOpenFaq] = useState(0);

  const categories = ['All', 'Tech & Gadgets', 'Beauty & Skincare', 'Fitness & Health', 'Gaming', 'Fashion', 'Travel'];

  const topInfluencers = [
    {
      name: 'Alex Rivera',
      handle: '@alexrivera.tech',
      niche: 'Tech & Gadgets',
      followers: '988K',
      engagement: '4.8%',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      verified: true
    },
    {
      name: 'Sophia Vance',
      handle: '@sophia.wellness',
      niche: 'Beauty & Skincare',
      followers: '893K',
      engagement: '5.6%',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
      verified: true
    },
    {
      name: 'Marcus Chen',
      handle: '@marcus.fits',
      niche: 'Fitness & Health',
      followers: '1.2M',
      engagement: '6.1%',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
      verified: true
    }
  ];

  const topBrands = [
    { name: 'TechPulse Gear', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80', campaigns: '12 Collabs' },
    { name: 'Glow & Co. Beauty', logo: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=150&auto=format&fit=crop&q=80', campaigns: '28 Collabs' },
    { name: 'Keychron Keyboards', logo: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=150&auto=format&fit=crop&q=80', campaigns: '45 Collabs' },
    { name: 'Grovemade Setup', logo: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=150&auto=format&fit=crop&q=80', campaigns: '19 Collabs' }
  ];

  const testimonials = [
    {
      quote: "Creator Cart doubled our campaign ROI within 30 days. The AI match score predicted which creators would convert with 95% accuracy!",
      author: "Elena Rostova",
      role: "VP Marketing, TechPulse",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
    },
    {
      quote: "As a creator, landing paid sponsorships used to take endless DMs. Creator Cart matched me with top tech brands that pay my full rate card.",
      author: "Alex Rivera",
      role: "Tech Influencer (988k Followers)",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    }
  ];

  const faqs = [
    {
      q: "How does the Creator Cart AI Match Engine work?",
      a: "Our algorithm evaluates 7 key data points including creator niche overlap, target platform, minimum follower requirements, historical engagement rate, audience demographics, and rate card budget alignment."
    },
    {
      q: "Is Creator Cart free for influencers?",
      a: "Yes! Joining Creator Cart, creating your media kit portfolio, receiving match recommendations, and applying to brand campaigns is 100% free for creators."
    },
    {
      q: "How are payments handled between Brands and Creators?",
      a: "Brands fund campaign milestone escrows upon accepting an application. Funds are safely released to creators once deliverables are fulfilled and verified."
    },
    {
      q: "Can I manage multiple brand profiles or agency clients?",
      a: "Yes, brand accounts can launch unlimited campaigns, assign team members, and track multi-channel analytics across Instagram, TikTok, YouTube, and LinkedIn."
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/campaigns?search=${encodeURIComponent(searchQuery)}&category=${selectedCategory}`);
  };

  return (
    <div className="space-y-24 pb-16">
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 text-[#6C63FF] font-semibold text-xs mb-8 shadow-xs animate-bounce">
            <Sparkles size={14} />
            <span>The #1 Influencer Marketing Engine of 2026</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight max-w-4xl mx-auto leading-[1.1] mb-6">
            Where Visionary <span className="text-gradient-purple">Brands</span> Connect With Iconic <span className="text-gradient-purple">Creators</span>.
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
            Launch high-ROI influencer marketing campaigns in minutes. Matched by AI niche scoring, real-time messaging, and verified rate card contracts.
          </p>

          {/* DYNAMIC HERO SEARCH BAR */}
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-12">
            <div className="card-creator p-2.5 flex flex-col sm:flex-row items-center gap-2 shadow-2xl">
              <div className="relative flex-1 w-full flex items-center pl-4">
                <Search size={20} className="text-slate-400 mr-3 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search campaigns by niche, brand, or platform..."
                  className="w-full bg-transparent border-none text-slate-900 dark:text-white text-sm font-medium focus:outline-none placeholder-slate-400 py-2"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full sm:w-auto bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold py-3 px-4 rounded-xl border-none focus:outline-none cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <button
                type="submit"
                className="w-full sm:w-auto bg-[#6C63FF] hover:bg-[#5A52E0] text-white px-7 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2 shrink-0"
              >
                <span>Find Campaigns</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </form>

          {/* QUICK CTA & STATS ROW */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-4 border-t border-slate-200/60 dark:border-slate-800 max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-bold text-sm">
              <CheckCircle2 size={18} className="text-[#6C63FF]" />
              <span>Verified Creator Profiles</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-bold text-sm">
              <CheckCircle2 size={18} className="text-[#6C63FF]" />
              <span>Real-Time In-App Chat</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-bold text-sm">
              <CheckCircle2 size={18} className="text-[#6C63FF]" />
              <span>Zero Placement Fees</span>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            How Creator Cart Works
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-base max-w-xl mx-auto">
            Streamlined 3-step collaboration engine designed for speed and transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card-creator p-8 space-y-4 text-left group">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-950/40 text-[#6C63FF] flex items-center justify-center font-black text-xl group-hover:scale-110 transition-transform">
              1
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Post or Browse</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Brands launch campaigns specifying deliverables, budget, and required followers. Creators browse tailored opportunities matching their niche.
            </p>
          </div>

          <div className="card-creator p-8 space-y-4 text-left group">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-950/40 text-[#6C63FF] flex items-center justify-center font-black text-xl group-hover:scale-110 transition-transform">
              2
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">AI Match & Apply</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Our Recommendation Engine scores creator suitability (e.g., 96% Match) based on reach, platform specs, and engagement history.
            </p>
          </div>

          <div className="card-creator p-8 space-y-4 text-left group">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-950/40 text-[#6C63FF] flex items-center justify-center font-black text-xl group-hover:scale-110 transition-transform">
              3
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Chat & Collab</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Accept applications, chat directly with creators, share creative briefs, track deliverables, and complete campaigns seamlessly.
            </p>
          </div>
        </div>
      </section>

      {/* TOP INFLUENCERS SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
              Featured Creators
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Discover top-rated influencers across Instagram, TikTok, YouTube, and LinkedIn.
            </p>
          </div>
          <Link
            to="/campaigns"
            className="text-[#6C63FF] font-bold text-sm hover:underline flex items-center gap-1"
          >
            Explore All Creators <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topInfluencers.map((inf, i) => (
            <div key={i} className="card-creator p-6 space-y-4 text-left">
              <div className="flex items-center gap-4">
                <img
                  src={inf.avatar}
                  alt={inf.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#6C63FF]/30"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">{inf.name}</h3>
                    {inf.verified && <VerificationBadge />}
                  </div>
                  <p className="text-xs text-slate-400 font-medium">{inf.handle}</p>
                  <span className="inline-block mt-1 text-[11px] font-semibold text-[#6C63FF] bg-purple-50 dark:bg-purple-950/50 px-2 py-0.5 rounded-md">
                    {inf.niche}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-center">
                <div>
                  <p className="text-[11px] text-slate-400 uppercase font-bold">Followers</p>
                  <p className="text-sm font-black text-slate-900 dark:text-white">{inf.followers}</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 uppercase font-bold">Engagement</p>
                  <p className="text-sm font-black text-emerald-600 dark:text-emerald-400">{inf.engagement}</p>
                </div>
              </div>

              <button
                onClick={() => navigate('/campaigns')}
                className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                View Creator Profile
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* TOP BRANDS WALL */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">
            Trusted by modern brands scaling on social media
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {topBrands.map((b, idx) => (
              <div key={idx} className="card-creator p-6 flex items-center gap-4 text-left">
                <img src={b.logo} alt={b.name} className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{b.name}</h4>
                  <p className="text-xs text-[#6C63FF] font-semibold">{b.campaigns}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Loved by Marketers & Creators</h2>
          <p className="text-slate-500 text-sm">See why 10,000+ collaborations start on Creator Cart.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="card-creator p-8 space-y-6 flex flex-col justify-between">
              <div className="flex gap-1 text-amber-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed italic">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <img src={t.avatar} alt={t.author} className="w-11 h-11 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{t.author}</h4>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Frequently Asked Questions</h2>
          <p className="text-slate-500 text-sm">Everything you need to know about Creator Cart.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="card-creator p-5">
              <button
                onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                className="w-full flex items-center justify-between text-left font-bold text-base text-slate-900 dark:text-white"
              >
                <span>{faq.q}</span>
                <ChevronDown size={18} className={`transition-transform duration-200 ${openFaq === index ? 'rotate-180 text-[#6C63FF]' : 'text-slate-400'}`} />
              </button>
              {openFaq === index && (
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed pt-2 border-t border-slate-100 dark:border-slate-800">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-purple rounded-3xl p-10 sm:p-14 text-center text-white space-y-6 shadow-2xl relative overflow-hidden">
          <h2 className="text-3xl sm:text-5xl font-black max-w-2xl mx-auto">
            Ready to Launch Your Next Viral Collaboration?
          </h2>
          <p className="text-purple-100 text-base max-w-xl mx-auto font-normal">
            Join thousands of visionary brands and top social media influencers scaling together today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/signup?role=brand"
              className="w-full sm:w-auto bg-white text-[#6C63FF] hover:bg-slate-100 font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all"
            >
              Post a Campaign (Brand)
            </Link>
            <Link
              to="/signup?role=influencer"
              className="w-full sm:w-auto bg-purple-900/40 hover:bg-purple-900/60 text-white font-bold px-8 py-3.5 rounded-xl border border-purple-300/30 transition-all"
            >
              Apply as Influencer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
