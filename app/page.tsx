"use client";
import { useEffect, useState } from "react";
import ThemeToggle from "./theme-toggle";
import {
  Search,
  Plus,
  SlidersHorizontal,
  ChevronRight,
  MoreHorizontal,
  Globe,
  MapPin,
  Mail,
  Check,
  X,
  ArrowUpRight,
  MessageSquare,
  Users,
  Send,
  Sparkles,
  Settings,
  CircleHelp,
  Compass,
  CheckCheck,
  RotateCcw,
} from "lucide-react";
type Prospect = {
  id: number;
  name: string;
  person: string;
  category: string;
  area: string;
  initials: string;
  color: string;
  note: string;
  status: string;
  email: string;
  subject: string;
  body: string;
};
const seeds: Prospect[] = [
  [
    "Forma Pilates",
    "Sophie",
    "Fitness & wellness",
    "West Village",
    "FP",
    "sage",
    "Class booking takes a few extra steps on mobile.",
  ],
  [
    "Studio Margot",
    "Margot",
    "Creative studio",
    "Greenpoint",
    "SM",
    "lavender",
    "A beautiful portfolio with room for a clearer inquiry flow.",
  ],
  [
    "Sunday Hospitality",
    "Alex",
    "Hospitality",
    "Lower East Side",
    "SH",
    "sand",
    "Private dining is tucked away from the main navigation.",
  ],
  [
    "The Edit by Maya",
    "Maya",
    "Stylist",
    "SoHo",
    "EM",
    "pink",
    "Strong editorial work; services could have a dedicated home.",
  ],
  [
    "Northline Consulting",
    "Jordan",
    "Consulting",
    "Flatiron",
    "NC",
    "blue",
    "The services page could better showcase their recent work.",
  ],
  [
    "Good Ground Studio",
    "Sam",
    "Creative studio",
    "Bushwick",
    "GG",
    "orange",
    "Project photography could make a stronger first impression.",
  ],
  [
    "Stillwell Wellness",
    "Jamie",
    "Fitness & wellness",
    "Chelsea",
    "SW",
    "sage",
    "Appointment information is spread across several pages.",
  ],
  [
    "Maison Social",
    "Taylor",
    "Hospitality",
    "Williamsburg",
    "MS",
    "lavender",
    "Event inquiries could be easier to find on small screens.",
  ],
].map((r, i) => ({
  id: i + 1,
  name: r[0],
  person: r[1],
  category: r[2],
  area: r[3],
  initials: r[4],
  color: r[5],
  note: r[6],
  status: i === 6 ? "draft" : i === 7 ? "replied" : "new",
  email: `hello@${r[0].toLowerCase().replace(/[^a-z]/g, "")}.example`,
  subject: `A thought on ${r[0]}’s website`,
  body: `Hey ${r[1]},\n\nCame across ${r[0]} and spent a little time on your website. ${r[6]}\n\nI’m a web designer based in NYC. I’d love to help bring the site closer to the quality of the work you’re already doing.\n\nWould you be open to a quick conversation?\n\nBest,\nYour name`,
}));
export default function Home() {
  const [items, setItems] = useState(seeds),
    [tab, setTab] = useState("Prospects"),
    [query, setQuery] = useState(""),
    [filter, setFilter] = useState("All industries"),
    [active, setActive] = useState<number | null>(null),
    [toast, setToast] = useState(""),
    [modal, setModal] = useState(""),
    [loaded, setLoaded] = useState(false),
    [reply, setReply] = useState(""),
    [replies, setReplies] = useState<string[]>([]);
  useEffect(() => {
    try {
      const s = localStorage.getItem("outreach-demo-v1");
      if (s) {
        const d = JSON.parse(s);
        setItems(d.items ?? seeds);
        setReplies(d.replies ?? []);
      }
    } catch {}
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem(
          "outreach-demo-v1",
          JSON.stringify({ items, replies }),
        );
      } catch {}
    }
  }, [items, replies, loaded]);
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(""), 3600);
      return () => clearTimeout(t);
    }
  }, [toast]);
  const selected = items.find((p) => p.id === active);
  const drafts = items.filter((p) => p.status === "draft");
  const conversations = items.filter((p) => p.status === "replied");
  const visible = items.filter(
    (p) =>
      (filter === "All industries" || p.category === filter) &&
      `${p.name} ${p.area} ${p.category}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  function update(id: number, values: Partial<Prospect>) {
    setItems((a) => a.map((p) => (p.id === id ? { ...p, ...values } : p)));
  }
  function draft(p: Prospect) {
    update(p.id, { status: "draft" });
    setToast("Draft added to Ready to Send");
    setActive(p.id);
  }
  return (
    <div className="app">
      <aside className="sidebar">
        <a className="brand" href="/outreach" aria-label="Outreach home">
          <span className="brand-icon">
            <Compass size={23} />
          </span>
          outreach<span className="brand-period">.</span>
        </a>
        <div className="workspace">
          <div className="workspace-icon">Y</div>
          <div>
            Your workspace<small>Web design · NYC</small>
          </div>
          <span className="workspace-dots">⌄</span>
        </div>
        <div className="nav-label">WORKSPACE</div>
        <nav>
          {[
            {
              name: "Prospects",
              icon: Users,
              count: items.filter((p) => p.status === "new").length,
            },
            { name: "Ready to Send", icon: Send, count: drafts.length },
            {
              name: "Conversations",
              icon: MessageSquare,
              count: conversations.length,
            },
          ].map((n) => (
            <button
              key={n.name}
              aria-label={n.name}
              className={tab === n.name ? "nav active" : "nav"}
              onClick={() => {
                setTab(n.name);
                setActive(null);
                setQuery("");
              }}
            >
              <n.icon size={19} />
              <span>{n.name}</span>
              <b>{n.count}</b>
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="batch-card">
            <span className="tiny-cap">YOUR FIRST 100</span>
            <div>
              <strong>{items.length}</strong>
              <span> / 100 prospects</span>
            </div>
            <div className="progress">
              <i style={{ width: `${items.length}%` }} />
            </div>
            <p>One conversation can change things.</p>
          </div>
          <button className="nav" onClick={() => setModal("settings")}>
            <Settings size={18} />
            Workspace settings
          </button>
          <button className="nav" onClick={() => setModal("help")}>
            <CircleHelp size={18} />A little help
          </button>
          <div className="profile">
            <span>Y</span>
            <div>
              Your business<small>Personal workspace</small>
            </div>
            <MoreHorizontal size={18} />
          </div>
        </div>
      </aside>
      <main>
        <header>
          <div className="breadcrumb">
            Workspace <ChevronRight size={14} />
            <span>{tab}</span>
          </div>
          <div className="header-right">
            <ThemeToggle />
            <span className="demo-pill">
              <span />
              Demo workspace
            </span>
            <button
              className="avatar"
              onClick={() => setModal("settings")}
              aria-label="Workspace settings"
            >
              Y
            </button>
          </div>
        </header>
        <div className="content">
          <div className="page-heading">
            <div>
              <div className="eyebrow">
                A LITTLE REACH. A LOT OF POSSIBILITY.
              </div>
              <h1>
                {tab === "Prospects"
                  ? "Your next conversation starts here."
                  : tab === "Ready to Send"
                    ? "A good introduction goes a long way."
                    : "Over to you."}
              </h1>
              <p>
                {tab === "Prospects"
                  ? "Discover businesses. Make an introduction. See what happens."
                  : tab === "Ready to Send"
                    ? "Make it yours, give it a look, and put yourself out there."
                    : "The app opens the door. You build the relationship."}
              </p>
            </div>
            <button className="primary" onClick={() => setModal("find")}>
              <Plus size={17} />
              Find prospects
            </button>
          </div>
          <div className="workflow">
            <div
              className={tab === "Prospects" ? "step current" : "step"}
              onClick={() => {
                setTab("Prospects");
                setActive(null);
              }}
            >
              <span className="step-icon">
                <Users size={19} />
              </span>
              <div>
                <strong>Discover</strong>
                <small>Find your next opportunity</small>
              </div>
              <b>{items.length}</b>
            </div>
            <ChevronRight className="step-chevron" size={17} />
            <div
              className={tab === "Ready to Send" ? "step current" : "step"}
              onClick={() => {
                setTab("Ready to Send");
                setActive(null);
              }}
            >
              <span className="step-icon">
                <Send size={18} />
              </span>
              <div>
                <strong>Introduce yourself</strong>
                <small>A personal first impression</small>
              </div>
              <b>{drafts.length}</b>
            </div>
            <ChevronRight className="step-chevron" size={17} />
            <div
              className={tab === "Conversations" ? "step current" : "step"}
              onClick={() => {
                setTab("Conversations");
                setActive(null);
              }}
            >
              <span className="step-icon">
                <MessageSquare size={18} />
              </span>
              <div>
                <strong>Start talking</strong>
                <small>Your human touch takes over</small>
              </div>
              <b>{conversations.length}</b>
            </div>
          </div>
          {tab === "Prospects" ? (
            <section className="list-section">
              <div className="section-title">
                <div>
                  <h2>
                    Your prospects <span>{items.length}</span>
                  </h2>
                  <p>A fresh set of possibilities, right in your city.</p>
                </div>
                <span className="sample-label">Sample businesses</span>
              </div>
              <div className="toolbar">
                <label className="search">
                  <Search size={17} />
                  <input
                    aria-label="Search prospects"
                    placeholder="Search businesses, neighborhoods…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </label>
                <div className="filters">
                  <label className="select-wrap">
                    <SlidersHorizontal size={15} />
                    <select
                      aria-label="Filter industry"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      {[
                        "All industries",
                        ...Array.from(new Set(items.map((p) => p.category))),
                      ].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </label>
                  <span className="location">
                    <MapPin size={14} />
                    New York City
                  </span>
                </div>
              </div>
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>BUSINESS</th>
                      <th>INDUSTRY</th>
                      <th>OPPORTUNITY</th>
                      <th>STATUS</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {visible.map((p) => (
                      <tr key={p.id} onClick={() => setActive(p.id)}>
                        <td>
                          <div className="business">
                            <span className={`business-avatar ${p.color}`}>
                              {p.initials}
                            </span>
                            <div>
                              <strong>{p.name}</strong>
                              <small>
                                <MapPin size={11} />
                                {p.area}, NYC
                              </small>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="category">{p.category}</span>
                        </td>
                        <td>
                          <div className="opportunity">
                            <Sparkles size={14} />
                            <span>{p.note}</span>
                          </div>
                        </td>
                        <td>
                          <span className={`status ${p.status}`}>
                            {p.status === "new"
                              ? "New prospect"
                              : p.status === "draft"
                                ? "Draft ready"
                                : p.status === "sent"
                                  ? "Sent · demo"
                                  : "Replied"}
                          </span>
                        </td>
                        <td>
                          <button
                            className="row-open"
                            aria-label={`View ${p.name}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActive(p.id);
                            }}
                          >
                            <ChevronRight size={17} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!visible.length && (
                  <div className="empty">No businesses match your search.</div>
                )}
              </div>
              <div className="table-footer">
                <span>
                  Showing {visible.length} of {items.length} prospects
                </span>
                <span>Built for your next introduction.</span>
              </div>
            </section>
          ) : tab === "Ready to Send" ? (
            <div className="mail-layout">
              <section className="mail-list">
                <h2>
                  Drafts <span>{drafts.length}</span>
                </h2>
                {drafts.length ? (
                  drafts.map((p) => (
                    <button
                      className={`mail-item ${active === p.id ? "chosen" : ""}`}
                      key={p.id}
                      onClick={() => setActive(p.id)}
                    >
                      <span className={`business-avatar ${p.color}`}>
                        {p.initials}
                      </span>
                      <div>
                        <strong>{p.name}</strong>
                        <p>{p.subject}</p>
                        <small>Introduction · Needs your approval</small>
                      </div>
                      <ChevronRight size={16} />
                    </button>
                  ))
                ) : (
                  <div className="empty">
                    All caught up. Choose a prospect to prepare an introduction.
                  </div>
                )}
              </section>
              <section className="editor">
                {selected && selected.status === "draft" ? (
                  <>
                    <div className="editor-heading">
                      <span className="status draft">
                        Awaiting your approval
                      </span>
                      <span>Sample email</span>
                    </div>
                    <label className="email-field">
                      To
                      <input
                        value={selected.email}
                        onChange={(e) =>
                          update(selected.id, { email: e.target.value })
                        }
                      />
                    </label>
                    <label className="email-field">
                      Subject
                      <input
                        value={selected.subject}
                        onChange={(e) =>
                          update(selected.id, { subject: e.target.value })
                        }
                      />
                    </label>
                    <textarea
                      aria-label="Email body"
                      className="email-body"
                      value={selected.body}
                      onChange={(e) =>
                        update(selected.id, { body: e.target.value })
                      }
                    />
                    <div className="send-footer">
                      <p>Demo mode · No email will be delivered.</p>
                      <button
                        className="primary"
                        onClick={() => {
                          update(selected.id, { status: "sent" });
                          setActive(null);
                          setToast(
                            "Demo send complete. No real email was sent.",
                          );
                        }}
                      >
                        <Check size={16} />
                        Approve & simulate send
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="editor-empty">
                    <Mail size={34} />
                    <h3>Your next introduction.</h3>
                    <p>Select a draft to review and make it yours.</p>
                  </div>
                )}
              </section>
            </div>
          ) : (
            <div className="mail-layout">
              <section className="mail-list">
                <h2>
                  Inbox <span>{conversations.length}</span>
                </h2>
                {conversations.map((p) => (
                  <button
                    className={`mail-item ${active === p.id ? "chosen" : ""}`}
                    key={p.id}
                    onClick={() => setActive(p.id)}
                  >
                    <span className={`business-avatar ${p.color}`}>
                      {p.initials}
                    </span>
                    <div>
                      <strong>{p.name}</strong>
                      <p>Would love to hear more about this.</p>
                      <small>Sample reply · Ready for you</small>
                    </div>
                  </button>
                ))}
              </section>
              <section className="editor conversation">
                {selected ? (
                  <>
                    <div className="thread-heading">
                      <h2>{selected.name}</h2>
                      <span className="status replied">Your turn</span>
                    </div>
                    <div className="message">
                      <strong>
                        {selected.person} <small>· Sample conversation</small>
                      </strong>
                      <p>
                        Hey! Thanks for reaching out. We’ve actually been
                        thinking about updating our website. Would love to hear
                        more about this. Do you have time for a quick call this
                        week?
                      </p>
                    </div>
                    {replies.map((r, i) => (
                      <div key={i} className="message outgoing">
                        <strong>
                          You <small>· Demo reply</small>
                        </strong>
                        <p>{r}</p>
                      </div>
                    ))}
                    <div className="reply-box">
                      <textarea
                        aria-label="Your reply"
                        placeholder="This is where you take over. Write your reply…"
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                      />
                      <div>
                        <span>Demo only · Nothing is delivered</span>
                        <button
                          className="primary"
                          disabled={!reply.trim()}
                          onClick={() => {
                            setReplies((a) => [...a, reply]);
                            setReply("");
                            setToast("Demo reply saved");
                          }}
                        >
                          Save demo reply
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="editor-empty">
                    <MessageSquare size={34} />
                    <h3>A conversation worth having.</h3>
                    <p>Open a reply to pick things up personally.</p>
                  </div>
                )}
              </section>
            </div>
          )}
          <div className="bottom-note">
            <span className="note-icon">
              <Sparkles size={17} />
            </span>
            <div>
              <strong>Less busywork. More conversations.</strong>
              <span>
                Portfolio prototype · Fictional data. No discovery or email
                delivery.
              </span>
            </div>
            <span className="built-nyc">Made for your next chapter.</span>
          </div>
        </div>
      </main>
      {selected && tab === "Prospects" && (
        <div className="overlay" onClick={() => setActive(null)}>
          <section className="drawer" onClick={(e) => e.stopPropagation()}>
            <button
              className="close"
              aria-label="Close prospect"
              onClick={() => setActive(null)}
            >
              <X size={20} />
            </button>
            <span className={`business-avatar large ${selected.color}`}>
              {selected.initials}
            </span>
            <h2>{selected.name}</h2>
            <p>
              {selected.category} · {selected.area}, NYC
            </p>
            <span className="sample-label">Fictional sample prospect</span>
            <div className="detail-block">
              <h3>
                <Sparkles size={16} />A starting point
              </h3>
              <p>{selected.note}</p>
              <small>Illustrative observation, not a live website audit.</small>
            </div>
            <div className="detail-block">
              <h3>
                <Mail size={16} />
                Contact
              </h3>
              <p>{selected.email}</p>
              <small>Example address · No real contact information</small>
            </div>
            <div className="detail-block">
              <h3>Introduction preview</h3>
              <p className="preview-body">{selected.body}</p>
            </div>
            {selected.status === "new" ? (
              <button className="primary full" onClick={() => draft(selected)}>
                <Send size={16} />
                Prepare introduction
              </button>
            ) : selected.status === "draft" ? (
              <button
                className="primary full"
                onClick={() => setTab("Ready to Send")}
              >
                Review draft
              </button>
            ) : (
              <span className={`status ${selected.status}`}>
                {selected.status === "sent"
                  ? "Demo email sent"
                  : "Sample reply received"}
              </span>
            )}
          </section>
        </div>
      )}
      {modal && (
        <div className="overlay centered" onClick={() => setModal("")}>
          <section className="modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="close"
              onClick={() => setModal("")}
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>
            <span className="modal-icon">
              <Compass size={25} />
            </span>
            <h2>
              {modal === "find"
                ? "Your first batch starts here."
                : modal === "settings"
                  ? "Your workspace."
                  : "A simple way to get started."}
            </h2>
            {modal === "find" ? (
              <>
                <p>
                  This first version uses fictional businesses so you can
                  explore the workflow. Live business discovery hasn’t been
                  connected yet.
                </p>
                <div className="setup-row">
                  <span>Location</span>
                  <strong>New York City</strong>
                </div>
                <div className="setup-row">
                  <span>Industries</span>
                  <strong>Across industries</strong>
                </div>
                <div className="setup-row">
                  <span>First batch goal</span>
                  <strong>100 businesses</strong>
                </div>
                <button
                  className="primary full"
                  onClick={() => {
                    setModal("");
                    setToast(
                      "Explore the sample prospects, then prepare your first draft.",
                    );
                  }}
                >
                  Explore sample prospects
                </button>
              </>
            ) : modal === "settings" ? (
              <>
                <p>
                  Portfolio demo · Changes stay in this browser. Use fictional
                  information only.
                </p>
                <div className="setup-row">
                  <span>Business discovery</span>
                  <strong>Not connected</strong>
                </div>
                <div className="setup-row">
                  <span>Email sending</span>
                  <strong>Demo mode</strong>
                </div>
                <div className="setup-row">
                  <span>Approval</span>
                  <strong>Every message</strong>
                </div>
                <button
                  className="secondary full"
                  onClick={() => {
                    setItems(seeds);
                    setReplies([]);
                    setActive(null);
                    setModal("");
                    setToast("Demo workspace reset");
                  }}
                >
                  <RotateCcw size={16} />
                  Reset sample workspace
                </button>
              </>
            ) : (
              <>
                <p>
                  Open a prospect to see the opportunity. Prepare an
                  introduction, then review and edit it in Ready to Send.
                  Simulate a send, or open Conversations to try a reply.
                </p>
                <p>
                  All businesses, email addresses, observations, and incoming
                  replies are fictional. No messages leave this app.
                </p>
                <button className="primary full" onClick={() => setModal("")}>
                  Got it
                </button>
              </>
            )}
          </section>
        </div>
      )}
      {toast && (
        <div className="toast" role="status">
          <CheckCheck size={18} />
          {toast}
        </div>
      )}
    </div>
  );
}
